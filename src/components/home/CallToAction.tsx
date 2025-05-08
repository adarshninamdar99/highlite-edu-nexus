
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const CallToAction: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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

  return (
    <div className="py-24 highlite-gradient-bg">
      <div className="container mx-auto px-4">
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
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Ready to Transform Your Career Journey?
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 mb-8 max-w-lg"
              variants={itemVariants}
            >
              Join thousands of students, colleges, and employers already using HighliteX to connect talent with opportunity.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-4"
              variants={itemVariants}
            >
              <Link to="/register">
                <Button className="text-md bg-white text-highlite-primary hover:bg-gray-100 flex items-center gap-2 group">
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 1 }}
                  >
                    <Rocket className="h-4 w-4" />
                  </motion.div>
                  <span>Register Now</span>
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="text-md border-white text-white hover:bg-white/10 flex items-center gap-2">
                  <Star className="h-4 w-4" /> Schedule a Demo
                </Button>
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
                      {item.number}
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
              <motion.div 
                className="absolute -top-6 -left-6 w-full h-full bg-white/10 rounded-lg"
                animate={{ 
                  rotate: [0, 2, 0, -2, 0],
                  x: [0, 3, 0, -3, 0]
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-6 w-full h-full bg-white/10 rounded-lg"
                animate={{ 
                  rotate: [0, -2, 0, 2, 0],
                  y: [0, 3, 0, -3, 0]
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              ></motion.div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-lg p-8 border border-white/30">
                <div className="flex items-center mb-6">
                  <div className="flex -space-x-2">
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-highlite-light flex items-center justify-center text-white text-xs font-bold"
                      whileHover={{ scale: 1.2, z: 10 }}
                    >JD</motion.div>
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-highlite-accent flex items-center justify-center text-white text-xs font-bold"
                      whileHover={{ scale: 1.2, z: 10 }}
                    >KP</motion.div>
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-highlite-primary flex items-center justify-center text-white text-xs font-bold"
                      whileHover={{ scale: 1.2, z: 10 }}
                    >AR</motion.div>
                  </div>
                  <div className="ml-4 text-white/90">People are joining right now</div>
                </div>
                <motion.blockquote 
                  className="text-white font-medium italic mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  "HighliteX helped me improve my interview skills and land multiple job offers. The AI feedback was spot on!"
                </motion.blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Rahul S.</div>
                    <div className="text-white/70 text-sm">Data Scientist</div>
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
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
