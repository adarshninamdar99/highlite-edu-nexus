
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Layers, FileText, TrendingUp, Code, BarChart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  hoverColor, 
  index,
  isActive,
  onSelect
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
          delay: index * 0.1
        }
      });
    }
  }, [isInView, controls, index]);

  useEffect(() => {
    if (isActive || isHovered) {
      controls.start({
        backgroundColor: `${hoverColor}10`,
        borderColor: hoverColor,
        scale: 1.02,
        y: -5,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.3 }
      });
    } else {
      controls.start({
        backgroundColor: 'white',
        borderColor: 'rgba(243, 244, 246, 1)',
        scale: 1,
        y: 0,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        transition: { duration: 0.3 }
      });
    }
  }, [isHovered, isActive, hoverColor, controls]);

  const handleClick = () => {
    onSelect();
    
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  // Particle animation positions
  const particlePositions = [
    { x: -30, y: -20 },
    { x: 30, y: -15 },
    { x: -25, y: 25 },
    { x: 20, y: 20 },
    { x: 0, y: -30 }
  ];
  
  return (
    <motion.div 
      ref={cardRef}
      className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl border border-gray-100 cursor-pointer h-full relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive || isHovered ? 0.05 : 0 }}
        style={{ 
          background: `radial-gradient(circle at center, ${hoverColor} 0%, transparent 70%)`
        }}
      />
      
      {/* Particles - only show when active/hovered */}
      {(isActive || isHovered) && particlePositions.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full bg-${color.replace('#', '')}`}
          style={{ 
            backgroundColor: hoverColor,
            left: '50%',
            top: '50%',
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ 
            x: pos.x, 
            y: pos.y, 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.5 + Math.random(), 
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
      
      {/* Icon with animated background */}
      <motion.div 
        className={`p-4 rounded-full mb-5 relative z-10`}
        style={{
          backgroundColor: isActive || isHovered ? `${hoverColor}20` : `${color}10`,
        }}
        animate={{ 
          scale: isActive || isHovered ? [1, 1.1, 1] : 1,
          backgroundColor: isActive || isHovered ? `${hoverColor}30` : `${color}10`,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: isActive || isHovered ? Infinity : 0,
            repeatType: "reverse"
          },
          backgroundColor: {
            duration: 0.3
          }
        }}
      >
        <motion.div 
          className="relative z-10"
          style={{
            color: isActive || isHovered ? hoverColor : color
          }}
        >
          {icon}
        </motion.div>

        {/* Circular animation around icon */}
        {(isActive || isHovered) && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed"
            style={{ borderColor: hoverColor }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.7,
              rotate: 360
            }}
            transition={{
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: 0.5
              }
            }}
          />
        )}
      </motion.div>
      
      {/* Title with underline animation */}
      <div className="text-center mb-3 relative">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <motion.div 
          className="h-0.5 mx-auto bg-gradient-to-r from-transparent via-highlite-accent to-transparent"
          initial={{ width: 0 }}
          animate={{ width: isActive || isHovered ? '80%' : '0%' }}
          transition={{ duration: 0.3 }}
          style={{ 
            opacity: isActive || isHovered ? 1 : 0,
            left: '10%'
          }}
        />
      </div>
      
      {/* Description with animated height */}
      <AnimatePresence>
        {(isActive || isHovered) ? (
          <motion.div 
            className="text-gray-600 text-center mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm">{description}</p>
            
            <motion.button
              className="mt-3 text-sm font-medium text-highlite-accent flex items-center justify-center gap-1 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              Learn more
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.p 
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {index % 2 === 0 ? "Click to explore" : "Tap for details"}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Interactive3DFeatures: React.FC = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
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
    if (isInView && activeIndex === null) {
      // Activate the middle card when scrolled into view
      setActiveIndex(Math.floor(features.length / 2));
    }
  }, [isInView, activeIndex, features.length]);

  const titleControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      titleControls.start("visible");
    }
  }, [isInView, titleControls]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-highlite-accent/5"
        />
        <motion.div 
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-highlite-light/5"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={titleControls}
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-6"
            variants={itemVariants}
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
            className="text-3xl md:text-4xl font-bold text-highlite-primary mb-4"
            variants={itemVariants}
          >
            Explore Our Features
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="h-1 bg-highlite-accent/50 mx-auto mb-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isInView ? "100px" : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {isMobile ? "Tap on each feature to see details." : "Hover or click on each feature to explore our tools."}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              hoverColor={feature.hoverColor}
              isActive={activeIndex === index}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>
        
        {/* Feature Details Section */}
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div 
              className="mt-16 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              key={activeIndex}
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="p-8 md:p-10">
                      <motion.div 
                        className="flex items-center gap-3 mb-4"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div 
                          className="p-3 rounded-full" 
                          style={{ backgroundColor: `${features[activeIndex].hoverColor}20` }}
                        >
                          <div style={{ color: features[activeIndex].hoverColor }}>
                            {features[activeIndex].icon}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-highlite-primary">{features[activeIndex].title}</h3>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                      >
                        <p className="text-gray-600">{features[activeIndex].description}</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <motion.li 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            Personalized feedback and insights
                          </motion.li>
                          <motion.li 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            Track your progress and improvements
                          </motion.li>
                          <motion.li 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            Industry-specific training modules
                          </motion.li>
                        </ul>
                        <motion.button 
                          className="mt-4 px-6 py-2.5 bg-gradient-to-r from-highlite-accent to-highlite-light text-white rounded-full flex items-center gap-2 hover:shadow-lg transition-all"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          {activeIndex === 0 ? "Try Demo Interview" : `Explore ${features[activeIndex].title}`}
                          <motion.span 
                            animate={{ x: [0, 3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >→</motion.span>
                        </motion.button>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="h-full bg-gradient-to-br from-gray-900 to-highlite-primary"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="aspect-video md:h-full min-h-[300px] relative overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br opacity-80"
                          style={{ 
                            backgroundImage: `linear-gradient(to bottom right, ${features[activeIndex].color}, ${features[activeIndex].hoverColor})` 
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8 }}
                        />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            className="text-center text-white px-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="mb-4">
                              <motion.div 
                                className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                                whileHover={{ scale: 1.05 }}
                                animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,0.7)', '0 0 0 10px rgba(255,255,255,0)'] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                <div className="text-white w-8 h-8">
                                  {features[activeIndex].icon}
                                </div>
                              </motion.div>
                            </div>
                            <h4 className="text-xl font-bold mb-2">Ready to get started?</h4>
                            <p className="text-white/80">Join thousands of professionals who use our platform daily</p>
                          </motion.div>
                        </div>
                        
                        {/* Decorative Elements */}
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/30"
                            style={{
                              width: Math.floor(Math.random() * 6) + 4 + 'px',
                              height: Math.floor(Math.random() * 6) + 4 + 'px',
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -(Math.random() * 50) - 20, 0],
                              opacity: [0.3, 0.8, 0.3],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{ 
                              duration: Math.floor(Math.random() * 5) + 3, 
                              repeat: Infinity, 
                              repeatType: "reverse",
                              delay: Math.random() * 2
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Interactive3DFeatures;
