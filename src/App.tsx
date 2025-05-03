
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingLayout from './components/LandingLayout';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import StudentDashboard from './pages/StudentDashboard';
import CollegeDashboard from './pages/CollegeDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import MockInterviews from './pages/MockInterviews';
import ResumeBuilder from './pages/ResumeBuilder';
import CodingLabs from './pages/CodingLabs';
import Assignments from './pages/Assignments';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import './App.css';
import { Toaster } from './components/ui/toaster';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page with no sidebar */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Index />} />
        </Route>
        
        {/* Auth pages without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* App pages with sidebar layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="college-dashboard" element={<CollegeDashboard />} />
          <Route path="employer-dashboard" element={<EmployerDashboard />} />
          <Route path="mock-interviews" element={<MockInterviews />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="coding-labs" element={<CodingLabs />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="courses" element={<Courses />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
