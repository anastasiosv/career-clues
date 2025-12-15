import { Link } from 'react-router-dom';
import { Candidate } from '@/types';
import { MatchBadge } from './MatchBadge';
import { getEducationLabel, getCompanySizeLabel } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CandidateCardProps {
  candidate: Candidate;
  compact?: boolean;
}

export const CandidateCard = ({ candidate, compact = false }: CandidateCardProps) => {
  const latestRole = candidate.pastRoles[0];

  return (
    <Link to={`/cvs/${candidate.id}`}>
      <Card className={cn(
        "group transition-all duration-200 hover:shadow-card-hover cursor-pointer",
        "border-border hover:border-primary/20",
        "animate-fade-in"
      )}>
        <CardContent className={cn("p-5", compact && "p-4")}>
          <div className="flex items-start justify-between gap-4">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold text-sm">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {latestRole?.title} at {latestRole?.company}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span>{candidate.totalYearsExperience} years exp.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>{getEducationLabel(candidate.education.level)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>{getCompanySizeLabel(latestRole?.companySize || 'medium')}</span>
                </div>
              </div>

              {/* Matched Keywords */}
              {!compact && (
                <div className="flex flex-wrap gap-1.5">
                  {candidate.matchedKeywords.slice(0, 6).map(keyword => (
                    <Badge 
                      key={keyword} 
                      variant="secondary" 
                      className="text-xs font-normal"
                    >
                      {keyword}
                    </Badge>
                  ))}
                  {candidate.matchedKeywords.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{candidate.matchedKeywords.length - 6} more
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <MatchBadge band={candidate.matchBand} score={candidate.matchScore} showScore />
              
              {!compact && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>Tech: {candidate.techAdjacency}%</span>
                </div>
              )}
              
              <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
