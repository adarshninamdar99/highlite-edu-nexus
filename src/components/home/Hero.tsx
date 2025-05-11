
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star, Lightbulb, ArrowRight, MoveUp } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLottie } from 'lottie-react';
import animationData from '@/assets/lottie/hero-animation.json';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const heroTexts = ["future", "dream", "success"];
  const heroColors = ["text-highlite-accent", "text-purple-500", "text-blue-500"];
  
  // Lottie animation setup
  const lottieOptions = {
    animationData: animationData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  const { View: LottieView } = useLottie(lottieOptions);
  
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

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 lg:py-28">
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
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.floor(Math.random() * 8) + 4}px`,
              height: `${Math.floor(Math.random() * 8) + 4}px`,
              background: index % 3 === 0 ? 'rgba(32, 82, 149, 0.2)' : 
                         index % 3 === 1 ? 'rgba(147, 51, 234, 0.2)' : 
                         'rgba(59, 130, 246, 0.2)',
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
      
      <div ref={containerRef} className="container mx-auto px-4 pt-10 pb-20 md:pt-16 md:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left content - Text */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left order-2 lg:order-1">
            <motion.div 
              className="flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-highlite-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block">Prepare for your</span>{' '}
              <div className="h-14 sm:h-16 md:h-20 lg:h-24 relative inline-flex items-center justify-center lg:justify-start overflow-hidden">
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
              className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered interview preparation, resume building, and job matching for the next generation of professionals.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="bg-gradient-to-r from-highlite-accent to-highlite-light text-white flex items-center gap-2 h-14 px-8 text-lg group relative overflow-hidden">
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
                  <Button variant="outline" className="text-highlite-primary border-2 border-gray-300 hover:border-highlite-accent flex items-center gap-2 h-14 px-8 text-lg group">
                    <Lightbulb className="h-5 w-5 group-hover:text-highlite-accent transition-colors" /> 
                    <span>Try Demo Interview</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 pt-8 text-gray-500 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <motion.img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 20}.jpg`}
                    alt={`User ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                <motion.span 
                  className="text-highlite-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  +2,500
                </motion.span> professionals joined this week
              </span>
            </motion.div>
          </div>
          
          {/* Right content - Animation or Image */}
          <motion.div 
            className="relative order-1 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Background decorations */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-highlite-extralight/30 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              />
              
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-blue-100/50 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
              />

              {/* Main image container */}
              <motion.div 
                className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 relative z-10 overflow-hidden"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Main image with hover effect */}
                <div 
                  className="overflow-hidden rounded-xl"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.div
                    className="relative aspect-[4/3] w-full"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80"
                      alt="HighliteX Platform"
                      className="w-full h-full object-cover object-center rounded-xl"
                    />
                    
                    {/* Overlay with gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-highlite-accent/30 to-transparent opacity-70"
                      animate={{ opacity: isHovered ? 0.4 : 0.7 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg flex items-center gap-3 z-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
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
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ y: 3, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Based on 10,000+ reviews</p>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 transform -translate-y-1/2 -left-2 bg-black/70 backdrop-blur-md text-white py-3 px-4 rounded-r-xl z-20"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ x: 5 }}
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
              
              {/* Floating message bubble */}
              <motion.div 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl backdrop-blur-lg text-highlite-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-medium border border-highlite-extralight/30 flex items-center gap-3 z-30 max-w-[90%] sm:max-w-[80%]"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full shrink-0"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <span className="truncate">Real-time feedback from AI-powered mock interviews</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
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
            { number: "10,000+", text: "Successful Placements", color: "from-highlite-accent to-highlite-light" },
            { number: "500+", text: "Partner Companies", color: "from-purple-500 to-indigo-600" },
            { number: "98%", text: "Student Satisfaction", color: "from-blue-500 to-highlite-accent" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(32, 82, 149, 0.15)" }}
            >
              <motion.div 
                className={`absolute inset-x-0 -top-1 h-1 bg-gradient-to-r ${item.color}`} 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
              />
              
              <motion.div 
                className={`bg-gradient-to-br ${item.color} p-4 rounded-full mb-6 relative z-10`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  y: [0, -5, 0],
                  transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                {index === 0 ? (
                  <Star className="h-6 w-6 text-white" />
                ) : index === 1 ? (
                  <Briefcase className="h-6 w-6 text-white" />
                ) : (
                  <MoveUp className="h-6 w-6 text-white" />
                )}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <motion.div 
                className="font-bold text-highlite-primary text-4xl relative z-10 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <motion.span
                  animate={{ 
                    y: [0, -5, 0],
                    transition: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: index * 0.3 }
                  }}
                  className="inline-block"
                >
                  {item.number}
                </motion.span>
              </motion.div>
              
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
