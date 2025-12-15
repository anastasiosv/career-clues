import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { CandidateCard } from '@/components/CandidateCard';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCandidates } from '@/data/mockData';
import { sortCandidates } from '@/services/backendMock';
import { 
  FileText, 
  Grid3X3, 
  List, 
  ArrowUpDown,
  Users
} from 'lucide-react';

const CVList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'matchScore' | 'experience' | 'name'>('matchScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [view, setView] = useState<'list' | 'grid'>('list');

  const filteredCandidates = useMemo(() => {
    let result = mockCandidates;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.skills.some(s => s.toLowerCase().includes(query)) ||
        c.pastRoles.some(r => r.title.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    return sortCandidates(result, sortBy, sortOrder);
  }, [searchQuery, sortBy, sortOrder]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card/50">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <FileText className="w-7 h-7 text-primary" />
                  All Candidates
                </h1>
                <p className="text-muted-foreground mt-1">
                  Browse and search all uploaded CVs
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {filteredCandidates.length} candidates
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, skills, or job title..."
              className="flex-1"
            />
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matchScore">Match Score</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}
              >
                <ArrowUpDown className="w-4 h-4" />
              </Button>
              <div className="border-l h-8 mx-2" />
              <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'grid')}>
                <TabsList className="grid grid-cols-2 h-9 w-20">
                  <TabsTrigger value="list" className="px-2">
                    <List className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="grid" className="px-2">
                    <Grid3X3 className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Candidates */}
          {filteredCandidates.length > 0 ? (
            <div className={view === 'grid' 
              ? "grid md:grid-cols-2 gap-4" 
              : "space-y-3"
            }>
              {filteredCandidates.map(candidate => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate}
                  compact={view === 'grid'}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No candidates found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search query
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CVList;
