export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'TTO_STAFF' | 'RESEARCHER';
  institution: Institution;
}

export interface Institution {
  id: number;
  name: string;
  type: string;
  ttoContactEmail?: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  journal?: string;
  doi?: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  institution: Institution;
  moleculeCount: number;
  novelMoleculeCount: number;
  uploadedAt: string;
  completedAt?: string;
}

export interface Molecule {
  id: string;
  smiles: string;
  iupacName?: string;
  commonName?: string;
  molecularFormula: string;
  molecularWeight: number;
  confidenceScore: number;
  noveltyScore: number;
  tanimotoSimilarity: number;
  closestKnownMatch?: string;
  status: 'NOVEL' | 'KNOWN' | 'UNCERTAIN';
  paperId: string;
}

export interface DisclosureWindow {
  id: string;
  moleculeId: string;
  paperId?: string;
  deadline: string;
  deadlineDate?: string;
  daysRemaining: number;
  status: 'OPEN' | 'CLOSING_SOON' | 'EXPIRED' | 'FILED';
}

export interface Alert {
  id: string;
  type: 'DISCLOSURE_URGENT' | 'NOVELTY_FOUND' | 'PATENT_DEADLINE' | 'SYSTEM';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  moleculeId?: string;
  paperId?: string;
}

export interface DashboardSummary {
  totalPapersScanned: number;
  totalMoleculesExtracted: number;
  novelMoleculesFound: number;
  activeDisclosureWindows: number;
  urgentDisclosures: number;
  papersByStatus: { status: string; count: number }[];
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
