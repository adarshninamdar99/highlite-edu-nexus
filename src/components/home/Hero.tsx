
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  
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

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 py-28 md:py-40">
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            className="inline-block px-3 py-1 text-sm font-medium text-highlite-accent bg-highlite-extralight/30 rounded-full"
            variants={itemVariants}
          >
            Introducing HighliteX
          </motion.span>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-highlite-primary"
            variants={itemVariants}
          >
            Prepare for your <span className="text-highlite-accent relative">
              future
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-1 bg-highlite-accent/50"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span> career today
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            AI-powered interview preparation, resume building, and job matching for the next generation of professionals.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 pt-4"
            variants={itemVariants}
          >
            <Link to="/register">
              <Button className="apple-button bg-highlite-accent hover:bg-highlite-light text-white flex items-center gap-2 h-12 px-8 group">
                <Rocket className="h-4 w-4 group-hover:rotate-12 transition-transform" /> 
                <span>Get Started</span>
              </Button>
            </Link>
            <Link to="/mock-interviews">
              <Button variant="outline" className="apple-button text-highlite-primary border-gray-300 flex items-center gap-2 h-12 px-8 group">
                <Lightbulb className="h-4 w-4 group-hover:text-highlite-accent transition-colors" /> 
                <span>Try Demo Interview</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none"></div>
          <motion.img
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
            alt="HighliteX Platform - Students preparing for interviews"
            className="w-full h-auto object-cover rounded-2xl shadow-xl mx-auto"
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.9, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-4 rounded-full text-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
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
              className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-lg hover:border-highlite-accent/30 transition-all duration-300"
              custom={item.i}
              variants={statsVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="bg-highlite-extralight/30 p-4 rounded-full mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {item.icon}
              </motion.div>
              <motion.p 
                className="font-bold text-highlite-primary text-2xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                {item.stat}
              </motion.p>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
