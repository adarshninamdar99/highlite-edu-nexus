
import React from 'react';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const templates = [
  { id: 1, name: "Professional", color: "#3498db" },
  { id: 2, name: "Creative", color: "#e74c3c" },
  { id: 3, name: "Executive", color: "#2c3e50" },
  { id: 4, name: "Modern", color: "#9b59b6" },
  { id: 5, name: "Minimalist", color: "#1abc9c" },
  { id: 6, name: "Technical", color: "#f39c12" },
];

const ResumeTemplates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = React.useState<number | null>(null);
  const { toast } = useToast();

  const selectTemplate = (id: number) => {
    setSelectedTemplate(id);
    toast({
      title: "Template Selected",
      description: `You've selected the ${templates.find(t => t.id === id)?.name} template.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="aspect-[3/4] relative">
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: `${template.color}20` }}
            >
              <div className="relative">
                <FileText 
                  className="h-16 w-16" 
                  style={{ color: template.color }}
                />
                {selectedTemplate === template.id && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
              <p className="text-white font-medium">{template.name} Template</p>
            </div>
          </div>
          <CardFooter className="justify-between p-4">
            <span className="font-medium">{template.name}</span>
            <Button 
              size="sm" 
              className={selectedTemplate === template.id ? "bg-green-500 hover:bg-green-600" : "bg-highlite-accent hover:bg-highlite-light"}
              onClick={() => selectTemplate(template.id)}
            >
              {selectedTemplate === template.id ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Selected
                </>
              ) : (
                "Use"
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ResumeTemplates;
