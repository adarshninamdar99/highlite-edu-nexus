
import React from 'react';
import { GraduationCap, School, Building } from 'lucide-react';

interface UserTypeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const UserTypeCard: React.FC<UserTypeProps> = ({ icon, title, description, benefits }) => {
  return (
    <div className="highlite-card flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="mb-4 rounded-full bg-highlite-extralight p-3 inline-block">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-highlite-primary mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="p-6 flex-grow">
        <h4 className="font-medium text-highlite-secondary mb-3">Key Benefits:</h4>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 mt-1 text-highlite-accent">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ForWhom: React.FC = () => {
  const userTypes: UserTypeProps[] = [
    {
      icon: <GraduationCap className="h-6 w-6 text-highlite-accent" />,
      title: "For Students",
      description: "Prepare for placement interviews and build your career path",
      benefits: [
        "Practice with AI mock interviews tailored to your field",
        "Build ATS-optimized resumes with AI assistance",
        "Get matched with relevant job opportunities",
        "Track your preparation progress with detailed analytics",
        "Access coding labs and live training sessions"
      ]
    },
    {
      icon: <School className="h-6 w-6 text-highlite-accent" />,
      title: "For Colleges",
      description: "Enhance placement records and student preparation",
      benefits: [
        "Track student preparation and interview performance",
        "Access detailed analytics on placement progress",
        "Connect with employers seeking early talent",
        "Deploy targeted training programs for skill gaps",
        "Manage and organize placement drives efficiently"
      ]
    },
    {
      icon: <Building className="h-6 w-6 text-highlite-accent" />,
      title: "For Employers",
      description: "Find well-prepared talent for your organization",
      benefits: [
        "Access a pool of pre-assessed candidates",
        "Post job opportunities directly to matching candidates",
        "Review AI-verified skills and interview performance",
        "Reduce hiring time and improve candidate quality",
        "Connect with educational institutions for talent sourcing"
      ]
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-highlite-primary mb-4">Who Uses HighliteX</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform serves the entire talent ecosystem with targeted solutions for each user type.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <UserTypeCard key={index} {...userType} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForWhom;
