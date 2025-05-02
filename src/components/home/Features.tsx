
import React from 'react';
import { 
  Video, 
  FileText, 
  Briefcase, 
  Code, 
  GraduationCap, 
  BarChart
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="highlite-card p-6">
      <div className="mb-4 rounded-full bg-highlite-extralight p-3 inline-block">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-highlite-primary mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features: FeatureProps[] = [
    {
      icon: <Video className="h-6 w-6 text-highlite-accent" />,
      title: "AI Mock Interviews",
      description: "Practice with our AI interviewer for technical, HR and managerial rounds with real-time feedback."
    },
    {
      icon: <FileText className="h-6 w-6 text-highlite-accent" />,
      title: "Resume Builder",
      description: "Create ATS-friendly resumes with AI assistance and get feedback to improve your chances."
    },
    {
      icon: <Briefcase className="h-6 w-6 text-highlite-accent" />,
      title: "Job Matching",
      description: "Our AI matches your skills and experience with the best job opportunities in your field."
    },
    {
      icon: <Code className="h-6 w-6 text-highlite-accent" />,
      title: "Coding Labs",
      description: "Practice coding problems, complete assignments and get instant feedback in our browser-based IDE."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-highlite-accent" />,
      title: "Live Classes",
      description: "Attend DRM-protected live classes from industry experts for both technical and soft skills."
    },
    {
      icon: <BarChart className="h-6 w-6 text-highlite-accent" />,
      title: "Analytics Dashboard",
      description: "Track your progress, identify improvement areas, and get personalized recommendations."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-highlite-primary mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            HighliteX combines advanced AI technology with expert-designed learning resources to help you succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
