import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { UploadSection } from '@/components/UploadSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  FileSearch, 
  Users, 
  MessageSquare, 
  BarChart3,
  Sparkles,
  Shield
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [jobFile, setJobFile] = useState<File[]>([]);
  const [cvFiles, setCvFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    navigate('/leaderboard');
  };

  const features = [
    {
      icon: FileSearch,
      title: 'Smart Extraction',
      description: 'Automatically extracts education, experience, skills, and keywords from CVs'
    },
    {
      icon: BarChart3,
      title: 'Match Banding',
      description: 'Groups candidates into High, Medium, and Low match bands with explanations'
    },
    {
      icon: Users,
      title: 'Interactive Filtering',
      description: 'Filter by experience, education, company size, and technical adjacency'
    },
    {
      icon: MessageSquare,
      title: 'AI-Powered Q&A',
      description: 'Ask questions about candidates with grounded answers and citations'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-background border-b">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                CV Screening Made Simple
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Find the Right Candidates
                <br />
                <span className="text-primary">Faster</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload a job description and candidate CVs. Our tool extracts key information, 
                matches candidates to requirements, and helps you make informed decisions.
              </p>
            </div>

            {/* Upload Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <UploadSection
                type="job"
                files={jobFile}
                onFilesChange={setJobFile}
                isProcessing={isProcessing}
                isComplete={jobFile.length > 0 && !isProcessing}
              />
              <UploadSection
                type="cvs"
                files={cvFiles}
                onFilesChange={setCvFiles}
                isProcessing={isProcessing}
                isComplete={cvFiles.length > 0 && !isProcessing}
              />
            </div>

            {/* Demo Notice */}
            <Card className="bg-muted/50 border-dashed mb-8">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-5 h-5 text-primary shrink-0" />
                  <p>
                    <strong>Demo Mode:</strong> This is a mock frontend. Uploads simulate processing 
                    and display pre-loaded sample data. Click "Analyze Candidates" to explore the demo.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isProcessing}
                className="px-8 py-6 text-lg gap-3"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    Analyze Candidates
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-card-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <Card className="bg-muted/30 border-muted">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This tool does not make hiring decisions. It groups candidates by job-related 
                    criteria to assist human reviewers. All matching is based on objective, 
                    job-relevant factors extracted from submitted documents. Final hiring decisions 
                    should be made by qualified personnel considering the complete candidate profile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
