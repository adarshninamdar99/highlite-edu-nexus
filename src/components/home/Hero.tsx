
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star, Lightbulb, ArrowRight, Circle, MoveUp } from 'lucide-react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLottie } from 'lottie-react';
import animationData from '@/assets/lottie/hero-animation.json';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const heroTexts = ["future", "dream", "success"];
  const heroColors = ["text-highlite-accent", "text-purple-500", "text-blue-500"];
  
  // Lottie animation setup
  const lottieOptions = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };
  
  const { View: LottieView } = useLottie(lottieOptions);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
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
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const imageRevealVariant = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { 
      clipPath: 'inset(0 0% 0 0)',
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 md:py-24 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-highlite-extralight/30 to-transparent blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute top-[60%] -left-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-highlite-extralight/40 to-transparent blur-3xl"
        ></motion.div>
        
        {/* Dynamic particles */}
        {[...Array(12)].map((_, index) => (
          <motion.div 
            key={index}
            className={`absolute w-${Math.floor(Math.random() * 3) + 1} h-${Math.floor(Math.random() * 3) + 1} rounded-full ${
              index % 3 === 0 ? 'bg-highlite-accent/20' : index % 3 === 1 ? 'bg-purple-500/20' : 'bg-blue-500/20'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.floor(Math.random() * 8) + 4}px`,
              height: `${Math.floor(Math.random() * 8) + 4}px`,
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
          ></motion.div>
        ))}
      </div>
      
      <div ref={containerRef} className="container mx-auto px-4 pt-10 pb-20 md:pt-16 md:pb-28">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 lg:gap-16 max-w-7xl mx-auto items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left content - Text */}
          <motion.div className="flex flex-col justify-center space-y-6 order-2 lg:order-1 text-center lg:text-left">
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start">
              <motion.span 
                className="inline-block px-5 py-2 text-sm font-medium bg-gradient-to-r from-highlite-accent to-highlite-light text-white rounded-full shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(32, 82, 149, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <motion.span 
                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                      initial={{ opacity: 0.75, scale: 1 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Introducing HighliteX
                </span>
              </motion.span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-highlite-primary leading-tight"
            >
              <span className="inline-block">Prepare for your</span>{' '}
              <div className="h-14 sm:h-16 md:h-20 lg:h-24 relative inline-flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentIndex} 
                    className={`${heroColors[currentIndex]} absolute`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={controls}
                    exit={{ y: -20, opacity: 0, transition: { duration: 0.3 } }}
                  >
                    {heroTexts[currentIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-highlite-accent via-highlite-light to-highlite-accent/50 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
                />
              </div>{' '}
              <span className="inline-block">career today</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0"
            >
              AI-powered interview preparation, resume building, and job matching for the next generation of professionals.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start"
            >
              <Link to="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="apple-button bg-gradient-to-r from-highlite-accent to-highlite-light text-white flex items-center gap-2 h-14 px-8 text-lg group relative overflow-hidden">
                    <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    <Rocket className="h-5 w-5 group-hover:rotate-12 transition-transform" /> 
                    <span>Get Started</span>
                    <motion.div
                      className="absolute right-6 opacity-0 group-hover:opacity-100"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <Link to="/mock-interviews">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="apple-button text-highlite-primary border-2 border-gray-300 hover:border-highlite-accent flex items-center gap-2 h-14 px-8 text-lg group">
                    <Lightbulb className="h-5 w-5 group-hover:text-highlite-accent transition-colors" /> 
                    <span>Try Demo Interview</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 pt-8 text-gray-500 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.img
                    key={i}
                    src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                    alt={`User ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                <motion.span 
                  className="text-highlite-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  +2,500
                </motion.span> professionals joined this week
              </span>
            </motion.div>
          </motion.div>
          
          {/* Right content - Image or animation */}
          <motion.div 
            className="relative flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              initial="hidden"
              animate="visible"
              variants={imageRevealVariant}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-highlite-accent/20 to-transparent mix-blend-overlay rounded-2xl"></div>
              
              <motion.img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80"
                alt="HighliteX Platform"
                className="w-full h-full object-cover object-center rounded-2xl"
                animate={{ 
                  scale: isHovered ? 1.05 : 1,
                  filter: isHovered ? "brightness(1.1)" : "brightness(1)"
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              
              {/* Interactive elements */}
              <motion.div 
                className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl flex items-center gap-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="bg-green-100 p-2 rounded-lg">
                  <Rocket className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Interview Score</p>
                  <p className="text-sm font-semibold text-gray-800">95% Success Rate</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-xs text-gray-600 mt-1">Based on 10,000+ reviews</p>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 transform -translate-y-1/2 left-0 ml-5 bg-black/70 backdrop-blur-md text-white py-3 px-4 rounded-r-xl"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <p className="text-xs uppercase tracking-wider mb-1">Real-time Feedback</p>
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <p className="text-sm font-medium">AI Interview in Progress</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl backdrop-blur-lg text-highlite-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-medium border border-highlite-extralight/30 flex items-center gap-3 z-10 max-w-[90%] sm:max-w-[80%]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.div 
                className="w-3 h-3 bg-green-500 rounded-full shrink-0"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <span className="truncate">Real-time feedback from AI-powered mock interviews</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.p 
            className="text-sm text-gray-500 font-medium"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
          >
            Scroll to explore
          </motion.p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <MoveUp className="text-highlite-accent h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Stats section with enhanced animation */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: <Star className="h-6 w-6 text-white" />, stat: "10,000+", text: "Successful Placements", i: 0, color: "from-highlite-accent to-highlite-light" },
            { icon: <Lightbulb className="h-6 w-6 text-white" />, stat: "500+", text: "Partner Companies", i: 1, color: "from-purple-500 to-indigo-600" },
            { icon: <Rocket className="h-6 w-6 text-white" />, stat: "98%", text: "Student Satisfaction", i: 2, color: "from-blue-500 to-highlite-accent" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
              custom={item.i}
              variants={statsVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(32, 82, 149, 0.15)" }}
            >
              <motion.div 
                className={`absolute inset-x-0 -top-1 h-1 bg-gradient-to-r ${item.color}`} 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              />
              
              <motion.div 
                className={`bg-gradient-to-br ${item.color} p-4 rounded-full mb-6 relative z-10`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={floatAnimation}
              >
                {item.icon}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <motion.p 
                className="font-bold text-highlite-primary text-4xl relative z-10 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <motion.span
                  animate={isInView ? { 
                    opacity: [0, 1],
                    y: [20, 0]
                  } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                >
                  {item.stat}
                </motion.span>
              </motion.p>
              
              <p className="text-gray-600 relative z-10 font-medium">{item.text}</p>
              
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-highlite-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
              ></motion.div>
              
              {/* Background decoration */}
              <motion.div
                className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
