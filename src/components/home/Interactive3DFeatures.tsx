
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, FileText, TrendingUp, Code, BarChart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, hoverColor, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-white border border-gray-100 cursor-pointer h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        delay: index * 0.1
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        borderColor: hoverColor
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <motion.div 
        className={`p-4 rounded-full mb-4 transition-colors duration-300`}
        animate={{ 
          backgroundColor: isHovered ? hoverColor : `${color}20`, 
          color: isHovered ? 'white' : color 
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="text-gray-600 text-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.div>
        )}
        {!isHovered && (
          <motion.p 
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isMobile ? "Tap for details" : "Hover/click for details"}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Interactive3DFeatures: React.FC = () => {
  const isMobile = useIsMobile();
  
  const features = [
    { 
      title: "AI Interviews", 
      description: "Practice with our AI interviewer that provides real-time feedback on your responses.",
      icon: <Layers size={24} />,
      color: "#0076ff", 
      hoverColor: "#3a95ff" 
    },
    { 
      title: "Resume Builder", 
      description: "Build ATS-friendly resumes with smart suggestions and formatting.",
      icon: <FileText size={24} />,
      color: "#2C74B3", 
      hoverColor: "#5398dc" 
    },
    { 
      title: "Job Matching", 
      description: "Get matched with jobs that fit your skills, experience, and preferences.",
      icon: <TrendingUp size={24} />,
      color: "#205295", 
      hoverColor: "#3a7ac0" 
    },
    { 
      title: "Coding Labs", 
      description: "Practice coding challenges in our interactive browser-based environment.",
      icon: <Code size={24} />,
      color: "#144272", 
      hoverColor: "#205a9e" 
    },
    { 
      title: "Analytics", 
      description: "Track your progress with detailed analytics and performance metrics.",
      icon: <BarChart size={24} />,
      color: "#0A2647", 
      hoverColor: "#1a487a" 
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <span className="h-1 w-12 rounded-full bg-highlite-accent mr-2"></span>
            <p className="text-highlite-accent font-medium">INTERACTIVE TOOLS</p>
            <span className="h-1 w-12 rounded-full bg-highlite-accent ml-2"></span>
          </motion.div>
          <motion.h2 
            className="text-4xl font-bold text-highlite-primary mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Explore Our Features
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {isMobile ? "Tap on each feature to see details." : "Hover or click on each feature to see it in action."}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              hoverColor={feature.hoverColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interactive3DFeatures;
