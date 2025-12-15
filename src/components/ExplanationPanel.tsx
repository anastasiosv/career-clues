import { Candidate } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  Briefcase,
  Code,
  Tag,
  Quote,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExplanationPanelProps {
  candidate: Candidate;
}

export const ExplanationPanel = ({ candidate }: ExplanationPanelProps) => {
  const { matchExplanation } = candidate;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-primary" />
          Match Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Reason */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-foreground leading-relaxed">
            {matchExplanation.overallReason}
          </p>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Education</span>
            {matchExplanation.educationMatch ? (
              <CheckCircle2 className="w-4 h-4 text-match-high ml-auto" />
            ) : (
              <XCircle className="w-4 h-4 text-match-low ml-auto" />
            )}
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            {matchExplanation.educationNote}
          </p>
        </div>

        <Separator />

        {/* Experience */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Experience</span>
            {matchExplanation.experienceMatch ? (
              <CheckCircle2 className="w-4 h-4 text-match-high ml-auto" />
            ) : (
              <XCircle className="w-4 h-4 text-match-low ml-auto" />
            )}
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            {matchExplanation.experienceNote}
          </p>
        </div>

        <Separator />

        {/* Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Required Skills</span>
          </div>
          <div className="space-y-2 pl-6">
            {matchExplanation.skillMatches.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2">
                  {skill.matched ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-match-high" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-match-low" />
                  )}
                  <span className={cn(
                    "text-sm",
                    skill.matched ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {skill.skill}
                  </span>
                </div>
                {skill.citation && (
                  <div className="flex items-start gap-2 ml-5 mt-1">
                    <Quote className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground italic">
                      "{skill.citation}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Keywords */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Keyword Matches</span>
          </div>
          <div className="space-y-2 pl-6">
            {matchExplanation.keywordMatches.map((kw, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2">
                  {kw.found ? (
                    <Badge className="match-badge-high text-xs border">
                      {kw.keyword}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      {kw.keyword}
                    </Badge>
                  )}
                </div>
                {kw.context && (
                  <div className="flex items-start gap-2 mt-1">
                    <Quote className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground italic">
                      "{kw.context}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
