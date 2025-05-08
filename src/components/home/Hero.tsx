
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star, Lightbulb, ArrowRight, Circle } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroTexts = ["future", "dream", "success"];
  const heroColors = ["text-highlite-accent", "text-purple-500", "text-blue-500"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    controls.start({
      y: [10, 0],
      opacity: [0, 1],
      transition: { duration: 0.5 }
    });
  }, [currentIndex, controls]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3 + (i * 0.2),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const floatAnimation = {
    y: [0, -15, 0],
    transition: { 
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-highlite-extralight/20 to-transparent"></div>
        <div className="absolute top-[60%] -left-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-highlite-extralight/30 to-transparent"></div>
        <motion.div 
          className="absolute top-[20%] right-[20%] w-8 h-8 rounded-full bg-highlite-accent/20"
          animate={{ 
            y: [0, -40, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-[70%] left-[30%] w-6 h-6 rounded-full bg-purple-500/20"
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 py-28 md:py-40">
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            className="inline-block px-4 py-2 text-sm font-medium text-highlite-accent bg-highlite-extralight/30 rounded-full shadow-lg shadow-highlite-extralight/20"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            Introducing HighliteX
          </motion.span>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-highlite-primary"
            variants={itemVariants}
          >
            Prepare for your{' '}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={currentIndex} 
                  className={`${heroColors[currentIndex]}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={controls}
                  exit={{ y: -20, opacity: 0, transition: { duration: 0.3 } }}
                >
                  {heroTexts[currentIndex]}
                </motion.span>
              </AnimatePresence>
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1.5 bg-highlite-accent/50 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>{' '}
            career today
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            AI-powered interview preparation, resume building, and job matching for the next generation of professionals.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 pt-6"
            variants={itemVariants}
          >
            <Link to="/register">
              <Button className="apple-button bg-highlite-accent hover:bg-highlite-light text-white flex items-center gap-2 h-12 px-8 group relative overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <Rocket className="h-4 w-4 group-hover:rotate-12 transition-transform" /> 
                <span>Get Started</span>
                <motion.div
                  className="absolute right-4 opacity-0 group-hover:opacity-100"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </Button>
            </Link>
            <Link to="/mock-interviews">
              <Button variant="outline" className="apple-button text-highlite-primary border-gray-300 flex items-center gap-2 h-12 px-8 group">
                <Lightbulb className="h-4 w-4 group-hover:text-highlite-accent transition-colors" /> 
                <span>Try Demo Interview</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0 }}
              className="w-2 h-2 rounded-full bg-highlite-accent"
            ></motion.div>
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-highlite-accent/80"
            ></motion.div>
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-highlite-accent/60"
            ></motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-28 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none z-10"></div>
          
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
              alt="HighliteX Platform - Students preparing for interviews"
              className="w-full h-auto object-cover rounded-2xl shadow-xl mx-auto"
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.9, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-highlite-primary/40 to-transparent rounded-2xl mix-blend-overlay"></div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl backdrop-blur-lg text-highlite-primary px-8 py-4 rounded-full text-sm md:text-base font-medium border border-highlite-extralight/30 flex items-center gap-3"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div 
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            Real-time feedback from AI-powered mock interviews
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Star className="h-6 w-6 text-highlite-accent" />, stat: "10,000+", text: "Successful Placements", i: 0 },
            { icon: <Lightbulb className="h-6 w-6 text-highlite-accent" />, stat: "500+", text: "Partner Companies", i: 1 },
            { icon: <Rocket className="h-6 w-6 text-highlite-accent" />, stat: "98%", text: "Student Satisfaction", i: 2 }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-lg hover:border-highlite-accent/30 transition-all duration-300 relative overflow-hidden group"
              custom={item.i}
              variants={statsVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-highlite-extralight/0 to-highlite-extralight/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div 
                className="bg-highlite-extralight/30 p-4 rounded-full mb-4 relative z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={floatAnimation}
              >
                {item.icon}
              </motion.div>
              <motion.p 
                className="font-bold text-highlite-primary text-3xl relative z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                {item.stat}
              </motion.p>
              <p className="text-gray-600 relative z-10">{item.text}</p>
              
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-highlite-accent/0 via-highlite-accent to-highlite-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
