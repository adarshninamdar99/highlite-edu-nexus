
import React from 'react';
import { Users, Book, Building } from 'lucide-react';

const ToolBenefits: React.FC = () => {
  const benefitCategories = [
    {
      icon: <Users className="h-12 w-12 text-highlite-accent" />,
      title: "For Students",
      benefits: [
        "85% improved interview confidence",
        "3x more interview calls with AI-optimized resumes",
        "Personalized skill development paths",
        "Real-time feedback on interview performance",
        "Access to a library of practice questions"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Book className="h-12 w-12 text-highlite-accent" />,
      title: "For Colleges",
      benefits: [
        "38% average increase in placement rates",
        "Comprehensive analytics on student performance",
        "Reduced administrative burden for placement cells",
        "Enhanced industry-academia connections",
        "Improved college ranking through better placements"
      ],
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Building className="h-12 w-12 text-highlite-accent" />,
      title: "For Employers",
      benefits: [
        "40% reduction in time-to-hire",
        "Higher quality candidate pool",
        "Reduced recruitment costs",
        "Pre-assessed candidates with validated skills",
        "Direct access to top educational institutions"
      ],
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="h-1 w-12 rounded-full bg-highlite-accent mr-2"></span>
            <p className="text-highlite-accent font-medium">PROVEN BENEFITS</p>
            <span className="h-1 w-12 rounded-full bg-highlite-accent ml-2"></span>
          </div>
          <h2 className="text-3xl font-bold text-highlite-primary mb-4">How HighliteX Benefits Everyone</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform creates value across the entire talent ecosystem with measurable results
          </p>
        </div>

        <div className="space-y-16">
          {benefitCategories.map((category, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-highlite-accent/10 transform rotate-3 rounded-lg"></div>
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="rounded-lg shadow-lg relative z-10 w-full object-cover aspect-video"
                  />
                </div>
              </div>
              <div className="md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-highlite-extralight/30 p-3 rounded-full">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-highlite-primary">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="bg-highlite-accent/20 p-1 rounded-full mt-1">
                        <div className="w-2 h-2 bg-highlite-accent rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <div className="inline-block bg-highlite-primary/10 rounded-lg px-4 py-2">
                    <p className="text-highlite-primary font-medium">
                      {index === 0 ? "93% of students report improved interview outcomes after using HighliteX" : 
                       index === 1 ? "Top colleges see a 38% increase in placement rates within first 6 months" : 
                       "Employers report 45% improvement in candidate quality and fit"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolBenefits;
