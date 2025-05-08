
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star, ArrowRight, Check, Circle } from 'lucide-react';
import { motion, useAnimation, AnimatePresence, Variants } from 'framer-motion';

const CallToAction: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const controls = useAnimation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
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

  const benefitItems = [
    "Interactive AI mock interviews",
    "Personalized career roadmap",
    "ATS-friendly resume builder",
    "Industry connections",
    "Continuous skill development"
  ];

  return (
    <div className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 highlite-gradient-bg"></div>
      
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[10%] left-[10%] h-40 w-40 rounded-full bg-white/10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        ></motion.div>
        
        <motion.div
          className="absolute top-[60%] right-[15%] h-64 w-64 rounded-full bg-white/10"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2 
          }}
        ></motion.div>
        
        <motion.svg
          className="absolute top-0 right-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0 Q40,30 100,10 L100,100 L0,100 Z"
            fill="rgba(255,255,255,0.03)"
            animate={{ 
              d: [
                "M0,0 Q40,30 100,10 L100,100 L0,100 Z",
                "M0,0 Q60,50 100,15 L100,100 L0,100 Z",
                "M0,0 Q40,30 100,10 L100,100 L0,100 Z"
              ]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            variants={containerVariants}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="h-1 bg-white/50 mb-6 rounded-full hidden md:block"
            ></motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Ready to Transform Your
              <div className="relative inline-block ml-2">
                <span>Career Journey</span>
                <motion.div 
                  className="absolute -bottom-2 left-0 h-1 bg-white/70 w-full rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </div>?
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 mb-8 max-w-lg"
              variants={itemVariants}
            >
              Join thousands of students, colleges, and employers already using HighliteX to connect talent with opportunity.
            </motion.p>
            
            <motion.div 
              className="space-y-3 mb-8"
              variants={itemVariants}
            >
              {benefitItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <div className="mr-3 flex-shrink-0 bg-white/20 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">{item}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-4"
              variants={itemVariants}
            >
              <Link to="/register">
                <motion.div
                  onMouseEnter={() => setHoveredButton("register")}
                  onMouseLeave={() => setHoveredButton(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button className="text-md bg-white text-highlite-primary hover:bg-gray-100 flex items-center gap-2 group h-12 px-6 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-highlite-extralight/0 to-highlite-extralight/20"
                      initial={{ x: "-100%" }}
                      animate={{ 
                        x: hoveredButton === "register" ? "0%" : "-100%" 
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ repeat: Infinity, repeatDelay: 3, duration: 1 }}
                      className="relative z-10"
                    >
                      <Rocket className="h-4 w-4" />
                    </motion.div>
                    <span className="relative z-10">Register Now</span>
                    <motion.div
                      className="absolute right-4 opacity-0"
                      animate={{ 
                        x: hoveredButton === "register" ? [0, 5, 0] : 0,
                        opacity: hoveredButton === "register" ? 1 : 0
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight size={16} className="text-highlite-accent" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/demo">
                <motion.div
                  onMouseEnter={() => setHoveredButton("demo")}
                  onMouseLeave={() => setHoveredButton(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button variant="outline" className="text-md border-white text-white hover:bg-white/10 flex items-center gap-2 h-12 px-6 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ scale: 0, borderRadius: "100%" }}
                      animate={{ 
                        scale: hoveredButton === "demo" ? 3 : 0,
                        borderRadius: hoveredButton === "demo" ? "100%" : "0%"
                      }}
                      transition={{ duration: 0.6 }}
                      style={{ transformOrigin: "center" }}
                    />
                    <Star className="h-4 w-4 relative z-10" /> 
                    <span className="relative z-10">Schedule a Demo</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-10 flex items-center justify-center md:justify-start gap-8"
              variants={itemVariants}
            >
              {[
                { number: "1.2M+", text: "Users" },
                { number: "200+", text: "Colleges" },
                { number: "500+", text: "Companies" }
              ].map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <div className="h-12 w-px bg-white/20"></div>}
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div 
                      className="text-white text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (index * 0.2), duration: 0.4 }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: index * 0.3 }}
                      >
                        {item.number}
                      </motion.span>
                    </motion.div>
                    <div className="text-white/70 text-sm">{item.text}</div>
                  </motion.div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            variants={itemVariants}
          >
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated backgrounds */}
              <motion.div 
                className="absolute -top-8 -left-8 w-full h-full bg-white/10 rounded-lg"
                animate={{ 
                  rotate: [0, 2, 0, -2, 0],
                  x: [0, 5, 0, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-8 -right-8 w-full h-full bg-white/10 rounded-lg"
                animate={{ 
                  rotate: [0, -2, 0, 2, 0],
                  y: [0, 5, 0, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              ></motion.div>
              
              {/* Main content card */}
              <motion.div
                className="relative bg-white/20 backdrop-blur-sm rounded-lg p-8 border border-white/30 overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated dots background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-1 w-1 rounded-full bg-white/30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{ 
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{ 
                        duration: 3 + Math.random() * 3, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="flex -space-x-3">
                    {["JD", "KP", "AR", "MS", "LT"].map((initials, i) => (
                      <motion.div 
                        key={i}
                        className={`w-10 h-10 rounded-full ${
                          ["bg-highlite-light", "bg-highlite-accent", "bg-highlite-primary", "bg-purple-500", "bg-blue-500"][i % 5]
                        } flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/20`}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                      >
                        {initials}
                      </motion.div>
                    ))}
                    <motion.div
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      +24
                    </motion.div>
                  </div>
                  <motion.div 
                    className="ml-4 text-white/90"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    People are joining right now
                  </motion.div>
                </div>
                
                <motion.div 
                  className="relative mb-6 bg-white/10 p-4 rounded-lg border border-white/20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="absolute -top-2 -left-2 bg-highlite-accent rounded-full p-1 shadow-lg">
                    <Circle className="h-4 w-4 text-white fill-white" />
                  </div>
                  <blockquote className="text-white font-medium italic">
                    "HighliteX helped me improve my interview skills and land multiple job offers. The AI feedback was spot on!"
                  </blockquote>
                </motion.div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Rahul S.</div>
                    <div className="text-white/70 text-sm">Data Scientist @ Google</div>
                  </div>
                  <motion.div 
                    className="flex"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + (i * 0.1) }}
                      >
                        <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                
                <motion.button
                  className="mt-6 w-full py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg flex items-center justify-center gap-2 border border-white/20 transition-colors duration-300"
                  whileHover={{ y: -3 }}
                >
                  <span>Join them now</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
