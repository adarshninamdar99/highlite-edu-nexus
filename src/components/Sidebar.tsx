
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
  Building,
  BookOpen,
  ClipboardList,
  Award,
  Calendar,
  MessageSquare,
  Settings
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
    href: '/student-dashboard'
  },
  {
    icon: <BookOpen className="mr-2 h-5 w-5" />,
    label: 'My Courses',
    href: '/courses'
  },
  {
    icon: <ClipboardList className="mr-2 h-5 w-5" />,
    label: 'Assignments',
    href: '/assignments'
  },
  {
    icon: <Code className="mr-2 h-5 w-5" />,
    label: 'Coding Labs',
    href: '/coding-labs'
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
    icon: <Calendar className="mr-2 h-5 w-5" />,
    label: 'Schedule',
    href: '/schedule'
  },
  {
    icon: <Award className="mr-2 h-5 w-5" />,
    label: 'Certificates',
    href: '/certificates'
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
  // This would typically come from auth context or user state
  // For demo purposes, we'll determine based on the current route
  const getCurrentUserType = () => {
    if (location.pathname.includes('student')) {
      return 'student';
    } else if (location.pathname.includes('employer')) {
      return 'employer';
    } else if (location.pathname.includes('college')) {
      return 'college';
    }
    // Routes like /courses, /assignments, /coding-labs should default to student
    if (['/courses', '/assignments', '/mock-interviews', '/resume-builder', '/coding-labs'].includes(location.pathname)) {
      return 'student';
    }
    // Default to student if unknown
    return 'student';
  };
  
  const userType = getCurrentUserType();
  
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
          <div className="mb-4 px-2 py-1">
            <div className="rounded-md bg-muted px-3 py-2">
              <p className="font-medium text-sm">
                {userType === 'student' ? 'Student Portal' : 
                 userType === 'employer' ? 'Employer Portal' : 
                 'College Portal'}
              </p>
            </div>
          </div>
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
        
        {/* Student Support Links */}
        {userType === 'student' && (
          <div className="space-y-1 border-t pt-4">
            <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Support
            </p>
            <Link to="/help">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Help & Support
              </Button>
            </Link>
            <Link to="/settings">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        )}
        
        {/* User Type Switcher - for demo purposes */}
        <div className="space-y-1 border-t pt-4 mt-6">
          <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Switch Portal
          </p>
          <Link to="/student-dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Student View
            </Button>
          </Link>
          <Link to="/employer-dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Building className="mr-2 h-5 w-5" />
              Employer View
            </Button>
          </Link>
          <Link to="/college-dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <School className="mr-2 h-5 w-5" />
              College View
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
