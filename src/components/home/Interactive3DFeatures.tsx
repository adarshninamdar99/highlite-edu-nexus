
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, FileText, Briefcase, Shield, Star, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  color,
  hoverColor,
  delay
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className={`w-full h-full rounded-2xl p-6 sm:p-8 ${color} border border-transparent shadow-lg relative overflow-hidden group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          y: -10,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut" 
        }}
      >
        {/* Background animation */}
        <motion.div 
          className={`absolute inset-0 ${hoverColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.9 : 0 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
        
        {/* Background decoration */}
        <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
          <motion.div 
            className="w-full h-full rounded-full bg-white"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
        </div>
        
        <motion.div 
          className="relative z-10 h-full flex flex-col"
          animate={{ color: isHovered ? "#fff" : "#333" }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/20 rounded-xl p-3 w-fit mb-6">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          
          <p className={`text-sm md:text-base mb-6 ${isHovered ? 'text-white/90' : 'text-gray-600'}`}>
            {description}
          </p>
          
          <motion.div 
            className="mt-auto flex items-center gap-2 font-medium text-sm cursor-pointer"
            animate={{ 
              x: isHovered ? 5 : 0,
            }}
          >
            <span>Learn more</span>
            <ArrowRight size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Interactive3DFeatures: React.FC = () => {
  const features = [
    {
      title: "AI Interview Simulator",
      description: "Practice with industry-specific mock interviews powered by our advanced AI. Get real-time feedback and personalized improvement suggestions.",
      icon: <Video className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
      hoverColor: "bg-blue-600",
      delay: 0.1
    },
    {
      title: "Smart Resume Builder",
      description: "Create ATS-friendly resumes with our AI assistant that highlights your strengths and matches job requirements with your skills.",
      icon: <FileText className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-highlite-accent to-highlite-light",
      hoverColor: "bg-highlite-accent",
      delay: 0.2
    },
    {
      title: "Career Matchmaking",
      description: "Our AI analyzes your skills, experience, and preferences to match you with the perfect job opportunities from our partner companies.",
      icon: <Briefcase className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      hoverColor: "bg-purple-600",
      delay: 0.3
    },
    {
      title: "Placement Analytics",
      description: "Comprehensive analytics for colleges and employers to track placement progress, identify trends, and optimize recruitment strategies.",
      icon: <Shield className="h-6 w-6 text-white" />,
      color: "bg-gradient-to-br from-green-500 to-teal-500",
      hoverColor: "bg-green-600",
      delay: 0.4
    }
  ];

  return (
    <div className="py-24 relative overflow-hidden bg-white">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-highlite-extralight to-blue-100 opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-6">
            <motion.span 
              className="h-1 w-0 rounded-full bg-highlite-accent mr-2"
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.span>
            <p className="text-highlite-accent font-medium">KEY FEATURES</p>
            <motion.span 
              className="h-1 w-0 rounded-full bg-highlite-accent ml-2"
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.span>
          </div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-highlite-primary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Interactive Career Tools
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Powerful AI-driven tools designed to elevate your career preparation experience
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              hoverColor={feature.hoverColor}
              delay={feature.delay}
            />
          ))}
        </div>
        
        {/* Featured highlight box */}
        <motion.div 
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-highlite-extralight/10 to-highlite-accent/5 border border-highlite-extralight/20 max-w-4xl mx-auto relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ 
            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
            y: -5
          }}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-highlite-accent/5 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 lg:w-1/4 flex justify-center">
              <motion.div 
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-highlite-accent flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Star className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
              </motion.div>
            </div>
            
            <div className="md:w-2/3 lg:w-3/4">
              <h3 className="text-xl lg:text-2xl font-bold text-highlite-primary mb-3">Industry-Leading Success Rate</h3>
              <p className="text-gray-600 mb-4">
                Our users report a 78% higher success rate in job interviews after using HighliteX for just two weeks. Our AI-powered platform continuously learns and adapts to provide you with the most relevant guidance.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <motion.div
                  className="bg-white py-1 px-3 rounded-full text-sm font-medium shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  78% Success Rate
                </motion.div>
                <motion.div
                  className="bg-white py-1 px-3 rounded-full text-sm font-medium shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  500+ Company Partners
                </motion.div>
                <motion.div
                  className="bg-white py-1 px-3 rounded-full text-sm font-medium shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  10,000+ Success Stories
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Interactive3DFeatures;
