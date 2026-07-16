import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { moleculesApi } from '../lib/api';
import { mockMolecule } from '../lib/mockData';
import { MoleculeStructure } from '../components/MoleculeStructure';
import { Molecule3DStructure } from '../components/Molecule3DStructure';
import { formatDate } from '../lib/utils';


const C = { teal: '#14b8a6', teal4: '#2dd4bf', g4: '#94a3b8', g5: '#64748b', g8: '#1e293b', white: '#f1f5f9', green: '#4ade80', red: '#f87171' };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: '.75rem', fontWeight: 700, color: C.teal, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, borderBottom: `1px solid ${C.g8}`, paddingBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: '.85rem' }}>
      <span style={{ color: C.g4 }}>{label}</span>
      <span style={{ fontWeight: 600, color: C.white, fontFamily: mono ? "'JetBrains Mono',monospace" : 'inherit' }}>{value}</span>
    </div>
  );
}

export default function PatentDossier() {
  const { id } = useParams();
  const { data: mol, isLoading } = useQuery({
    queryKey: ['molecule', id],
    queryFn: async () => { try { return (await moleculesApi.get(id)).data; } catch { return mockMolecule; } },
  });

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}><div className="spinner" style={{ width: 36, height: 36 }} /></div>;
  if (!mol) return null;

  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const bestRoute = mol.synthesisRoutes?.[0];
  const safety = mol.safetyProfile;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.82rem', color: C.g5, marginBottom: 6 }}>
            <Link to={`/molecules/${id}`} style={{ color: C.teal, textDecoration: 'none' }}>← Back to molecule</Link>
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: C.white }}>Patent-Ready Dossier</h1>
          <p style={{ fontSize: '.85rem', color: C.g5, marginTop: 4 }}>Generated {today} for {mol.name}</p>
        </div>
        <button className="btn-primary" onClick={() => window.print()} id="print-dossier-btn">📄 Print / Export PDF</button>
      </div>

      {/* Dossier card */}
      <div className="glass-card" style={{ padding: '28px 32px' }}>
        {/* Title block */}
        <div style={{ textAlign: 'center', marginBottom: 28, paddingBottom: 20, borderBottom: `1px solid ${C.g8}` }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: C.white, marginBottom: 4 }}>SANJEEVANI — PATENT CANDIDATE DOSSIER</div>
          <div style={{ fontSize: '.82rem', color: C.g4 }}>Confidential · For IP Cell Use Only · Ref: SJV-{id?.toUpperCase()}</div>
        </div>

        <Section title="1. Molecule Identity">
          <Row label="Compound Name" value={mol.name} />
          <Row label="IUPAC Name" value={mol.iupacName || '—'} mono />
          <Row label="Molecular Formula" value={mol.molecularFormula} mono />
          <Row label="Molecular Weight" value={`${mol.molecularWeight} g/mol`} mono />
          <Row label="SMILES" value={mol.smilesString} mono />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'rgba(15,23,42,.4)', padding: 16, borderRadius: 12, border: '1px solid rgba(51,65,85,.3)' }}>
              <div style={{ fontSize: '.75rem', fontWeight: 700, color: C.teal }}>2D Structure Diagram</div>
              <MoleculeStructure smiles={mol.smilesString} width={300} height={220} id={`dossier-2d-${id}`} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'rgba(15,23,42,.4)', padding: 16, borderRadius: 12, border: '1px solid rgba(51,65,85,.3)' }}>
              <div style={{ fontSize: '.75rem', fontWeight: 700, color: C.teal }}>3D Molecular Compound</div>
              <Molecule3DStructure smiles={mol.smilesString} formula={mol.molecularFormula} width={300} height={220} />
            </div>
          </div>
        </Section>


        <Section title="2. Novelty Assessment">
          <Row label="Structural Novelty Score" value={`${Math.round((mol.noveltyScore || 0) * 100)}%`} mono />
          <Row label="Classification" value={mol.status} />
          {mol.closestMatch && <>
            <Row label="Closest Known Compound" value={mol.closestMatch.name} />
            <Row label="Source Database" value={mol.closestMatch.database} />
            <Row label="Tanimoto Similarity" value={mol.closestMatch.tanimotoSimilarity?.toFixed(3)} mono />
          </>}
          {mol.routeNovelty && <>
            <Row label="Route Novelty Score" value={`${Math.round(mol.routeNovelty.routeNoveltyScore * 100)}%`} mono />
            <Row label="Route Novel?" value={mol.routeNovelty.isRouteNovel ? 'YES' : 'NO'} />
            <Row label="Key Differentiation" value={mol.routeNovelty.keyDifference || '—'} />
          </>}
        </Section>

        <Section title="3. Source Publication">
          <Row label="Paper" value={mol.paperTitle || '—'} />
          <Row label="Paper ID" value={mol.paperId || '—'} mono />
          <Row label="Extraction Confidence" value={mol.extractionConfidence ? `${Math.round(mol.extractionConfidence * 100)}%` : '—'} mono />
          <Row label="First Detected" value={formatDate(mol.createdAt)} />
        </Section>

        {bestRoute && (
          <Section title="4. Recommended Synthesis Route">
            <Row label="Route" value={bestRoute.name} />
            <Row label="Confidence" value={`${Math.round(bestRoute.confidence * 100)}%`} mono />
            <Row label="Steps" value={bestRoute.estimatedSteps} mono />
            <Row label="Estimated Cost" value={bestRoute.estimatedCost} mono />
            <Row label="India Feasible" value={bestRoute.indiaFeasible ? '✓ Yes' : '✗ No'} />
            <Row label="Scalability" value={bestRoute.scalability} />
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: '.78rem', fontWeight: 600, color: C.g5, marginBottom: 8 }}>Step-by-step:</div>
              {bestRoute.steps.map(s => (
                <div key={s.step} style={{ display: 'flex', gap: 10, padding: '6px 0', fontSize: '.82rem', color: '#cbd5e1', borderBottom: `1px solid rgba(51,65,85,.3)` }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: C.teal, width: 20 }}>{s.step}.</span>
                  <span style={{ fontWeight: 600 }}>{s.reaction}</span>
                  <span style={{ color: C.g4, marginLeft: 'auto' }}>{s.yield} yield</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {safety && (
          <Section title="5. Safety & Feasibility Summary">
            <Row label="Overall Risk" value={safety.overallRisk} />
            <Row label="Lipinski Violations" value={safety.drugLikeness.lipinskiViolations} mono />
            <Row label="Lipinski Verdict" value={safety.drugLikeness.verdict} />
            <Row label="AMES Mutagenicity" value={safety.admet.toxicity.ames ? 'Positive ⚠' : 'Negative ✓'} />
            <Row label="hERG Risk" value={safety.admet.toxicity.herg} />
            <Row label="Hepatotoxicity" value={safety.admet.toxicity.hepatotoxicity ? 'Yes ⚠' : 'No ✓'} />
            {safety.costOfGoods && <>
              <Row label="Bench Cost" value={safety.costOfGoods.benchScale} mono />
              <Row label="Plant Cost (est.)" value={safety.costOfGoods.plantScale} mono />
            </>}
          </Section>
        )}

        {mol.disclosureWindow && (
          <Section title="6. Disclosure Window Status">
            <Row label="Disclosure Date" value={formatDate(mol.disclosureWindow.disclosureDate)} />
            <Row label="Filing Deadline" value={formatDate(mol.disclosureWindow.deadlineDate)} />
            <Row label="Days Remaining" value={`${mol.disclosureWindow.daysLeft} days`} mono />
            <Row label="Window Status" value={mol.disclosureWindow.status} />
          </Section>
        )}

        {/* Footer */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.g8}`, textAlign: 'center' }}>
          <div style={{ fontSize: '.75rem', color: C.g5 }}>
            Generated by Sanjeevani Novelty Scanner · {today} · This document is machine-generated and should be reviewed by a qualified patent attorney before filing.
          </div>
        </div>
      </div>
    </div>
  );
}
