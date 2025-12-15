import { Layout } from '@/components/Layout';
import { QAPanel } from '@/components/QAPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCandidates, mockJobDescription } from '@/data/mockData';
import { 
  MessageSquare, 
  FileText, 
  Users,
  Briefcase,
  Target
} from 'lucide-react';

const QA = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card/50">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <MessageSquare className="w-7 h-7 text-primary" />
              Q&A Assistant
            </h1>
            <p className="text-muted-foreground mt-1">
              Ask questions about candidates and get answers grounded in the uploaded documents
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat Panel */}
            <div className="lg:col-span-2 h-[calc(100vh-16rem)]">
              <QAPanel 
                candidates={mockCandidates} 
                jobDescription={mockJobDescription}
              />
            </div>

            {/* Context Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Job Description */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">{mockJobDescription.title}</h4>
                    <p className="text-sm text-muted-foreground">{mockJobDescription.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    {mockJobDescription.filename}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {mockJobDescription.requirements.slice(0, 5).map(req => (
                        <Badge key={req} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {mockJobDescription.requirements.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{mockJobDescription.requirements.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Candidates Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Candidates in Corpus
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Candidates</span>
                    <span className="font-semibold">{mockCandidates.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">High Match</span>
                    <Badge className="match-badge-high border">
                      {mockCandidates.filter(c => c.matchBand === 'high').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Medium Match</span>
                    <Badge className="match-badge-medium border">
                      {mockCandidates.filter(c => c.matchBand === 'medium').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Low Match</span>
                    <Badge className="match-badge-low border">
                      {mockCandidates.filter(c => c.matchBand === 'low').length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-muted/30 border-dashed">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Ask about specific skills or technologies</li>
                    <li>• Compare candidates by experience level</li>
                    <li>• Query job requirements and qualifications</li>
                    <li>• All answers include source citations</li>
                    <li>• Questions outside the corpus are declined</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QA;
