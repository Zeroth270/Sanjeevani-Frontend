// Mock data for development / demo when backend is not available
export const MOCK_ENABLED = true;

export const mockSummary = {
  papersScannedThisMonth: 34,
  novelMoleculesFound: 12,
  closingWithin30Days: 5,
  expiredUnfiled: 2,
  closingWindowsList: [
    { id: 'dw1', moleculeId: 'mol1', moleculeName: 'Curcumin-Analog-7β', smilesString: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O', deadlineDate: new Date(Date.now() + 3 * 864e5).toISOString(), daysLeft: 3, urgency: 'RED' },
    { id: 'dw2', moleculeId: 'mol2', moleculeName: 'Nimbolide-Derivative-4', smilesString: 'O=C1OC2=CC(=O)C3C(C)(C)C(=O)CC3(C)C2=CC1=O', deadlineDate: new Date(Date.now() + 11 * 864e5).toISOString(), daysLeft: 11, urgency: 'AMBER' },
    { id: 'dw3', moleculeId: 'mol3', moleculeName: 'Berberine-QS-2024', smilesString: 'COc1ccc2cc3c(cc2c1OC)N(C)CCC3', deadlineDate: new Date(Date.now() + 21 * 864e5).toISOString(), daysLeft: 21, urgency: 'AMBER' },
    { id: 'dw4', moleculeId: 'mol4', moleculeName: 'Withaferin-Analog-9', smilesString: 'O=C1C=CC2(O)C(C)(C)CCC2C1=O', deadlineDate: new Date(Date.now() + 28 * 864e5).toISOString(), daysLeft: 28, urgency: 'GREEN' },
    { id: 'dw5', moleculeId: 'mol5', moleculeName: 'Piperine-Meta-3', smilesString: 'O=C(/C=C/C=C/c1ccc2c(c1)OCO2)N1CCCCC1', deadlineDate: new Date(Date.now() + 29 * 864e5).toISOString(), daysLeft: 29, urgency: 'GREEN' },
  ],
};

export const mockPapers = {
  content: [
    { id: 'p1', title: 'Novel Curcumin Analogs with Enhanced Bioavailability', authors: 'Sharma R, Gupta S, Patel M', status: 'PROCESSED', publicationDate: '2024-01-15', institution: 'IIT Bombay', moleculeCount: 4 },
    { id: 'p2', title: 'Antifungal Properties of Nimbolide Derivatives from Azadirachta indica', authors: 'Singh K, Rao P', status: 'PROCESSED', publicationDate: '2024-02-20', institution: 'CSIR-CDRI', moleculeCount: 7 },
    { id: 'p3', title: 'Berberine Quaternary Salt Synthesis and Anticancer Screening', authors: 'Kumar A, Joshi L', status: 'PROCESSING', publicationDate: '2024-03-08', institution: 'IIT Delhi', moleculeCount: 0 },
    { id: 'p4', title: 'Piperine Metabolite Profiling via LC-MS/MS', authors: 'Verma N', status: 'PROCESSED', publicationDate: '2024-03-15', institution: 'IIT Bombay', moleculeCount: 9 },
    { id: 'p5', title: 'Withaferin A Analogs: Synthesis and Anti-inflammatory Activity', authors: 'Reddy G, Mishra P', status: 'FAILED', publicationDate: '2024-04-01', institution: 'NIPER', moleculeCount: 0 },
  ],
  totalElements: 5, totalPages: 1, number: 0, size: 10,
};

export const mockPaper = {
  id: 'p1',
  title: 'Novel Curcumin Analogs with Enhanced Bioavailability',
  authors: 'Sharma R, Gupta S, Patel M',
  status: 'PROCESSED',
  publicationDate: '2024-01-15',
  institution: 'IIT Bombay',
  sourceType: 'JOURNAL_ARTICLE',
  extractedMolecules: [
    { id: 'mol1', name: 'Curcumin-Analog-7β', smilesString: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O', extractionConfidence: 0.97, noveltyScore: 0.91, status: 'NOVEL' },
    { id: 'mol6', name: 'Curcumin-Analog-7α', smilesString: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1OC', extractionConfidence: 0.94, noveltyScore: 0.74, status: 'NOVEL' },
    { id: 'mol7', name: 'Bisdemethoxycurcumin', smilesString: 'OC1=CC=C(/C=C/C(=O)CC(=O)/C=C/C2=CC=C(O)C=C2)C=C1', extractionConfidence: 0.89, noveltyScore: 0.12, status: 'KNOWN' },
    { id: 'mol8', name: 'Hexahydrocurcumin', smilesString: 'COc1cc(CCCC(=O)CCC(=O)CCc2ccc(O)c(OC)c2)ccc1O', extractionConfidence: 0.82, noveltyScore: 0.55, status: 'PENDING' },
  ],
};

export const mockMolecule = {
  id: 'mol1',
  name: 'Curcumin-Analog-7β',
  smilesString: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OC)c2)ccc1O',
  iupacName: '(1E,6E)-1,7-bis(4-hydroxy-3-methoxyphenyl)hepta-1,6-diene-3,5-dione',
  molecularFormula: 'C21H20O6',
  molecularWeight: 368.38,
  noveltyScore: 0.91,
  status: 'NOVEL',
  closestMatch: {
    name: 'Curcumin (natural)', database: 'ChEMBL',
    tanimotoSimilarity: 0.67, pubchemCid: '969516',
  },
  disclosureWindow: {
    id: 'dw1',
    disclosureDate: new Date(Date.now() - 60 * 864e5).toISOString(),
    deadlineDate: new Date(Date.now() + 3 * 864e5).toISOString(),
    daysLeft: 3, status: 'CLOSING_SOON',
  },
  paperId: 'p1',
  paperTitle: 'Novel Curcumin Analogs with Enhanced Bioavailability',
  extractionConfidence: 0.97,
  createdAt: '2024-01-20T10:30:00Z',

  // Suggested optimizations / analogs workflow
  suggestedModifications: [
    {
      id: 'mod1',
      name: 'Fluorinated Curcumin Analog-7β (AI-Proposed)',
      smilesString: 'COc1cc(/C=C/C(=O)CC(=O)/C=C/c2cc(F)c(O)c(OC)c2)ccc1O',
      description: 'Add a fluorine atom at the 5-position of the aromatic ring to block oxidative metabolic pathways and increase overall bio-stability.',
      noveltyScore: 0.97,
      status: 'NOVEL',
      pubchemMatches: 0,
      patentsFound: 0
    },
    {
      id: 'mod2',
      name: 'Ethoxylated Curcumin Derivative',
      smilesString: 'CCOc1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(OCC)c2)ccc1O',
      description: 'Replace the methoxy ether groups with ethoxy group substitutes to enhance lipophilicity and blood-brain barrier penetration.',
      noveltyScore: 0.88,
      status: 'NOVEL',
      pubchemMatches: 0,
      patentsFound: 1
    },
    {
      id: 'mod3',
      name: 'Tetrahydrocurcumin Diacetate',
      smilesString: 'CC(=O)Oc1ccc(CCC(=O)CC(=O)CCc2ccc(OC(=O)C)cc2OC)cc1OC',
      description: 'Esterification of phenolic groups to create a prodrug structure. High metabolic stability.',
      noveltyScore: 0.22,
      status: 'KNOWN',
      pubchemMatches: 12,
      patentsFound: 8,
      closestMatch: 'Tetrahydrocurcumin Diacetate (CAS 143183-49-1)'
    }
  ],

  // Route Patent data
  routeNovelty: {
    isRouteNovel: true,
    routeNoveltyScore: 0.84,
    existingRoutes: 3,
    proposedRouteSteps: 5,
    keyDifference: 'Uses a Suzuki coupling instead of Heck reaction at step 3, enabling lower-temperature conditions and cheaper Pd(OAc)₂ catalyst.',
    priorArt: [
      { patent: 'US10234567', year: 2019, similarity: 0.52, route: 'Heck reaction with Pd/C' },
      { patent: 'WO2021034567', year: 2021, similarity: 0.41, route: 'Wittig olefination' },
      { patent: 'IN202241001234', year: 2022, similarity: 0.38, route: 'Aldol condensation' },
    ],
  },

  // Synthesis route data
  synthesisRoutes: [
    {
      id: 'sr1', name: 'Route A — Suzuki Coupling (India-optimized)',
      confidence: 0.92, estimatedSteps: 5, estimatedCost: '₹2,400/g',
      indiaFeasible: true, scalability: 'PILOT',
      steps: [
        { step: 1, reaction: 'Knoevenagel Condensation', reagents: 'Vanillin, acetylacetone, piperidine', temp: '80°C', time: '4h', yield: '78%', available: true },
        { step: 2, reaction: 'Suzuki Coupling', reagents: 'Pd(OAc)₂, boronic acid, K₂CO₃', temp: '65°C', time: '6h', yield: '71%', available: true },
        { step: 3, reaction: 'Demethylation', reagents: 'BBr₃ in DCM', temp: '-78°C → RT', time: '3h', yield: '85%', available: true },
        { step: 4, reaction: 'Recrystallization', reagents: 'EtOH/H₂O', temp: '4°C', time: '12h', yield: '92%', available: true },
        { step: 5, reaction: 'Final purification', reagents: 'Column chromatography (SiO₂)', temp: 'RT', time: '2h', yield: '95%', available: true },
      ],
    },
    {
      id: 'sr2', name: 'Route B — Classical Aldol',
      confidence: 0.78, estimatedSteps: 4, estimatedCost: '₹1,800/g',
      indiaFeasible: true, scalability: 'BENCH',
      steps: [
        { step: 1, reaction: 'Aldol Condensation', reagents: 'Vanillin, acetone, NaOH', temp: '60°C', time: '8h', yield: '65%', available: true },
        { step: 2, reaction: 'Acid-catalyzed cyclization', reagents: 'HCl/AcOH', temp: '100°C', time: '2h', yield: '58%', available: true },
        { step: 3, reaction: 'Purification', reagents: 'Column chromatography', temp: 'RT', time: '3h', yield: '90%', available: true },
        { step: 4, reaction: 'Salt formation', reagents: 'NaOH/EtOH', temp: 'RT', time: '1h', yield: '95%', available: true },
      ],
    },
  ],

  // Safety / ADMET data
  safetyProfile: {
    overallRisk: 'LOW',
    drugLikeness: {
      lipinskiViolations: 0,
      molecularWeight: 368.38,
      logP: 3.2,
      hBondDonors: 2,
      hBondAcceptors: 6,
      rotatableBonds: 8,
      tpsa: 93.06,
      verdict: 'PASS',
    },
    admet: {
      absorption: { giAbsorption: 'High', pgpSubstrate: false, bbbPermeation: false },
      metabolism: { cyp1a2Inhibitor: true, cyp2c19Inhibitor: false, cyp2d6Inhibitor: false, cyp3a4Inhibitor: true },
      toxicity: { ames: false, herg: 'Low risk', hepatotoxicity: false, skinSensitization: false },
    },
    costOfGoods: {
      benchScale: '₹2,400/g',
      pilotScale: '₹890/g',
      plantScale: '₹320/g (estimated)',
      keyReagentCost: 'Pd(OAc)₂ accounts for 42% of bench cost',
      indiaAdvantage: 'All starting materials available domestically via Sigma-Aldrich India / TCI',
    },
  },
};

// Add similar data details for mol7 (Known compound) to demonstrate the suggested changes feature
export const mockKnownMolecule = {
  id: 'mol7',
  name: 'Bisdemethoxycurcumin',
  smilesString: 'OC1=CC=C(/C=C/C(=O)CC(=O)/C=C/C2=CC=C(O)C=C2)C=C1',
  iupacName: '(1E,6E)-1,7-bis(4-hydroxyphenyl)hepta-1,6-diene-3,5-dione',
  molecularFormula: 'C19H16O4',
  molecularWeight: 308.33,
  noveltyScore: 0.12,
  status: 'KNOWN',
  closestMatch: {
    name: 'Bisdemethoxycurcumin', database: 'PubChem',
    tanimotoSimilarity: 1.00, pubchemCid: '5318516',
  },
  paperId: 'p1',
  paperTitle: 'Novel Curcumin Analogs with Enhanced Bioavailability',
  extractionConfidence: 0.89,
  createdAt: '2024-01-20T10:30:00Z',
  suggestedModifications: [
    {
      id: 'mod-mol7-1',
      name: 'Di-trifluoromethyl Bisdemethoxycurcumin (Proposed)',
      smilesString: 'FC(F)(F)c1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(C(F)(F)F)c2)ccc1O',
      description: 'Introduce trifluoromethyl (-CF3) groups at ortho positions to dramatically improve metabolical stability and block phase II glucuronidation conjugate reactions.',
      noveltyScore: 0.94,
      status: 'NOVEL',
      pubchemMatches: 0,
      patentsFound: 0
    },
    {
      id: 'mod-mol7-2',
      name: 'Dimethylamino derivative of Bisdemethoxycurcumin',
      smilesString: 'CN(C)c1cc(/C=C/C(=O)CC(=O)/C=C/c2ccc(O)c(N(C)C)c2)ccc1O',
      description: 'Add basic dimethylamino groups to increase aqueous solubility and enable salt formation for injectable formulation research.',
      noveltyScore: 0.82,
      status: 'NOVEL',
      pubchemMatches: 0,
      patentsFound: 2
    }
  ],
  routeNovelty: {
    isRouteNovel: false,
    routeNoveltyScore: 0.28,
    existingRoutes: 14,
    proposedRouteSteps: 3,
    keyDifference: 'Uses standard aldol condensation route widely described in literature.',
    priorArt: [
      { patent: 'US6521801', year: 2003, similarity: 0.98, route: 'Boric anhydride / tributyl borate catalyzed condensation' }
    ]
  },
  synthesisRoutes: [
    {
      id: 'sr-mol7-1', name: 'Standard Borate Condensation',
      confidence: 0.95, estimatedSteps: 3, estimatedCost: '₹800/g',
      indiaFeasible: true, scalability: 'PLANT',
      steps: [
        { step: 1, reaction: 'Boron complexation', reagents: 'B2O3, tributyl borate', temp: '80°C', time: '1h', yield: '92%', available: true },
        { step: 2, reaction: 'Aldol reaction', reagents: 'Acetylacetone, 4-hydroxybenzaldehyde, butylamine', temp: '80°C', time: '4h', yield: '76%', available: true },
        { step: 3, reaction: 'Hydrolysis', reagents: 'Hot dil. HCl', temp: '60°C', time: '1h', yield: '94%', available: true }
      ]
    }
  ],
  safetyProfile: {
    overallRisk: 'LOW',
    drugLikeness: {
      lipinskiViolations: 0,
      molecularWeight: 308.33,
      logP: 2.8,
      hBondDonors: 2,
      hBondAcceptors: 4,
      rotatableBonds: 6,
      tpsa: 74.60,
      verdict: 'PASS'
    },
    admet: {
      absorption: { giAbsorption: 'High', pgpSubstrate: false, bbbPermeation: 'Medium' },
      metabolism: { cyp1a2Inhibitor: false, cyp2c19Inhibitor: false, cyp2d6Inhibitor: false, cyp3a4Inhibitor: false },
      toxicity: { ames: false, herg: 'Low risk', hepatotoxicity: false, skinSensitization: false }
    }
  }
};

export const mockAlerts = [
  { id: 'a1', type: '7_DAY', moleculeName: 'Curcumin-Analog-7β', moleculeId: 'mol1', message: '7 days left to file patent under Section 31 for Curcumin-Analog-7β', read: false, createdAt: new Date(Date.now() - 2 * 3600e3).toISOString() },
  { id: 'a2', type: 'NOVEL_MOLECULE_FOUND', moleculeName: 'Nimbolide-Derivative-4', moleculeId: 'mol2', message: 'Novel molecule Nimbolide-Derivative-4 detected (novelty score: 0.89)', read: false, createdAt: new Date(Date.now() - 5 * 3600e3).toISOString() },
  { id: 'a3', type: '30_DAY', moleculeName: 'Berberine-QS-2024', moleculeId: 'mol3', message: '30-day alert: Berberine-QS-2024 disclosure window opens soon', read: true, createdAt: new Date(Date.now() - 24 * 3600e3).toISOString() },
  { id: 'a4', type: 'EXPIRED', moleculeName: 'Withaferin-Old-2023', moleculeId: 'mol9', message: 'Section 31 window expired for Withaferin-Old-2023 without patent filing', read: true, createdAt: new Date(Date.now() - 48 * 3600e3).toISOString() },
  { id: 'a5', type: 'ROUTE_NOVEL', moleculeName: 'Curcumin-Analog-7β', moleculeId: 'mol1', message: 'Novel synthesis route detected for Curcumin-Analog-7β — Suzuki coupling pathway scores 0.84 route novelty', read: false, createdAt: new Date(Date.now() - 1 * 3600e3).toISOString() },
];

export const mockInstitutions = [
  { id: 'i1', name: 'IIT Bombay' },
  { id: 'i2', name: 'IIT Delhi' },
  { id: 'i3', name: 'IIT Madras' },
  { id: 'i4', name: 'CSIR-CDRI' },
  { id: 'i5', name: 'CSIR-IICT' },
  { id: 'i6', name: 'NIPER' },
  { id: 'i7', name: 'AIIMS Delhi' },
  { id: 'i8', name: 'University of Delhi' },
];
