import { useState, useRef, useEffect } from 'react';
import { QAMessage, Citation, Candidate, JobDescription } from '@/types';
import { askQuestion } from '@/services/backendMock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  FileText, 
  Loader2,
  Quote,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QAPanelProps {
  candidates: Candidate[];
  jobDescription: JobDescription;
}

export const QAPanel = ({ candidates, jobDescription }: QAPanelProps) => {
  const [messages, setMessages] = useState<QAMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm here to help you explore the uploaded CVs and job description. You can ask me questions like:\n\n• "Which candidates have React experience?"\n• "Who are the top matching candidates?"\n• "Compare experience levels across candidates"\n• "What are the job requirements?"\n\nI'll always cite my sources from the uploaded documents.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: QAMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { answer, citations } = await askQuestion(
        userMessage.content,
        candidates,
        jobDescription
      );

      const assistantMessage: QAMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: answer,
        citations,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: QAMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your question. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const suggestedQuestions = [
    "Who are the top matching candidates?",
    "Which candidates have React experience?",
    "Compare years of experience",
    "What are the job requirements?"
  ];

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">CV Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Ask questions about candidates and job requirements
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-fade-in",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                message.role === 'assistant' 
                  ? "bg-primary/10" 
                  : "bg-secondary"
              )}>
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-primary" />
                ) : (
                  <User className="w-4 h-4 text-secondary-foreground" />
                )}
              </div>

              {/* Content */}
              <div className={cn(
                "flex-1 max-w-[80%]",
                message.role === 'user' && "flex flex-col items-end"
              )}>
                <div className={cn(
                  "rounded-2xl px-4 py-3",
                  message.role === 'assistant' 
                    ? "bg-muted text-foreground rounded-tl-sm" 
                    : "bg-primary text-primary-foreground rounded-tr-sm"
                )}>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('•') ? 'ml-2' : ''}>
                        {line.split('**').map((part, j) => 
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Citations */}
                {message.citations && message.citations.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Quote className="w-3 h-3" />
                      Sources
                    </p>
                    {message.citations.map((citation, idx) => (
                      <Card key={idx} className="bg-muted/50">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-foreground truncate">
                                {citation.source}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                "{citation.snippet}"
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching documents...
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-6 py-3 border-t bg-muted/20">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput(question);
                  inputRef.current?.focus();
                }}
                className="text-xs h-7"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form 
        onSubmit={handleSubmit}
        className="p-4 border-t bg-background"
      >
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about candidates or job requirements..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
