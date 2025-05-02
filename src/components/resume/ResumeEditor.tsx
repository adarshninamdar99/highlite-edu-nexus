
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  CheckCircle, 
  AlertTriangle, 
  Edit, 
  Plus, 
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  accomplishments: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

interface ResumeEditorProps {
  resumeData: ResumeData;
  onUpdate: (section: string, data: any) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resumeData, onUpdate }) => {
  const [editSection, setEditSection] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    summary: true,
    experience: true,
    education: true,
    skills: true
  });
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };
  
  const handlePersonalInfoChange = (field: string, value: string) => {
    const updatedPersonalInfo = {
      ...resumeData.personalInfo,
      [field]: value
    };
    onUpdate('personalInfo', updatedPersonalInfo);
  };
  
  const handleSummaryChange = (value: string) => {
    onUpdate('summary', value);
  };
  
  const handleExperienceChange = (index: number, field: string, value: string | string[]) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    onUpdate('experience', updatedExperience);
  };
  
  const addExperience = () => {
    const newExperience = {
      role: "Job Title",
      company: "Company Name",
      period: "Start - End",
      accomplishments: ["Add your accomplishments here"]
    };
    onUpdate('experience', [...resumeData.experience, newExperience]);
  };
  
  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    onUpdate('experience', updatedExperience);
  };
  
  const addExperienceAccomplishment = (expIndex: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].accomplishments.push("New accomplishment");
    onUpdate('experience', updatedExperience);
  };
  
  const updateExperienceAccomplishment = (expIndex: number, accIndex: number, value: string) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].accomplishments[accIndex] = value;
    onUpdate('experience', updatedExperience);
  };
  
  const removeExperienceAccomplishment = (expIndex: number, accIndex: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].accomplishments.splice(accIndex, 1);
    onUpdate('experience', updatedExperience);
  };
  
  const addEducation = () => {
    const newEducation = {
      degree: "Degree",
      institution: "Institution Name",
      period: "Start - End"
    };
    onUpdate('education', [...resumeData.education, newEducation]);
  };
  
  const handleSkillChange = (skills: string[]) => {
    onUpdate('skills', skills);
  };
  
  const addSkill = () => {
    onUpdate('skills', [...resumeData.skills, "New Skill"]);
  };
  
  const updateSkill = (index: number, value: string) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    onUpdate('skills', updatedSkills);
  };
  
  const removeSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    onUpdate('skills', updatedSkills);
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <Collapsible open={openSections.personalInfo} onOpenChange={() => toggleSection('personalInfo')}>
        <div className="border rounded-md">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4">
              <h3 className="font-medium flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Personal Information
              </h3>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={(e) => {
                  e.stopPropagation();
                  setEditSection(editSection === 'personalInfo' ? null : 'personalInfo');
                }}>
                  <Edit className="h-4 w-4" />
                </Button>
                {openSections.personalInfo ? 
                  <ChevronUp className="h-4 w-4 ml-2" /> : 
                  <ChevronDown className="h-4 w-4 ml-2" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 pt-0">
              {editSection === 'personalInfo' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input 
                      value={resumeData.personalInfo.name} 
                      onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      value={resumeData.personalInfo.email} 
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input 
                      value={resumeData.personalInfo.phone} 
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <Input 
                      value={resumeData.personalInfo.location} 
                      onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <span className="ml-2">{resumeData.personalInfo.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <span className="ml-2">{resumeData.personalInfo.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="ml-2">{resumeData.personalInfo.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <span className="ml-2">{resumeData.personalInfo.location}</span>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      
      {/* Professional Summary */}
      <Collapsible open={openSections.summary} onOpenChange={() => toggleSection('summary')}>
        <div className="border rounded-md">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4">
              <h3 className="font-medium flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Professional Summary
              </h3>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={(e) => {
                  e.stopPropagation();
                  setEditSection(editSection === 'summary' ? null : 'summary');
                }}>
                  <Edit className="h-4 w-4" />
                </Button>
                {openSections.summary ? 
                  <ChevronUp className="h-4 w-4 ml-2" /> : 
                  <ChevronDown className="h-4 w-4 ml-2" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 pt-0">
              {editSection === 'summary' ? (
                <div>
                  <label className="block text-sm font-medium mb-1">Professional Summary</label>
                  <Textarea 
                    value={resumeData.summary} 
                    onChange={(e) => handleSummaryChange(e.target.value)}
                    rows={5}
                  />
                </div>
              ) : (
                <p className="text-sm">{resumeData.summary}</p>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      
      {/* Work Experience */}
      <Collapsible open={openSections.experience} onOpenChange={() => toggleSection('experience')}>
        <div className="border rounded-md">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4">
              <h3 className="font-medium flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Work Experience
              </h3>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    addExperience();
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
                {openSections.experience ? 
                  <ChevronUp className="h-4 w-4 ml-2" /> : 
                  <ChevronDown className="h-4 w-4 ml-2" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 pt-0 space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div 
                  key={index} 
                  className={`border-l-2 ${index === 0 ? 'border-highlite-accent' : 'border-gray-300'} pl-4 py-1`}
                >
                  <div className="flex justify-between">
                    {editSection === `experience-${index}` ? (
                      <div className="space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <Input 
                              value={exp.role} 
                              onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Company</label>
                            <Input 
                              value={exp.company} 
                              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Period</label>
                            <Input 
                              value={exp.period} 
                              onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium">Accomplishments</label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addExperienceAccomplishment(index)}
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add
                            </Button>
                          </div>
                          {exp.accomplishments.map((acc, accIndex) => (
                            <div key={accIndex} className="flex items-center gap-2 mb-2">
                              <Input 
                                value={acc} 
                                onChange={(e) => updateExperienceAccomplishment(index, accIndex, e.target.value)}
                                className="flex-grow"
                              />
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8" 
                                onClick={() => removeExperienceAccomplishment(index, accIndex)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditSection(null)}
                          >
                            Done
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeExperience(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h4 className={`font-medium ${index === 0 ? 'text-highlite-primary' : ''}`}>{exp.role}</h4>
                          <p className="text-sm text-gray-600">{exp.company} • {exp.period}</p>
                          <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-gray-600">
                            {exp.accomplishments.map((acc, i) => (
                              <li key={i}>{acc}</li>
                            ))}
                          </ul>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => setEditSection(`experience-${index}`)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              
              {resumeData.experience.length === 0 && (
                <div className="text-center p-4">
                  <p className="text-gray-500">No work experience added yet</p>
                  <Button 
                    className="mt-2 bg-highlite-accent hover:bg-highlite-light"
                    onClick={addExperience}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Work Experience
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      
      {/* Education */}
      <Collapsible open={openSections.education} onOpenChange={() => toggleSection('education')}>
        <div className="border rounded-md">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4">
              <h3 className="font-medium flex items-center">
                {resumeData.education.length > 0 ? (
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                )}
                Education
              </h3>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    addEducation();
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
                {openSections.education ? 
                  <ChevronUp className="h-4 w-4 ml-2" /> : 
                  <ChevronDown className="h-4 w-4 ml-2" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 pt-0">
              {resumeData.education.length === 0 ? (
                <div className="text-center p-4">
                  <p className="mt-2 text-gray-600 text-sm">Add your educational background</p>
                  <Button 
                    className="mt-4 bg-highlite-accent hover:bg-highlite-light"
                    onClick={addEducation}
                  >
                    Add Education
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Education items would go here */}
                  {/* Similar structure to experience items */}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      
      {/* Skills */}
      <Collapsible open={openSections.skills} onOpenChange={() => toggleSection('skills')}>
        <div className="border rounded-md">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4">
              <h3 className="font-medium flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Skills
              </h3>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditSection(editSection === 'skills' ? null : 'skills');
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {openSections.skills ? 
                  <ChevronUp className="h-4 w-4 ml-2" /> : 
                  <ChevronDown className="h-4 w-4 ml-2" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 pt-0">
              {editSection === 'skills' ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <Input 
                          value={skill} 
                          onChange={(e) => updateSkill(index, e.target.value)}
                          className="border-0 bg-transparent w-auto p-0 focus-visible:ring-0 text-xs"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 p-0"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={addSkill}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditSection(null)}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center rounded-full bg-highlite-extralight px-2.5 py-0.5 text-xs font-medium text-highlite-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default ResumeEditor;
