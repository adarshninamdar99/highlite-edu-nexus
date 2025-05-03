
import React from 'react';
import { 
  Video, 
  FileText, 
  Briefcase, 
  Code, 
  GraduationCap, 
  LayoutDashboard,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="highlite-card p-6 group hover:border-highlite-accent/30 border border-transparent transition-all duration-300">
      <div className="mb-4 rounded-full bg-highlite-extralight/50 p-3 inline-block group-hover:bg-highlite-accent/20 transition-colors duration-300">
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
      icon: <LayoutDashboard className="h-6 w-6 text-highlite-accent" />,
      title: "Analytics Dashboard",
      description: "Track your progress, identify improvement areas, and get personalized recommendations."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="h-1 w-12 rounded-full bg-highlite-accent mr-2"></span>
            <p className="text-highlite-accent font-medium">FEATURES</p>
            <span className="h-1 w-12 rounded-full bg-highlite-accent ml-2"></span>
          </div>
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
        
        <div className="mt-16 bg-highlite-extralight/30 rounded-xl p-8 border border-highlite-extralight">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-full h-full bg-highlite-accent/20 rounded-lg transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Coding Practice" 
                  className="rounded-lg shadow-lg relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg z-20">
                  <Star className="h-8 w-8 text-highlite-accent" />
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-highlite-primary mb-4">Industry-Standard Coding Practice</h3>
              <p className="text-gray-600 mb-6">Our browser-based IDE lets you practice coding problems that mirror real technical interviews. With syntax highlighting, real-time feedback, and built-in test cases, you'll be prepared for any coding challenge.</p>
              <blockquote className="border-l-4 border-highlite-accent pl-4 italic text-gray-700">
                "The coding practice platform helped me ace my technical interviews at Google. The problems were challenging and relevant." - Mike T., Software Developer
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
