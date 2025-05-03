
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ForWhom from '@/components/home/ForWhom';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/home/Footer';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from 'lucide-react';

const Index: React.FC = () => {
  const testimonials = [
    {
      text: "HighliteX transformed our campus placement process. The AI mock interviews gave our students the confidence they needed.",
      author: "Dr. Rajesh Kumar",
      role: "Placement Director, IITKGP",
      rating: 5
    },
    {
      text: "As a recruiter, I've found that candidates who use HighliteX are better prepared and perform better during interviews.",
      author: "Priya Sharma",
      role: "Senior HR Manager, Infosys",
      rating: 5
    },
    {
      text: "The resume builder feature helped me create an ATS-friendly resume that got me interviews at top tech companies.",
      author: "Vikram Singh",
      role: "Software Engineer, Google",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="h-1 w-12 rounded-full bg-highlite-accent mr-2"></span>
              <p className="text-highlite-accent font-medium">TESTIMONIALS</p>
              <span className="h-1 w-12 rounded-full bg-highlite-accent ml-2"></span>
            </div>
            <h2 className="text-3xl font-bold text-highlite-primary mb-4">What Our Users Say</h2>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-6">
                    <div className="highlite-card p-8 text-center">
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-xl italic text-gray-700 mb-6">"{testimonial.text}"</blockquote>
                      <div>
                        <p className="font-bold text-highlite-primary">{testimonial.author}</p>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 border-highlite-accent text-highlite-accent" />
            <CarouselNext className="-right-12 border-highlite-accent text-highlite-accent" />
          </Carousel>
        </div>
      </div>
      <Features />
      <ForWhom />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
