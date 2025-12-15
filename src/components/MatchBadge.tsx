import { MatchBand } from '@/types';
import { cn } from '@/lib/utils';

interface MatchBadgeProps {
  band: MatchBand;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

export const MatchBadge = ({ 
  band, 
  score, 
  size = 'md',
  showScore = false 
}: MatchBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const bandLabels: Record<MatchBand, string> = {
    high: 'High Match',
    medium: 'Medium Match',
    low: 'Low Match'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        sizeClasses[size],
        band === 'high' && 'match-badge-high',
        band === 'medium' && 'match-badge-medium',
        band === 'low' && 'match-badge-low'
      )}
    >
      <span className={cn(
        'w-2 h-2 rounded-full',
        band === 'high' && 'bg-match-high',
        band === 'medium' && 'bg-match-medium',
        band === 'low' && 'bg-match-low'
      )} />
      {bandLabels[band]}
      {showScore && score !== undefined && (
        <span className="opacity-80">({score}%)</span>
      )}
    </span>
  );
};
