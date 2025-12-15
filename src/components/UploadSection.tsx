import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadSectionProps {
  type: 'job' | 'cvs';
  files: File[];
  onFilesChange: (files: File[]) => void;
  isProcessing?: boolean;
  isComplete?: boolean;
}

export const UploadSection = ({ 
  type, 
  files, 
  onFilesChange, 
  isProcessing = false,
  isComplete = false 
}: UploadSectionProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf' || 
              file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (type === 'job') {
      onFilesChange(droppedFiles.slice(0, 1));
    } else {
      onFilesChange([...files, ...droppedFiles]);
    }
  }, [type, files, onFilesChange]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (type === 'job') {
      onFilesChange(selectedFiles.slice(0, 1));
    } else {
      onFilesChange([...files, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const config = {
    job: {
      title: 'Job Description',
      description: 'Upload the job description document',
      accept: '.pdf,.docx',
      multiple: false,
      icon: FileText
    },
    cvs: {
      title: 'Candidate CVs',
      description: 'Upload one or more CV documents',
      accept: '.pdf,.docx',
      multiple: true,
      icon: Upload
    }
  };

  const { title, description, accept, multiple, icon: Icon } = config[type];

  return (
    <Card className={cn(
      "transition-all duration-200",
      isComplete && "border-match-high bg-match-high-bg/30"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isComplete ? "bg-match-high/20" : "bg-primary/10"
            )}>
              {isComplete ? (
                <CheckCircle2 className="w-5 h-5 text-match-high" />
              ) : (
                <Icon className="w-5 h-5 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          {files.length > 0 && (
            <Badge variant="secondary">
              {files.length} {files.length === 1 ? 'file' : 'files'}
            </Badge>
          )}
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200",
            isDragOver && "border-primary bg-primary/5",
            !isDragOver && "border-border hover:border-primary/50",
            isProcessing && "opacity-50 pointer-events-none"
          )}
        >
          <input
            type="file"
            id={`upload-${type}`}
            accept={accept}
            multiple={multiple}
            onChange={handleFileInput}
            className="hidden"
            disabled={isProcessing}
          />
          
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Processing...</p>
            </div>
          ) : (
            <label 
              htmlFor={`upload-${type}`}
              className="cursor-pointer"
            >
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop or{' '}
                <span className="text-primary font-medium">browse files</span>
              </p>
              <p className="text-xs text-muted-foreground/70">
                PDF or DOCX files only
              </p>
            </label>
          )}
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0 shrink-0"
                  disabled={isProcessing}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
