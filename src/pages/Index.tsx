
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ForWhom from '@/components/home/ForWhom';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/home/Footer';
import SuccessRoadmap from '@/components/home/SuccessRoadmap';
import ToolBenefits from '@/components/home/ToolBenefits';
import Interactive3DFeatures from '@/components/home/Interactive3DFeatures';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const testimonials = [
    {
      text: "HighliteX transformed our campus placement process. The AI mock interviews gave our students the confidence they needed.",
      author: "Dr. Rajesh Kumar",
      role: "Placement Director, IITKGP",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      text: "As a recruiter, I've found that candidates who use HighliteX are better prepared and perform better during interviews.",
      author: "Priya Sharma",
      role: "Senior HR Manager, Infosys",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      text: "The resume builder feature helped me create an ATS-friendly resume that got me interviews at top tech companies.",
      author: "Vikram Singh",
      role: "Software Engineer, Google",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <div className="bg-white w-full overflow-x-hidden">
      <Hero />
      <ToolBenefits />
      <Features />
      <Interactive3DFeatures />
      <SuccessRoadmap />
      
      <div className="bg-white py-20 sm:py-24 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-highlite-extralight/20 to-transparent blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            className="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-highlite-extralight/30 to-transparent blur-3xl"
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center mb-6">
              <motion.span 
                className="h-1 w-12 rounded-full bg-highlite-accent mr-2"
                whileInView={{ width: [0, 48] }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              ></motion.span>
              <p className="text-highlite-accent font-medium">TESTIMONIALS</p>
              <motion.span 
                className="h-1 w-12 rounded-full bg-highlite-accent ml-2"
                whileInView={{ width: [0, 48] }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              ></motion.span>
            </div>
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-highlite-primary mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              What Our Users Say
            </motion.h2>
            <motion.div
              className="h-1 w-0 bg-highlite-accent/50 mx-auto mb-6 rounded-full"
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            ></motion.div>
          </motion.div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <motion.div 
                    className="p-4 sm:p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="highlite-card p-6 sm:p-8 text-center sm:text-left relative group transition-all">
                      <div className="absolute -top-6 right-6 w-12 h-12 rounded-full bg-highlite-accent/10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                        <Quote className="w-6 h-6 text-highlite-accent transform rotate-180" />
                      </div>
                      
                      <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center">
                        <motion.div 
                          className="mx-auto sm:mx-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className="w-20 h-20 rounded-full border-2 border-highlite-light/20 object-cover shadow-lg"
                          />
                        </motion.div>
                        
                        <div>
                          <div className="flex justify-center sm:justify-start mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                              >
                                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                              </motion.div>
                            ))}
                          </div>
                          
                          <blockquote className="text-lg sm:text-xl italic text-gray-700 mb-6 relative">
                            <span className="text-3xl text-highlite-accent/20 absolute -top-4 -left-2">"</span>
                            {testimonial.text}
                            <span className="text-3xl text-highlite-accent/20 absolute -bottom-4 -right-2">"</span>
                          </blockquote>
                          
                          <div>
                            <p className="font-bold text-highlite-primary text-lg">{testimonial.author}</p>
                            <p className="text-gray-600">{testimonial.role}</p>
                          </div>
                          
                          <motion.div 
                            className="h-1 w-0 bg-gradient-to-r from-transparent via-highlite-accent to-transparent mt-4"
                            whileInView={{ width: "60%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="border-highlite-accent text-highlite-accent hover:bg-highlite-accent hover:text-white transition-colors duration-200 -left-12" />
              <CarouselNext className="border-highlite-accent text-highlite-accent hover:bg-highlite-accent hover:text-white transition-colors duration-200 -right-12" />
            </div>
            <div className="flex justify-center gap-2 mt-6 sm:hidden">
              <CarouselPrevious className="static transform-none border-highlite-accent text-highlite-accent hover:bg-highlite-accent hover:text-white transition-colors duration-200 mr-2" />
              <CarouselNext className="static transform-none border-highlite-accent text-highlite-accent hover:bg-highlite-accent hover:text-white transition-colors duration-200 ml-2" />
            </div>
          </Carousel>
        </div>
      </div>
      
      <ForWhom />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
