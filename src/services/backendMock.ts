/**
 * Backend Mock Service
 * 
 * This module centralizes all mock backend operations.
 * In a real application, these would be API calls to actual backend services.
 */

import { 
  JobDescription, 
  Candidate, 
  FilterState, 
  QAMessage, 
  Citation,
  SearchResult,
  MatchBand,
  EducationLevel,
  CompanySize
} from '@/types';
import { mockJobDescription, mockCandidates } from '@/data/mockData';

// Simulated network delay
const simulateDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Parse Job Description from file
 * In reality, this would use OCR/document parsing
 */
export const parseJobDescription = async (file: File): Promise<JobDescription> => {
  await simulateDelay(1000);
  
  // Mock: Return the predefined job description
  return {
    ...mockJobDescription,
    filename: file.name
  };
};

/**
 * Parse multiple CVs from files
 */
export const parseCVs = async (files: File[]): Promise<Candidate[]> => {
  await simulateDelay(1500);
  
  // Mock: Return predefined candidates mapped to uploaded filenames
  return mockCandidates.map((candidate, index) => ({
    ...candidate,
    filename: files[index]?.name || candidate.filename
  }));
};

/**
 * Compute match band for a candidate against a job description
 */
export const computeMatchBand = (
  candidate: Candidate, 
  jobDescription: JobDescription
): { band: MatchBand; score: number; explanation: string } => {
  let score = 0;
  const maxScore = 100;
  
  // Education match (15 points)
  const educationOrder: EducationLevel[] = ['high_school', 'other', 'bachelors', 'masters', 'phd'];
  const candidateEduIndex = educationOrder.indexOf(candidate.education.level);
  const requiredEduIndex = educationOrder.indexOf(jobDescription.educationRequirement);
  if (candidateEduIndex >= requiredEduIndex) {
    score += 15;
  }
  
  // Experience match (25 points)
  if (candidate.totalYearsExperience >= jobDescription.minYearsExperience) {
    score += 25;
    // Bonus for exceeding requirements
    if (candidate.totalYearsExperience >= jobDescription.minYearsExperience * 1.5) {
      score += 5;
    }
  } else {
    // Partial credit
    score += Math.floor((candidate.totalYearsExperience / jobDescription.minYearsExperience) * 15);
  }
  
  // Required skills match (35 points)
  const matchedRequired = jobDescription.requirements.filter(req => 
    candidate.skills.some(skill => 
      skill.toLowerCase().includes(req.toLowerCase()) ||
      req.toLowerCase().includes(skill.toLowerCase())
    )
  );
  score += Math.floor((matchedRequired.length / jobDescription.requirements.length) * 35);
  
  // Preferred skills match (15 points)
  const matchedPreferred = jobDescription.preferredSkills.filter(pref =>
    candidate.skills.some(skill =>
      skill.toLowerCase().includes(pref.toLowerCase()) ||
      pref.toLowerCase().includes(skill.toLowerCase())
    )
  );
  score += Math.floor((matchedPreferred.length / jobDescription.preferredSkills.length) * 15);
  
  // Tech adjacency bonus (10 points)
  score += Math.floor(candidate.techAdjacency / 10);
  
  // Determine band
  let band: MatchBand;
  if (score >= 75) {
    band = 'high';
  } else if (score >= 50) {
    band = 'medium';
  } else {
    band = 'low';
  }
  
  return {
    band,
    score,
    explanation: candidate.matchExplanation.overallReason
  };
};

/**
 * Filter candidates based on filter state
 */
