
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
  const [isSelected, setIsSelected] = useState(false);
  const isMobile = useIsMobile();
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected || isHovered) {
      controls.start({
        backgroundColor: `${hoverColor}22`,
        borderColor: hoverColor,
        scale: 1.05,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 }
      });
    } else {
      controls.start({
        backgroundColor: 'white',
        borderColor: 'rgba(243, 244, 246, 1)',
        scale: 1,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        transition: { duration: 0.3 }
      });
    }
  }, [isHovered, isSelected, hoverColor, controls]);

  const handleClick = () => {
    setIsSelected(!isSelected);
    
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="flex flex-col items-center justify-center p-8 rounded-xl border border-gray-100 cursor-pointer h-full relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        delay: index * 0.1
      }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      layout
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSelected || isHovered ? 0.05 : 0 }}
        style={{ 
          background: `radial-gradient(circle at center, ${hoverColor} 0%, transparent 70%)`
        }}
      />
      
      {/* Icon with animated background */}
      <motion.div 
        className={`p-5 rounded-full mb-6 relative`}
        animate={{ 
          backgroundColor: isSelected || isHovered ? `${hoverColor}30` : `${color}20`, 
          color: isSelected || isHovered ? 'white' : color,
          scale: isSelected || isHovered ? 1.1 : 1
        }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{ 
            backgroundColor: isSelected || isHovered ? hoverColor : 'transparent'
          }}
        />
        <motion.div className="relative z-10">
          {icon}
        </motion.div>
      </motion.div>
      
      {/* Title with underline animation */}
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <motion.div 
          className="h-0.5 w-0 mx-auto bg-gradient-to-r from-transparent via-highlite-accent to-transparent"
          animate={{ width: isSelected || isHovered ? '80%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Description with animated height */}
      <AnimatePresence>
        {(isSelected || isHovered) && (
          <motion.div 
            className="text-gray-600 text-center mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{description}</p>
            
            {isSelected && (
              <motion.button
                className="mt-4 text-sm font-medium text-highlite-accent underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Learn more
              </motion.button>
            )}
          </motion.div>
        )}
        
        {!isSelected && !isHovered && (
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
      
      {/* Decorative floating orbs */}
      {(isSelected || isHovered) && (
        <>
          <motion.div 
            className="absolute w-3 h-3 rounded-full"
            initial={{ 
              top: '50%', 
              left: '10%',
              backgroundColor: `${hoverColor}50` 
            }}
            animate={{ 
              top: ['50%', '30%', '40%'],
              left: ['10%', '15%', '5%'],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          <motion.div 
            className="absolute w-2 h-2 rounded-full"
            initial={{ 
              top: '20%', 
              right: '10%',
              backgroundColor: `${hoverColor}70` 
            }}
            animate={{ 
              top: ['20%', '40%', '30%'],
              right: ['10%', '20%', '15%'],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 0.5
            }}
          />
        </>
      )}
    </motion.div>
  );
};

const Interactive3DFeatures: React.FC = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const features = [
    { 
      title: "AI Interviews", 
      description: "Practice with our AI interviewer that provides real-time feedback on your responses and communication style.",
      icon: <Layers size={24} />,
      color: "#0076ff", 
      hoverColor: "#3a95ff" 
    },
    { 
      title: "Resume Builder", 
      description: "Build ATS-friendly resumes with smart suggestions and formatting that will help you stand out to recruiters.",
      icon: <FileText size={24} />,
      color: "#2C74B3", 
      hoverColor: "#5398dc" 
    },
    { 
      title: "Job Matching", 
      description: "Get matched with jobs that fit your skills, experience, and preferences using our advanced AI algorithms.",
      icon: <TrendingUp size={24} />,
      color: "#205295", 
      hoverColor: "#3a7ac0" 
    },
    { 
      title: "Coding Labs", 
      description: "Practice coding challenges in our interactive browser-based environment with real-time feedback and hints.",
      icon: <Code size={24} />,
      color: "#144272", 
      hoverColor: "#205a9e" 
    },
    { 
      title: "Analytics", 
      description: "Track your progress with detailed analytics and performance metrics to improve your interview success rate.",
      icon: <BarChart size={24} />,
      color: "#0A2647", 
      hoverColor: "#1a487a" 
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && activeIndex === null) {
          // Activate the middle card when scrolled into view
          setActiveIndex(Math.floor(features.length / 2));
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, features.length]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
      <motion.div 
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-highlite-accent/5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-highlite-light/5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div 
          className="text-center mb-16"
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
            <motion.span 
              className="h-1 w-12 rounded-full bg-highlite-accent mr-2"
              whileHover={{ width: 60, transition: { duration: 0.3 } }}
            ></motion.span>
            <p className="text-highlite-accent font-medium">INTERACTIVE TOOLS</p>
            <motion.span 
              className="h-1 w-12 rounded-full bg-highlite-accent ml-2"
              whileHover={{ width: 60, transition: { duration: 0.3 } }}
            ></motion.span>
          </motion.div>
          <motion.h2 
            className="text-4xl font-bold text-highlite-primary mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Explore Our Features
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-highlite-accent/50 mx-auto mb-4 rounded-full"
          ></motion.div>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {isMobile ? "Tap on each feature to see details." : "Hover or click on each feature to see it in action."}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
