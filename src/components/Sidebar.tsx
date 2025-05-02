
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Code, 
  School,
  Building
} from 'lucide-react';

interface SidebarLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
}

const studentLinks: SidebarLink[] = [
  { 
    icon: <LayoutDashboard className="mr-2 h-5 w-5" />,
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    icon: <Video className="mr-2 h-5 w-5" />,
    label: 'Mock Interviews',
    href: '/mock-interviews'
  },
  {
    icon: <FileText className="mr-2 h-5 w-5" />,
    label: 'Resume Builder',
    href: '/resume-builder'
  },
  {
    icon: <Briefcase className="mr-2 h-5 w-5" />,
    label: 'Job Matches',
    href: '/job-matches'
  },
  {
    icon: <Code className="mr-2 h-5 w-5" />,
    label: 'Coding Labs',
    href: '/coding-labs'
  },
  {
    icon: <GraduationCap className="mr-2 h-5 w-5" />,
    label: 'Courses',
    href: '/courses'
  },
];

const collegeLinks: SidebarLink[] = [
  { 
    icon: <LayoutDashboard className="mr-2 h-5 w-5" />,
    label: 'Dashboard',
    href: '/college-dashboard'
  },
  {
    icon: <School className="mr-2 h-5 w-5" />,
    label: 'Student Analytics',
    href: '/student-analytics'
  },
  {
    icon: <Users className="mr-2 h-5 w-5" />,
    label: 'Placements',
    href: '/placements'
  },
];

const employerLinks: SidebarLink[] = [
  { 
    icon: <LayoutDashboard className="mr-2 h-5 w-5" />,
    label: 'Dashboard',
    href: '/employer-dashboard'
  },
  {
    icon: <Users className="mr-2 h-5 w-5" />,
    label: 'Talent Pool',
    href: '/talent-pool'
  },
  {
    icon: <Building className="mr-2 h-5 w-5" />,
    label: 'Job Listings',
    href: '/job-listings'
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const userType = "student"; // Placeholder - will come from auth context later
  
  const links = userType === "student" 
    ? studentLinks 
    : userType === "college" 
    ? collegeLinks 
    : employerLinks;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-20 w-64 transform overflow-y-auto border-r bg-background p-4 transition-all md:translate-x-0">
      <div className="flex h-16 items-center border-b">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-highlite-primary">
            Highlite<span className="text-highlite-accent">X</span>
          </span>
        </Link>
      </div>
      
      <nav className="space-y-6 pt-6">
        <div className="space-y-1">
          <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Main Navigation
          </p>
          {links.map((link, index) => (
            <Link key={index} to={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  location.pathname === link.href && "bg-muted"
                )}
              >
                {link.icon}
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