export const filterCandidates = async (
  candidates: Candidate[],
  filters: FilterState
): Promise<Candidate[]> => {
  await simulateDelay(200);
  
  return candidates.filter(candidate => {
    // Education filter
    if (filters.educationLevels.length > 0 && 
        !filters.educationLevels.includes(candidate.education.level)) {
      return false;
    }
    
    // Experience filter
    if (candidate.totalYearsExperience < filters.minYearsExperience ||
        candidate.totalYearsExperience > filters.maxYearsExperience) {
      return false;
    }
    
    // Company size filter
    if (filters.companySizes.length > 0) {
      const hasMatchingCompany = candidate.pastRoles.some(role =>
        filters.companySizes.includes(role.companySize)
      );
      if (!hasMatchingCompany) return false;
    }
    
    // Tech adjacency filter
    if (candidate.techAdjacency < filters.minTechAdjacency) {
      return false;
    }
    
    // Match band filter
    if (filters.matchBands.length > 0 && 
        !filters.matchBands.includes(candidate.matchBand)) {
      return false;
    }
    
    // Keyword filter
    if (filters.keywords.length > 0) {
      const hasAllKeywords = filters.keywords.every(keyword =>
        candidate.matchedKeywords.some(mk =>
          mk.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      if (!hasAllKeywords) return false;
    }
    
    return true;
  });
};

/**
 * Search corpus (CVs and JD) for relevant content
 */
export const searchCorpus = async (
  query: string,
  candidates: Candidate[],
  jobDescription: JobDescription
): Promise<SearchResult[]> => {
  await simulateDelay(300);
  
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();
  
  candidates.forEach(candidate => {
    const content = candidate.content.toLowerCase();
    if (content.includes(queryLower)) {
      // Find the snippet containing the query
      const index = content.indexOf(queryLower);
      const start = Math.max(0, index - 50);
      const end = Math.min(content.length, index + queryLower.length + 100);
      const snippet = '...' + candidate.content.substring(start, end) + '...';
      
      results.push({
        candidateId: candidate.id,
        candidateName: candidate.name,
        snippet: snippet.trim(),
        relevance: 0.8 + Math.random() * 0.2
      });
    }
  });
  
  return results.sort((a, b) => b.relevance - a.relevance);
};

/**
 * Mock LLM Q&A service
 */
export const askQuestion = async (
  question: string,
  candidates: Candidate[],
  jobDescription: JobDescription
): Promise<{ answer: string; citations: Citation[] }> => {
  await simulateDelay(1000);
  
  const questionLower = question.toLowerCase();
  
  // Check if question is about the corpus
  const corpusKeywords = [
    'candidate', 'cv', 'resume', 'experience', 'skill', 'education',
    'job', 'requirement', 'qualification', 'react', 'typescript',
    'years', 'company', 'role', 'position', 'who', 'which', 'what',
    'how many', 'compare', 'best', 'top', 'highest', 'match'
  ];
  
  const isAboutCorpus = corpusKeywords.some(kw => questionLower.includes(kw));
  
  if (!isAboutCorpus) {
    return {
      answer: "I can only answer questions about the uploaded CVs and job description. Please ask about candidate qualifications, experience, skills, or how they match the job requirements.",
      citations: []
    };
  }
  
  // Generate contextual answer based on question type
  const citations: Citation[] = [];
  let answer = '';
  
  if (questionLower.includes('react') || questionLower.includes('typescript')) {
    const reactCandidates = candidates.filter(c => 
      c.skills.includes('React') || c.skills.includes('TypeScript')
    );
    
    answer = `Based on the uploaded CVs, ${reactCandidates.length} candidates have React or TypeScript experience:\n\n`;
    
    reactCandidates.slice(0, 3).forEach(c => {
      answer += `• **${c.name}**: ${c.totalYearsExperience} years of experience\n`;
      citations.push({
        source: c.filename,
        snippet: c.matchExplanation.skillMatches.find(s => s.skill === 'React')?.citation || 
                 `Skills: ${c.skills.join(', ')}`,
        relevance: 0.9
      });
    });
  } else if (questionLower.includes('best') || questionLower.includes('top') || questionLower.includes('highest')) {
    const topCandidates = [...candidates]
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
    
    answer = `The top matching candidates for this position are:\n\n`;
    
    topCandidates.forEach((c, i) => {
      answer += `${i + 1}. **${c.name}** (${c.matchScore}% match) - ${c.matchExplanation.overallReason}\n`;
      citations.push({
        source: c.filename,
        snippet: c.matchExplanation.overallReason,
        relevance: 1 - (i * 0.1)
      });
    });
  } else if (questionLower.includes('experience') || questionLower.includes('years')) {
    const sortedByExp = [...candidates].sort((a, b) => b.totalYearsExperience - a.totalYearsExperience);
    
    answer = `Here's a breakdown of experience across candidates:\n\n`;
    
    sortedByExp.forEach(c => {
      answer += `• **${c.name}**: ${c.totalYearsExperience} years\n`;
      citations.push({
        source: c.filename,
        snippet: `Total experience: ${c.totalYearsExperience} years across ${c.pastRoles.length} roles`,
        relevance: 0.85
      });
    });
  } else if (questionLower.includes('job') || questionLower.includes('requirement')) {
    answer = `The job requirements for **${jobDescription.title}** at ${jobDescription.company} include:\n\n`;
    answer += `**Required Skills:**\n${jobDescription.requirements.map(r => `• ${r}`).join('\n')}\n\n`;
    answer += `**Preferred Skills:**\n${jobDescription.preferredSkills.map(p => `• ${p}`).join('\n')}\n\n`;
    answer += `**Minimum Experience:** ${jobDescription.minYearsExperience} years`;
    
    citations.push({
      source: jobDescription.filename,
      snippet: jobDescription.content.substring(0, 200) + '...',
      relevance: 1.0
    });
  } else {
    // Generic search-based answer
    const searchResults = await searchCorpus(question, candidates, jobDescription);
    
    if (searchResults.length > 0) {
      answer = `Here's what I found related to your question:\n\n`;
      searchResults.slice(0, 3).forEach(result => {
        answer += `From **${result.candidateName}**: "${result.snippet}"\n\n`;
        citations.push({
          source: candidates.find(c => c.id === result.candidateId)?.filename || '',
          snippet: result.snippet,
          relevance: result.relevance
        });
      });
    } else {
      answer = "I couldn't find specific information related to your question in the uploaded documents. Try asking about specific skills, experience levels, or candidate qualifications.";
    }
  }
  
  return { answer, citations };
};

/**
 * Get all candidates grouped by match band
 */
export const getCandidatesByBand = async (
  candidates: Candidate[]
): Promise<Record<MatchBand, Candidate[]>> => {
  await simulateDelay(200);
  
  return {
    high: candidates.filter(c => c.matchBand === 'high'),
    medium: candidates.filter(c => c.matchBand === 'medium'),
    low: candidates.filter(c => c.matchBand === 'low')
  };
};

/**
 * Sort candidates by a specific attribute
 */
export const sortCandidates = (
  candidates: Candidate[],
  sortBy: 'experience' | 'matchScore' | 'name' | 'matchedKeywords',
  order: 'asc' | 'desc' = 'desc'
): Candidate[] => {
  const sorted = [...candidates].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'experience':
        comparison = a.totalYearsExperience - b.totalYearsExperience;
        break;
      case 'matchScore':
        comparison = a.matchScore - b.matchScore;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'matchedKeywords':
        comparison = a.matchedKeywords.length - b.matchedKeywords.length;
        break;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
};

/**
 * Get initial filter state
 */
export const getDefaultFilterState = (): FilterState => ({
  educationLevels: [],
  minYearsExperience: 0,
  maxYearsExperience: 20,
  companySizes: [],
  minTechAdjacency: 0,
  matchBands: [],
  keywords: []
});

/**
 * Export mock data for testing
 */
export const getMockData = () => ({
  jobDescription: mockJobDescription,
  candidates: mockCandidates
});
