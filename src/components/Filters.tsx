import { FilterState, EducationLevel, CompanySize, MatchBand } from '@/types';
import { getEducationLabel, getCompanySizeLabel, getMatchBandLabel } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Filter, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableKeywords: string[];
}

export const Filters = ({ filters, onFilterChange, availableKeywords }: FiltersProps) => {
  const educationLevels: EducationLevel[] = ['high_school', 'bachelors', 'masters', 'phd', 'other'];
  const companySizes: CompanySize[] = ['startup', 'small', 'medium', 'large', 'enterprise'];
  const matchBands: MatchBand[] = ['high', 'medium', 'low'];

  const handleEducationChange = (level: EducationLevel, checked: boolean) => {
    const newLevels = checked
      ? [...filters.educationLevels, level]
      : filters.educationLevels.filter(l => l !== level);
    onFilterChange({ ...filters, educationLevels: newLevels });
  };

  const handleCompanySizeChange = (size: CompanySize, checked: boolean) => {
    const newSizes = checked
      ? [...filters.companySizes, size]
      : filters.companySizes.filter(s => s !== size);
    onFilterChange({ ...filters, companySizes: newSizes });
  };

  const handleMatchBandChange = (band: MatchBand, checked: boolean) => {
    const newBands = checked
      ? [...filters.matchBands, band]
      : filters.matchBands.filter(b => b !== band);
    onFilterChange({ ...filters, matchBands: newBands });
  };

  const handleKeywordToggle = (keyword: string) => {
    const newKeywords = filters.keywords.includes(keyword)
      ? filters.keywords.filter(k => k !== keyword)
      : [...filters.keywords, keyword];
    onFilterChange({ ...filters, keywords: newKeywords });
  };

  const handleReset = () => {
    onFilterChange({
      educationLevels: [],
      minYearsExperience: 0,
      maxYearsExperience: 20,
      companySizes: [],
      minTechAdjacency: 0,
      matchBands: [],
      keywords: []
    });
  };

  const activeFilterCount = 
    filters.educationLevels.length +
    filters.companySizes.length +
    filters.matchBands.length +
    filters.keywords.length +
    (filters.minYearsExperience > 0 ? 1 : 0) +
    (filters.maxYearsExperience < 20 ? 1 : 0) +
    (filters.minTechAdjacency > 0 ? 1 : 0);

  return (
    <div className="bg-card rounded-xl border shadow-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount} active
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Match Band */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Match Band</Label>
        <div className="space-y-2">
          {matchBands.map(band => (
            <div key={band} className="flex items-center space-x-2">
              <Checkbox
                id={`band-${band}`}
                checked={filters.matchBands.includes(band)}
                onCheckedChange={(checked) => handleMatchBandChange(band, checked as boolean)}
              />
              <Label
                htmlFor={`band-${band}`}
                className={cn(
                  "text-sm cursor-pointer",
                  band === 'high' && 'text-match-high',
                  band === 'medium' && 'text-match-medium',
                  band === 'low' && 'text-match-low'
                )}
              >
                {getMatchBandLabel(band)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Years of Experience</Label>
        <div className="px-2">
          <Slider
            value={[filters.minYearsExperience, filters.maxYearsExperience]}
            onValueChange={([min, max]) => 
              onFilterChange({ ...filters, minYearsExperience: min, maxYearsExperience: max })
            }
            min={0}
            max={20}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{filters.minYearsExperience} years</span>
            <span>{filters.maxYearsExperience}+ years</span>
          </div>
        </div>
      </div>

      {/* Education Level */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Education Level</Label>
        <div className="space-y-2">
          {educationLevels.map(level => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`edu-${level}`}
                checked={filters.educationLevels.includes(level)}
                onCheckedChange={(checked) => handleEducationChange(level, checked as boolean)}
              />
              <Label htmlFor={`edu-${level}`} className="text-sm cursor-pointer">
                {getEducationLabel(level)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Company Size */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Company Size Experience</Label>
        <div className="space-y-2">
          {companySizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.companySizes.includes(size)}
                onCheckedChange={(checked) => handleCompanySizeChange(size, checked as boolean)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                {getCompanySizeLabel(size)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Adjacency */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Minimum Tech Adjacency</Label>
        <div className="px-2">
          <Slider
            value={[filters.minTechAdjacency]}
            onValueChange={([value]) => 
              onFilterChange({ ...filters, minTechAdjacency: value })
            }
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0%</span>
            <span className="font-medium">{filters.minTechAdjacency}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Required Keywords</Label>
        <div className="flex flex-wrap gap-2">
          {availableKeywords.map(keyword => (
            <Badge
              key={keyword}
              variant={filters.keywords.includes(keyword) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                filters.keywords.includes(keyword) 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-accent"
              )}
              onClick={() => handleKeywordToggle(keyword)}
            >
              {keyword}
              {filters.keywords.includes(keyword) && (
                <X className="w-3 h-3 ml-1" />
              )}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
