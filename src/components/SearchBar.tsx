import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search candidates...",
  className 
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn(
      "relative flex items-center",
      className
    )}>
      <Search className={cn(
        "absolute left-3 w-4 h-4 transition-colors",
        isFocused ? "text-primary" : "text-muted-foreground"
      )} />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "pl-10 pr-10 h-11",
          "transition-all duration-200",
          isFocused && "ring-2 ring-primary/20"
        )}
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange('')}
          className="absolute right-1 h-8 w-8 p-0 hover:bg-accent"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
