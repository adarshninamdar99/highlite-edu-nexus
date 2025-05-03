
import React from 'react';
import { GraduationCap, School, Building, Star } from 'lucide-react';

interface UserTypeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    image?: string;
  };
}

const UserTypeCard: React.FC<UserTypeProps> = ({ icon, title, description, benefits, testimonial }) => {
  return (
    <div className="highlite-card flex flex-col h-full hover:shadow-xl transition-all duration-300">
      <div className="p-6 border-b">
        <div className="mb-4 rounded-full bg-highlite-extralight/50 p-3 inline-block">
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
      {testimonial && (
        <div className="p-6 bg-gray-50 border-t">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {testimonial.image ? (
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-highlite-accent/20 flex items-center justify-center">
                  <Star className="h-5 w-5 text-highlite-accent" />
                </div>
              )}
            </div>
            <div>
              <p className="text-gray-600 italic text-sm">{testimonial.quote}</p>
              <p className="text-highlite-primary font-medium text-sm mt-2">{testimonial.author}</p>
              <p className="text-gray-500 text-xs">{testimonial.position}</p>
            </div>
          </div>
        </div>
      )}
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
      ],
      testimonial: {
        quote: "Thanks to HighliteX, I was able to land my dream job at Microsoft. The mock interviews were incredibly accurate!",
        author: "Priya S.",
        position: "Software Engineer, Class of 2023",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      }
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
      ],
      testimonial: {
        quote: "Our placement rates increased by 38% after implementing HighliteX across our engineering departments.",
        author: "Dr. Rajiv M.",
        position: "Placement Director, Heritage Institute"
      }
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
      ],
      testimonial: {
        quote: "HighliteX has revolutionized our campus recruitment strategy. The quality of candidates has been exceptional.",
        author: "Anita K.",
        position: "Head of Talent Acquisition, TechCorp"
      }
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="h-1 w-12 rounded-full bg-highlite-accent mr-2"></span>
            <p className="text-highlite-accent font-medium">FOR EVERYONE</p>
            <span className="h-1 w-12 rounded-full bg-highlite-accent ml-2"></span>
          </div>
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

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-highlite-primary mb-6">Trusted By Leading Institutions</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="w-24 h-12 bg-gray-400/30 rounded flex items-center justify-center">MIT</div>
            <div className="w-24 h-12 bg-gray-400/30 rounded flex items-center justify-center">Stanford</div>
            <div className="w-24 h-12 bg-gray-400/30 rounded flex items-center justify-center">Google</div>
            <div className="w-24 h-12 bg-gray-400/30 rounded flex items-center justify-center">Amazon</div>
            <div className="w-24 h-12 bg-gray-400/30 rounded flex items-center justify-center">IIT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForWhom;
