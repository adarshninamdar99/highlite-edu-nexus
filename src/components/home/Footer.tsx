
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-highlite-primary">Highlite<span className="text-highlite-accent">X</span></span>
            </Link>
            <p className="text-gray-600 mb-6">
              AI-powered interview preparation, resume building, and job matching for the next generation of professionals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-highlite-primary mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/mock-interviews" className="text-gray-600 hover:text-highlite-accent">Mock Interviews</Link></li>
              <li><Link to="/resume-builder" className="text-gray-600 hover:text-highlite-accent">Resume Builder</Link></li>
              <li><Link to="/job-matches" className="text-gray-600 hover:text-highlite-accent">Job Matches</Link></li>
              <li><Link to="/coding-labs" className="text-gray-600 hover:text-highlite-accent">Coding Labs</Link></li>
              <li><Link to="/courses" className="text-gray-600 hover:text-highlite-accent">Courses</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-highlite-primary mb-4">For</h3>
            <ul className="space-y-2">
              <li><Link to="/for-students" className="text-gray-600 hover:text-highlite-accent">Students</Link></li>
              <li><Link to="/for-colleges" className="text-gray-600 hover:text-highlite-accent">Colleges</Link></li>
              <li><Link to="/for-employers" className="text-gray-600 hover:text-highlite-accent">Employers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-highlite-primary mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-highlite-accent">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-highlite-accent">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-highlite-accent">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-highlite-accent">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} HighliteX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
