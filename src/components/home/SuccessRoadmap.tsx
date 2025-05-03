
import React from 'react';
import { Check, Award, Book, Calendar, GraduationCap, Briefcase } from 'lucide-react';

const SuccessRoadmap: React.FC = () => {
  const roadmapSteps = [
    {
      icon: <Book className="h-10 w-10 text-white" />,
      title: "Skill Assessment",
      description: "Take our comprehensive skill assessment to identify your strengths and areas for improvement.",
      color: "bg-highlite-primary"
    },
    {
      icon: <Calendar className="h-10 w-10 text-white" />,
      title: "Personalized Learning Path",
      description: "Get a customized learning path based on your goals and current skill level.",
      color: "bg-highlite-secondary"
    },
    {
      icon: <Check className="h-10 w-10 text-white" />,
      title: "Practice & Feedback",
      description: "Practice with AI mock interviews and receive instant feedback to improve your performance.",
      color: "bg-highlite-accent"
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-white" />,
      title: "Career Readiness",
      description: "Build a professional resume and portfolio that showcases your skills to potential employers.",
      color: "bg-highlite-light"
    },
    {
      icon: <Briefcase className="h-10 w-10 text-white" />,
      title: "Job Matching",
      description: "Get matched with job opportunities that align with your skills, interests, and career goals.",
      color: "bg-highlite-primary"
    },
    {
      icon: <Award className="h-10 w-10 text-white" />,
      title: "Career Success",
      description: "Land your dream job and continue growing your skills with our ongoing support.",
      color: "bg-highlite-secondary"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="h-1 w-12 rounded-full bg-highlite-accent mr-2"></span>
            <p className="text-highlite-accent font-medium">YOUR PATH TO SUCCESS</p>
            <span className="h-1 w-12 rounded-full bg-highlite-accent ml-2"></span>
          </div>
          <h2 className="text-3xl font-bold text-highlite-primary mb-4">Student Success Roadmap</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow our proven roadmap to transform your career journey from preparation to placement
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmapSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg shadow-lg p-8 relative z-10 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-highlite-accent text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-highlite-primary mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg font-medium text-highlite-accent">
            Join thousands of students who have successfully launched their careers with HighliteX
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessRoadmap;
