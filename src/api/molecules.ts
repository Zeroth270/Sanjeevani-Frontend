import { apiClient } from './client';
import type { Molecule, DisclosureWindow } from '@/types/models';

function estimateFormulaAndWeight(smiles: string): { formula: string; weight: number } {
  if (!smiles) return { formula: 'C9H8O4', weight: 180.16 };
  
  const hasAromatic = /[cnsop]/.test(smiles);
  const cleanSmiles = smiles.toUpperCase().replace(/[()=#\-123456789]/g, '');
  const counts: Record<string, number> = {};
  const elements = ['CL', 'BR', 'F', 'I', 'C', 'O', 'N', 'S', 'P'];
  const atomicWeights: Record<string, number> = {
    C: 12.011,
    O: 15.999,
    N: 14.007,
    S: 32.06,
    P: 30.974,
    F: 18.998,
    CL: 35.45,
    BR: 79.904,
    I: 126.904,
    H: 1.008,
  };
  
  let temp = cleanSmiles;
  for (const el of elements) {
    const regex = new RegExp(el, 'g');
    const matches = temp.match(regex);
    if (matches) {
      counts[el] = matches.length;
      temp = temp.replace(regex, '');
    }
  }
  
  let hCount = 0;
  if (counts['C']) {
    hCount += counts['C'] * (hasAromatic ? 1 : 2) + (hasAromatic ? 1 : 2);
  }
  if (counts['N']) hCount += counts['N'] * 1;
  if (counts['O']) hCount += counts['O'] * 1;
  if (hCount > 0) counts['H'] = hCount;
  
  let weight = 0;
  let formula = '';
  const order = ['C', 'H', 'O', 'N', 'S', 'P', 'F', 'CL', 'BR', 'I'];
  for (const el of order) {
    if (counts[el]) {
      // Normalize 'CL' and 'BR' labels back to proper chemical notation for the formula string
      const displayEl = el === 'CL' ? 'Cl' : (el === 'BR' ? 'Br' : el);
      formula += displayEl + (counts[el] > 1 ? counts[el] : '');
      weight += counts[el] * (atomicWeights[el] || 0);
    }
  }
  
  if (weight === 0) {
    weight = 180.16;
    formula = 'C9H8O4';
  }
  
  return { formula, weight };
}

export const moleculesApi = {
  getById: (id: string) =>
    apiClient.get<any>(`/molecules/${id}`).then((r) => {
      const m = r.data;
      let status = 'UNCERTAIN';
      if (m.latestScan) {
        status = m.latestScan.isNovel ? 'NOVEL' : 'KNOWN';
      }
      const { formula, weight } = estimateFormulaAndWeight(m.smiles);
      return {
        id: String(m.id),
        smiles: m.smiles,
        iupacName: m.iupacName || m.extractedNameRaw,
        confidenceScore: m.extractionConfidence != null ? Number(m.extractionConfidence) : 0,
        status: status,
        noveltyScore: (m.latestScan && m.latestScan.noveltyScore != null) ? Number(m.latestScan.noveltyScore) : 0,
        tanimotoSimilarity: (m.latestScan && m.latestScan.tanimotoSimilarity != null) ? Number(m.latestScan.tanimotoSimilarity) : 0,
        closestKnownMatch: m.latestScan ? m.latestScan.closestMatchId : undefined,
        paperId: String(m.paperId),
        molecularFormula: formula,
        molecularWeight: weight,
      } as Molecule;
    }),

  startDisclosureWindow: (id: string, req?: { disclosureDate: string; gracePeriodDays?: number }) =>
    apiClient
      .post<any>(
        `/molecules/${id}/disclosure-window`,
        req || { disclosureDate: new Date().toISOString().split('T')[0], gracePeriodDays: 365 }
      )
      .then((r) => r.data),

  filePatent: (id: string, req: { patentOffice: string; filingDate?: string; applicationNumber?: string }) =>
    apiClient
      .post<any>(`/molecules/${id}/patent-filing`, req)
      .then((r) => r.data),
};
