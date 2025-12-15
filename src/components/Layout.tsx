import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Upload,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/leaderboard', label: 'Leaderboard', icon: LayoutDashboard },
  { path: '/cvs', label: 'All CVs', icon: FileText },
  { path: '/qa', label: 'Q&A', icon: MessageSquare },
];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">CV Screener</h1>
              <p className="text-xs text-sidebar-foreground/70">Candidate Analysis</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path === '/cvs' && location.pathname.startsWith('/cvs'));
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Compliance Notice */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="p-4 rounded-lg bg-sidebar-accent/50">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 text-sidebar-foreground/70 shrink-0" />
              <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
                This tool does not make hiring decisions; it groups candidates by job-related criteria for human review.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
};
