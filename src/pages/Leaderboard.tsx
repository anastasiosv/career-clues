import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { Filters } from '@/components/Filters';
import { CandidateCard } from '@/components/CandidateCard';
import { SearchBar } from '@/components/SearchBar';
import { MatchBadge } from '@/components/MatchBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCandidates, mockJobDescription } from '@/data/mockData';
import { filterCandidates, sortCandidates, getDefaultFilterState } from '@/services/backendMock';
import { Candidate, FilterState, MatchBand } from '@/types';
import { 
  Trophy, 
  Users, 
  ArrowUpDown,
  FileText,
  Building2,
  TrendingUp
} from 'lucide-react';

const Leaderboard = () => {
  const [filters, setFilters] = useState<FilterState>(getDefaultFilterState());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'matchScore' | 'experience' | 'matchedKeywords'>('matchScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredCandidates = useMemo(() => {
    let result = mockCandidates;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.skills.some(s => s.toLowerCase().includes(query)) ||
        c.matchedKeywords.some(k => k.toLowerCase().includes(query))
      );
    }
    
    // Apply filters (synchronous version for immediate feedback)
    result = result.filter(candidate => {
      if (filters.educationLevels.length > 0 && 
          !filters.educationLevels.includes(candidate.education.level)) {
        return false;
      }
      if (candidate.totalYearsExperience < filters.minYearsExperience ||
          candidate.totalYearsExperience > filters.maxYearsExperience) {
        return false;
      }
      if (filters.companySizes.length > 0) {
        const hasMatchingCompany = candidate.pastRoles.some(role =>
          filters.companySizes.includes(role.companySize)
        );
        if (!hasMatchingCompany) return false;
      }
      if (candidate.techAdjacency < filters.minTechAdjacency) {
        return false;
      }
      if (filters.matchBands.length > 0 && 
          !filters.matchBands.includes(candidate.matchBand)) {
        return false;
      }
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
    
    // Apply sorting
    return sortCandidates(result, sortBy, sortOrder);
  }, [filters, searchQuery, sortBy, sortOrder]);

  const candidatesByBand = useMemo(() => {
    return {
      high: filteredCandidates.filter(c => c.matchBand === 'high'),
      medium: filteredCandidates.filter(c => c.matchBand === 'medium'),
      low: filteredCandidates.filter(c => c.matchBand === 'low')
    };
  }, [filteredCandidates]);

  const stats = useMemo(() => ({
    total: filteredCandidates.length,
    high: candidatesByBand.high.length,
    medium: candidatesByBand.medium.length,
    low: candidatesByBand.low.length,
    avgScore: filteredCandidates.length > 0
      ? Math.round(filteredCandidates.reduce((acc, c) => acc + c.matchScore, 0) / filteredCandidates.length)
      : 0
  }), [filteredCandidates, candidatesByBand]);

  const availableKeywords = useMemo(() => {
    const keywords = new Set<string>();
    mockCandidates.forEach(c => {
      c.matchedKeywords.forEach(k => keywords.add(k));
    });
    return Array.from(keywords);
  }, []);

  const renderBandSection = (band: MatchBand, candidates: Candidate[]) => {
    if (candidates.length === 0) return null;
    
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <MatchBadge band={band} size="lg" />
          <span className="text-sm text-muted-foreground">
            {candidates.length} {candidates.length === 1 ? 'candidate' : 'candidates'}
          </span>
        </div>
        <div className="space-y-3">
          {candidates.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Trophy className="w-7 h-7 text-primary" />
                  Candidate Leaderboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  {mockJobDescription.title} at {mockJobDescription.company}
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-4">
                <Card className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="font-semibold">{stats.total}</span>
                      <span className="text-muted-foreground"> candidates</span>
                    </div>
                  </div>
                </Card>
                <Card className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <div className="text-sm">
                      <span className="font-semibold">{stats.avgScore}%</span>
                      <span className="text-muted-foreground"> avg match</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="w-80 shrink-0 hidden lg:block">
              <div className="sticky top-8">
                <Filters
                  filters={filters}
                  onFilterChange={setFilters}
                  availableKeywords={availableKeywords}
                />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by name, skills, or keywords..."
                  className="flex-1"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground shrink-0">Sort by:</span>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                    <SelectTrigger className="w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matchScore">Match Score</SelectItem>
                      <SelectItem value="experience">Years of Experience</SelectItem>
                      <SelectItem value="matchedKeywords">Keywords Matched</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
                    className="shrink-0"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Band Counts */}
              <div className="flex gap-3 mb-6">
                <Badge className="match-badge-high border">
                  {stats.high} High
                </Badge>
                <Badge className="match-badge-medium border">
                  {stats.medium} Medium
                </Badge>
                <Badge className="match-badge-low border">
                  {stats.low} Low
                </Badge>
              </div>

              {/* Candidates by Band */}
              <div className="space-y-8">
                {renderBandSection('high', candidatesByBand.high)}
                {renderBandSection('medium', candidatesByBand.medium)}
                {renderBandSection('low', candidatesByBand.low)}
                
                {filteredCandidates.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">No candidates found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your filters or search query
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
