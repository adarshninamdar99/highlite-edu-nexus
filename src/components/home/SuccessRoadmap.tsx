
import React from 'react';
import { Check, Award, Book, Calendar, GraduationCap, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
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
            <span className="h-1 w-12 rounded-full bg-highlite-accent mr-2"></span>
            <p className="text-highlite-accent font-medium">YOUR PATH TO SUCCESS</p>
            <span className="h-1 w-12 rounded-full bg-highlite-accent ml-2"></span>
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
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2 hidden md:block"></div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {roadmapSteps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div 
                  className="bg-white rounded-lg shadow-lg p-8 relative z-10 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.8 }
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  <motion.div 
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-highlite-accent text-white flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.3 + (index * 0.1) }}
                  >
                    {index + 1}
                  </motion.div>
                  <h3 className="text-xl font-bold text-highlite-primary mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-lg font-medium text-highlite-accent">
            Join thousands of students who have successfully launched their careers with HighliteX
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessRoadmap;
