import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { MatchBadge } from '@/components/MatchBadge';
import { ExplanationPanel } from '@/components/ExplanationPanel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockCandidates } from '@/data/mockData';
import { getEducationLabel, getCompanySizeLabel } from '@/data/mockData';
import { 
  ArrowLeft, 
  Mail, 
  FileText,
  GraduationCap,
  Briefcase,
  Building2,
  Calendar,
  Code,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CVDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const candidate = mockCandidates.find(c => c.id === id);
  const candidateIndex = mockCandidates.findIndex(c => c.id === id);
  const prevCandidate = candidateIndex > 0 ? mockCandidates[candidateIndex - 1] : null;
  const nextCandidate = candidateIndex < mockCandidates.length - 1 ? mockCandidates[candidateIndex + 1] : null;

  if (!candidate) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Candidate not found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The candidate you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate('/cvs')}>
                View All Candidates
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card/50">
          <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/cvs')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All CVs
              </Button>
              <div className="flex items-center gap-2">
                {prevCandidate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/cvs/${prevCandidate.id}`)}
                    className="gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                )}
                {nextCandidate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/cvs/${nextCandidate.id}`)}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Candidate Header */}
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-2xl">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                      {candidate.name}
                    </h1>
                    <p className="text-muted-foreground">
                      {candidate.pastRoles[0]?.title} at {candidate.pastRoles[0]?.company}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <a 
                        href={`mailto:${candidate.email}`}
                        className="flex items-center gap-1.5 hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {candidate.email}
                      </a>
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4" />
                        {candidate.filename}
                      </span>
                    </div>
                  </div>
                  <MatchBadge band={candidate.matchBand} score={candidate.matchScore} size="lg" showScore />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{candidate.totalYearsExperience}</p>
                        <p className="text-xs text-muted-foreground">Years Exp.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold truncate">
                          {getEducationLabel(candidate.education.level)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {candidate.education.institution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{candidate.techAdjacency}%</p>
                        <p className="text-xs text-muted-foreground">Tech Adjacency</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{candidate.matchedKeywords.length}</p>
                        <p className="text-xs text-muted-foreground">Keywords Matched</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Work Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {candidate.pastRoles.map((role, index) => (
                    <div key={index} className="relative">
                      {index < candidate.pastRoles.length - 1 && (
                        <div className="absolute left-[11px] top-10 bottom-0 w-0.5 bg-border" />
                      )}
                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{role.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {role.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {role.duration}
                              <span className="text-muted-foreground/50">•</span>
                              {role.yearsInRole} {role.yearsInRole === 1 ? 'year' : 'years'}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {getCompanySizeLabel(role.companySize)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {role.description}
                          </p>
                          {role.relevantKeywords.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {role.relevantKeywords.map(keyword => (
                                <Badge 
                                  key={keyword}
                                  variant="secondary"
                                  className={cn(
                                    "text-xs",
                                    candidate.matchedKeywords.includes(keyword) && "match-badge-high border"
                                  )}
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                      <Badge
                        key={skill}
                        variant={candidate.matchedKeywords.includes(skill) ? "default" : "secondary"}
                        className={cn(
                          candidate.matchedKeywords.includes(skill) && "match-badge-high border"
                        )}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {getEducationLabel(candidate.education.level)} in {candidate.education.field}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {candidate.education.institution}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Class of {candidate.education.year}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Match Explanation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <ExplanationPanel candidate={candidate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CVDetails;
