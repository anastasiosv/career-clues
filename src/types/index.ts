export type MatchBand = 'high' | 'medium' | 'low';

export type EducationLevel = 'high_school' | 'bachelors' | 'masters' | 'phd' | 'other';

export type CompanySize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise';

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  filename: string;
  content: string;
  requirements: string[];
  preferredSkills: string[];
  minYearsExperience: number;
  educationRequirement: EducationLevel;
  keywords: string[];
}

export interface PastRole {
  title: string;
  company: string;
  companySize: CompanySize;
  duration: string;
  yearsInRole: number;
  description: string;
  relevantKeywords: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  filename: string;
  content: string;
  education: {
    level: EducationLevel;
    field: string;
    institution: string;
    year: number;
  };
  totalYearsExperience: number;
  pastRoles: PastRole[];
  skills: string[];
  techAdjacency: number; // 0-100 score
  matchedKeywords: string[];
  matchBand: MatchBand;
  matchScore: number; // 0-100
  matchExplanation: MatchExplanation;
}

export interface MatchExplanation {
  educationMatch: boolean;
  educationNote: string;
  experienceMatch: boolean;
  experienceNote: string;
  skillMatches: SkillMatch[];
  keywordMatches: KeywordMatch[];
  overallReason: string;
}

export interface SkillMatch {
  skill: string;
  matched: boolean;
  citation?: string;
}

export interface KeywordMatch {
  keyword: string;
  found: boolean;
  context?: string;
}

export interface FilterState {
  educationLevels: EducationLevel[];
  minYearsExperience: number;
  maxYearsExperience: number;
  companySizes: CompanySize[];
  minTechAdjacency: number;
  matchBands: MatchBand[];
  keywords: string[];
}

export interface QAMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

export interface Citation {
  source: string;
  snippet: string;
  relevance: number;
}

export interface SearchResult {
  candidateId: string;
  candidateName: string;
  snippet: string;
  relevance: number;
}
