
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import StudentForm from '@/components/registration/StudentForm';
import CollegeForm from '@/components/registration/CollegeForm';
import EmployerForm from '@/components/registration/EmployerForm';

// Define the form validation schema with Zod
const registerSchema = z.object({
  userType: z.string().min(1, { message: 'Please select a user type' }),
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  terms: z.boolean()
    .refine(val => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: "student",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const userType = form.watch('userType');

  // Handle next step
  const handleNextStep = async () => {
    const result = await form.trigger(['userType', 'firstName', 'lastName', 'email', 'password', 'terms']);
    if (result) {
      setCurrentStep(2);
    }
  };

  // Handle back
  const handleBack = () => {
    setCurrentStep(1);
  };

  // Form submission handler
  const onSubmit = (data: RegisterFormValues) => {
    // Future API call would go here to register the user
    console.log('Form submitted:', data);
    
    toast({
      title: "Account created",
      description: "Your account has been created successfully!",
      duration: 5000,
    });

    // Redirect to appropriate dashboard based on user type
    switch(data.userType) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'employer':
        navigate('/employer-dashboard');
        break;
      case 'college':
        navigate('/college-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Render step-specific content
  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I am a</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      {...field} 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.password && (
            <Alert variant="destructive" className="text-sm py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Password must be at least 8 characters and contain uppercase, lowercase, and numbers
              </AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                    I agree to the{" "}
                    <Link to="/terms" className="text-highlite-accent hover:underline">
                      terms of service
                    </Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-highlite-accent hover:underline">
                      privacy policy
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      );
    } else {
      // Step 2: User-specific form
      return (
        <CardContent>
          {userType === 'student' && <StudentForm form={form} />}
          {userType === 'college' && <CollegeForm form={form} />}
          {userType === 'employer' && <EmployerForm form={form} />}
        </CardContent>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-highlite-primary">
              Highlite<span className="text-highlite-accent">X</span>
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-highlite-primary">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-highlite-accent hover:underline">
              Sign in
            </Link>
          </p>
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm text-gray-500">
              Step {currentStep} of 2
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-highlite-primary flex items-center">
                  {currentStep === 2 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleBack} 
                      className="mr-2" 
                      type="button"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  {currentStep === 1 ? 'Sign up' : 'Complete your profile'}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 
                    ? 'Enter your information to create an account' 
                    : `Please provide additional information as a ${userType}`}
                </CardDescription>
              </CardHeader>
              
              {renderStepContent()}
              
              <CardFooter>
                {currentStep === 1 ? (
                  <Button 
                    type="button"
                    className="w-full bg-highlite-accent hover:bg-highlite-light"
                    onClick={handleNextStep}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="w-full bg-highlite-accent hover:bg-highlite-light"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

