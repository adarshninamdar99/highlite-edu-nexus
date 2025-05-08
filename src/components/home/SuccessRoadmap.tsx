
import React, { useRef } from 'react';
import { Check, Award, Book, Calendar, GraduationCap, Briefcase } from 'lucide-react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

const SuccessRoadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const roadmapSteps = [
    {
      icon: <Book className="h-10 w-10 text-white" />,
      title: "Skill Assessment",
      description: "Take our comprehensive skill assessment to identify your strengths and areas for improvement.",
      color: "bg-highlite-primary",
      delay: 0
    },
    {
      icon: <Calendar className="h-10 w-10 text-white" />,
      title: "Personalized Learning Path",
      description: "Get a customized learning path based on your goals and current skill level.",
      color: "bg-highlite-secondary",
      delay: 0.1
    },
    {
      icon: <Check className="h-10 w-10 text-white" />,
      title: "Practice & Feedback",
      description: "Practice with AI mock interviews and receive instant feedback to improve your performance.",
      color: "bg-highlite-accent",
      delay: 0.2
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-white" />,
      title: "Career Readiness",
      description: "Build a professional resume and portfolio that showcases your skills to potential employers.",
      color: "bg-highlite-light",
      delay: 0.3
    },
    {
      icon: <Briefcase className="h-10 w-10 text-white" />,
      title: "Job Matching",
      description: "Get matched with job opportunities that align with your skills, interests, and career goals.",
      color: "bg-highlite-primary",
      delay: 0.4
    },
    {
      icon: <Award className="h-10 w-10 text-white" />,
      title: "Career Success",
      description: "Land your dream job and continue growing your skills with our ongoing support.",
      color: "bg-highlite-secondary",
      delay: 0.5
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: (delay) => ({
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: delay
      }
    })
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 1.5,
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="py-24 relative overflow-hidden bg-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      <motion.div
        className="absolute -top-60 -right-60 w-[500px] h-[500px] rounded-full bg-highlite-accent/5"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-highlite-primary/5"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="h-1 w-12 rounded-full bg-highlite-accent mr-2"
              whileHover={{ width: 60 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <p className="text-highlite-accent font-medium">YOUR PATH TO SUCCESS</p>
            <motion.span 
              className="h-1 w-12 rounded-full bg-highlite-accent ml-2"
              whileHover={{ width: 60 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold text-highlite-primary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Student Success Roadmap
          </motion.h2>
          <motion.div 
            className="h-1 w-0 bg-gradient-to-r from-transparent via-highlite-accent to-transparent mx-auto mb-4"
            animate={{ width: isInView ? "120px" : "0px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Follow our proven roadmap to transform your career journey from preparation to placement
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Connecting line with animation */}
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 transform -translate-y-1/2 hidden md:block origin-left"
            variants={lineVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-highlite-primary via-highlite-accent to-highlite-light"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.8, delay: 0.5 }}
            />
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {roadmapSteps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                custom={step.delay}
                variants={cardVariants}
              >
                <motion.div 
                  className="group bg-white rounded-lg shadow-lg p-8 relative z-10 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto relative overflow-hidden`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.8 }
                    }}
                  >
                    {/* Inner animated gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      animate={{ 
                        background: [
                          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                          "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    <div className="relative">
                      {step.icon}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-highlite-accent text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.3 + (index * 0.1) }}
                  >
                    {index + 1}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-highlite-primary mb-4 text-center">{step.title}</h3>
                  
                  <motion.div 
                    className="h-1 w-0 bg-gradient-to-r from-transparent via-highlite-accent/50 to-transparent mx-auto mb-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "80px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  />
                  
                  <p className="text-gray-600 text-center">{step.description}</p>
                  
                  <motion.button
                    className="mt-4 px-4 py-1 rounded-full bg-transparent border border-highlite-accent/0 text-highlite-accent text-sm font-medium w-full opacity-0 group-hover:opacity-100 group-hover:border-highlite-accent/30 transition-all duration-300"
                    whileHover={{ backgroundColor: "rgba(32, 82, 149, 0.05)" }}
                  >
                    Learn more
                  </motion.button>
                </motion.div>
                
                {/* Connecting dots for animation */}
                {index < roadmapSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <motion.div 
                      className="w-8 h-8 rounded-full border-4 border-white bg-highlite-accent flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.8 + (index * 0.2) }}
                    >
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-white"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="inline-block rounded-full px-6 py-3 bg-gradient-to-r from-highlite-primary to-highlite-light shadow-lg"
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <p className="text-lg font-medium text-white">
              Join thousands of students who have successfully launched their careers with HighliteX
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessRoadmap;
