// @ts-nocheck
'use client';

import React, { useState, useCallback } from 'react';
import { GraduationCap, ArrowLeft, User, BookOpen, Briefcase, AlertCircle, Zap, TrendingUp, ChevronDown, ChevronUp, CheckCircle, DollarSign, Wrench } from 'lucide-react';

// --- MOCK DATA STRUCTURES AND TYPES ---

/**
 * @typedef {Object} UserProfile
 * @property {string} name
 * @property {string} major
 * @property {string} desiredJob
 */

/**
 * @typedef {Object} Requirement
 * @property {string} name
 * @property {string} type - 'course' | 'exam' | 'internship' | 'certification'
 * @property {string} details
 * @property {boolean} isRequired
 */

/**
 * @typedef {Object} PathwayStage
 * @property {string} degreeLevel - 'AA/AS' | 'BS/BA' | 'MS/MA' | 'PhD/Doctorate'
 * @property {string} institution
 * @property {string} duration
 * @property {Requirement[]} requirements
 * @property {string} transferAgreement
 */

/**
 * @typedef {Object} SalaryExpectation
 * @property {string} entryLevel
 * @property {string} midCareer
 */

/**
 * @typedef {Object} RecommendedInternship
 * @property {string} company
 * @property {string} focus
 * @property {string} targetYear
 * @property {'Beginner' | 'Intermediate' | 'High Competition'} level
 */

/**
 * @typedef {Object} Pathway
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} focus
 * @property {SalaryExpectation} salaryExpectation
 * @property {RecommendedInternship[]} recommendedInternships
 * @property {PathwayStage[]} stages
 */

/**
 * MOCK DATA FUNCTION
 * Generates alternative full-lifecycle pathways based on user input.
 * @param {UserProfile} profile
 * @returns {Pathway[]}
 */
const getSimulatedPathways = (profile) => {
  // Mock data for Mechanical Engineering pathways
  if (profile.major.toLowerCase().includes('mech')) {
    return [
      {
        id: 'p1',
        name: 'The MDC-FIU Accelerated Engineer Pathway',
        focus: 'Fast-track to professional licensure with local resources.',
        description: 'Starts with MDC Associate in Arts (AA) or AS (Engineering focus), transfers to FIU for BS, and includes FE/PE exam preparation.',
        salaryExpectation: {
          entryLevel: '$75,000 - $90,000 (BS)',
          midCareer: '$110,000 - $160,000 (PE Licensure)',
        },
        recommendedInternships: [
          { company: 'Local Engineering/HVAC Consulting Firms', focus: 'Drafting, Design Support, Field Work', targetYear: 'Sophomore Year', level: 'Beginner' },
          { company: 'Manufacturing Operations (e.g., PepsiCo, Frito-Lay)', focus: 'Plant/Process Optimization, Maintenance', targetYear: 'Sophomore Year', level: 'Beginner' },
          { company: 'Florida Power & Light (FPL)', focus: 'Energy Infrastructure, Plant Operations', targetYear: 'Junior Year', level: 'Intermediate' },
          { company: 'Jabil/Tech Manufacturing (St. Pete)', focus: 'Product Design & Industrial Engineering', targetYear: 'Junior Year', level: 'Intermediate' },
          { company: 'Lockheed Martin (Orlando/Jupiter)', focus: 'Defense & Aerospace Systems (R&D focus)', targetYear: 'Junior Year', level: 'High Competition' },
          { company: 'NASA Kennedy Space Center/Contractors', focus: 'Ground Support Systems, Vehicle Integration', targetYear: 'Junior Year', level: 'High Competition' },
        ],
        stages: [
          {
            degreeLevel: 'AA/AS',
            institution: 'Miami Dade College (MDC)',
            duration: '2 Years',
            requirements: [
              { name: 'Calculus Sequence (I, II, III)', type: 'course', details: 'Required for all Engineering majors.', isRequired: true },
              { name: 'Physics with Calculus', type: 'course', details: 'PHY 2048/L and PHY 2049/L.', isRequired: true },
              { name: 'Intro to Engineering', type: 'course', details: 'EGN 1000 - Foundational course.', isRequired: true },
              { name: 'Internship/Co-op', type: 'internship', details: 'Optional summer internship at local firm.', isRequired: false },
            ],
            transferAgreement: '2+2 Articulation Agreement to FIU (guaranteed transfer).',
          },
          {
            degreeLevel: 'BS/BA',
            institution: 'Florida International University (FIU)',
            duration: '2 Years',
            requirements: [
              { name: 'Thermodynamics', type: 'course', details: 'Advanced mechanical system analysis.', isRequired: true },
              { name: 'Machine Design', type: 'course', details: 'Project-based design and analysis.', isRequired: true },
              { name: 'Fundamentals of Engineering (FE) Exam', type: 'exam', details: 'Recommended before graduation for EIT status.', isRequired: false },
              { name: 'Senior Design Project', type: 'course', details: 'Culminating capstone project.', isRequired: true },
            ],
            transferAgreement: 'Direct entry into FIU MS program through combined BS/MS option.',
          },
          {
            degreeLevel: 'MS/MA',
            institution: 'FIU or UF (Graduate School)',
            duration: '1.5 - 2 Years',
            requirements: [
              { name: 'Graduate Thesis or Project', type: 'course', details: 'Original research or major design project.', isRequired: true },
              { name: 'Practice of Engineering (PE) Exam', type: 'exam', details: 'Requires 4 years of experience after FE, but planning starts now.', isRequired: false },
            ],
            transferAgreement: 'N/A',
          },
        ],
      },
      {
        id: 'p2',
        name: 'The Global Research Scholar Pathway',
        focus: 'Emphasizes research and advanced academic study.',
        description: 'A more research-intensive route aimed at careers in R&D or academia, favoring a top-tier graduate program.',
        salaryExpectation: {
          entryLevel: '$95,000 - $120,000 (PhD Post-doc/R&D)',
          midCareer: '$150,000 - $250,000+ (Senior Researcher/Professor)',
        },
        recommendedInternships: [
          { company: 'University Research (e.g., UF/USF)', focus: 'Lab Assistantships (REU)', targetYear: 'Sophomore Year', level: 'Beginner' },
          { company: 'NASA Kennedy Space Center', focus: 'Aerospace Research & Development', targetYear: 'Junior Year', level: 'High Competition' },
          { company: 'Advanced Materials Labs (FL Universities)', focus: 'Graduate-level Research Prep', targetYear: 'Junior Year', level: 'Intermediate' },
        ],
        stages: [
          {
            degreeLevel: 'AA/AS',
            institution: 'MDC (AS Pre-Engineering)',
            duration: '2 Years',
            requirements: [
              { name: 'Engineering Physics', type: 'course', details: 'Focus on theoretical concepts for university transfer.', isRequired: true },
              { name: 'Undergraduate Research', type: 'internship', details: 'Participation in MDC’s STEM Research Program.', isRequired: true },
              { name: 'GRE Preparation', type: 'exam', details: 'Target score 320+ for top graduate programs.', isRequired: false },
            ],
            transferAgreement: 'Strong transfer advising for out-of-state universities (e.g., Georgia Tech).',
          },
          {
            degreeLevel: 'BS/BA',
            institution: 'Georgia Institute of Technology (Georgia Tech)',
            duration: '2 - 2.5 Years',
            requirements: [
              { name: 'Computational Fluid Dynamics', type: 'course', details: 'Advanced modeling techniques.', isRequired: true },
              { name: 'FE Exam', type: 'exam', details: 'Recommended for professional credibility.', isRequired: false },
              { name: 'Summer Research Internship', type: 'internship', details: 'Required research experience.', isRequired: true },
            ],
            transferAgreement: 'Competitive admissions, strong MDC GPA required.',
          },
          {
            degreeLevel: 'PhD/Doctorate',
            institution: 'MIT or Stanford',
            duration: '4 - 6 Years',
            requirements: [
              { name: 'Qualifying Examination', type: 'exam', details: 'Must be passed within first 2 years.', isRequired: true },
              { name: 'Dissertation Defense', type: 'course', details: 'Original, significant contribution to the field.', isRequired: true },
            ],
            transferAgreement: 'N/A',
          },
        ],
      },
    ];
  }

  // Default fallback pathway
  return [
    {
      id: 'p3',
      name: 'Default General Pathway',
      focus: 'Standard career path for unknown major.',
      description: 'A generic 4-stage model to illustrate the full academic journey.',
      salaryExpectation: {
          entryLevel: 'Varies ($40,000 - $60,000)',
          midCareer: 'Varies ($70,000 - $100,000)',
      },
      recommendedInternships: [
        { company: 'Local Small Business', focus: 'General Administration/Tech', targetYear: 'Sophomore Year', level: 'Beginner' },
        { company: 'Non-profit Organization', focus: 'Project Management', targetYear: 'Junior Year', level: 'Intermediate' },
      ],
      stages: [
        { degreeLevel: 'AA/AS', institution: 'MDC', duration: '2 Years', requirements: [{ name: 'General Education Core', type: 'course', details: 'Complete all general requirements.', isRequired: true }], transferAgreement: 'Articulation agreement to a local public university.' },
        { degreeLevel: 'BS/BA', institution: 'Local University', duration: '2 Years', requirements: [{ name: 'Major Core Curriculum', type: 'course', details: 'Complete all upper-division courses.', isRequired: true }], transferAgreement: 'N/A' },
        { degreeLevel: 'MS/MA', institution: 'Graduate School', duration: '2 Years', requirements: [{ name: 'Graduate Admissions Exam', type: 'exam', details: 'GRE/GMAT/LSAT as required.', isRequired: false }], transferAgreement: 'N/A' },
        { degreeLevel: 'PhD/Doctorate', institution: 'Research Institution', duration: '4 Years', requirements: [{ name: 'Dissertation', type: 'course', details: 'Complete doctoral research.', isRequired: true }], transferAgreement: 'N/A' },
      ],
    },
  ];
};

// --- INLINE COMPONENTS ---

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);
const CardContent = ({ children, className = 'p-6' }) => (
  <div className={className}>
    {children}
  </div>
);
const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-full font-medium transition duration-150 ease-in-out flex items-center justify-center';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
    outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    secondary: 'bg-white text-blue-600 hover:bg-blue-50',
  };
  return (
    <button {...props} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
const Badge = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    secondary: 'bg-white/20 text-white border-white/30',
    success: 'bg-green-100 text-green-700',
    destructive: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
const Alert = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-700',
    destructive: 'bg-red-50 border-red-200 text-red-700',
  };
  return (
    <div className={`p-4 border-l-4 rounded-lg flex items-start gap-3 ${variants[variant]}`}>
      {children}
    </div>
  );
};
const AlertTitle = ({ children }) => <h5 className="font-semibold">{children}</h5>;
const AlertDescription = ({ children }) => <p className="text-sm mt-1">{children}</p>;

/**
 * @param {{salary: SalaryExpectation}} props
 */
const SalaryExpectationCard = ({ salary }) => (
  <Card className="p-5 bg-yellow-50 border-l-4 border-yellow-500">
    <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
      <DollarSign className="h-5 w-5 mr-2 text-yellow-600" /> Earning Potential (Annual)
    </h4>
    <div className="space-y-2">
      <div className="text-sm">
        <p className="text-gray-600 font-semibold">Entry Level:</p>
        <p className="text-xl font-bold text-green-600">{salary.entryLevel}</p>
      </div>
      <div className="text-sm pt-2 border-t border-gray-100">
        <p className="text-gray-600 font-semibold">Mid-Career:</p>
        <p className="text-xl font-bold text-green-700">{salary.midCareer}</p>
      </div>
    </div>
    <p className="text-xs text-gray-500 mt-3">
      *Estimates based on US national averages for the desired job field.
    </p>
  </Card>
);

/**
 * @param {{internships: RecommendedInternship[]}} props
 */
const InternshipRecommendationsCard = ({ internships }) => {
  // Group internships by level
  const groupedInternships = internships.reduce((acc, int) => {
    (acc[int.level] = acc[int.level] || []).push(int);
    return acc;
  }, {});

  const levelOrder = ['Beginner', 'Intermediate', 'High Competition'];

  // Styling helpers
  const levelStyles = {
    'Beginner': { icon: <Wrench className="h-4 w-4 mr-2 text-green-600" />, titleColor: 'text-green-700', badgeColor: 'bg-green-100' },
    'Intermediate': { icon: <TrendingUp className="h-4 w-4 mr-2 text-yellow-600" />, titleColor: 'text-yellow-700', badgeColor: 'bg-yellow-100' },
    'High Competition': { icon: <AlertCircle className="h-4 w-4 mr-2 text-red-600" />, titleColor: 'text-red-700', badgeColor: 'bg-red-100' },
  };

  return (
    <Card className="p-5 bg-blue-50 border-l-4 border-blue-500">
      <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
        <Briefcase className="h-5 w-5 mr-2 text-blue-600" /> Recommended Internships
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        Target these Florida-based opportunities based on your experience level.
      </p>

      {levelOrder.map(level => {
        const internshipsInLevel = groupedInternships[level];
        const style = levelStyles[level];

        if (!internshipsInLevel || internshipsInLevel.length === 0) {
          return null;
        }

        return (
          <div key={level} className="mb-4 pt-3 border-t border-blue-200 first:border-t-0">
            <h5 className={`font-bold text-md mb-2 flex items-center ${style.titleColor}`}>
              {style.icon}
              {level} Opportunities
            </h5>
            <div className="space-y-2">
              {internshipsInLevel.map((int, index) => (
                <div key={index} className="pl-6 relative">
                    <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-400"></div>
                    <p className="font-semibold text-gray-700">{int.company}</p>
                    <p className="text-xs text-gray-500">
                        {int.focus}
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="font-medium text-blue-600">{int.targetYear}</span>
                    </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Card>
  );
};

/**
 * @param {{onSubmit: (profile: UserProfile) => void}} props
 */
const OnboardingForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [desiredJob, setDesiredJob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && major && desiredJob) {
      onSubmit({ name, major, desiredJob, institution: 'MDC' }); // Hardcoding institution to MDC for this specific pathway model
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2 flex items-center justify-center gap-2">
          <GraduationCap className="h-6 w-6" /> Pathway Planner
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your goals to generate your personalized A.A. to Ph.D. roadmap.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Alex Doe"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">Target Major</label>
            <input
              id="major"
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g., Mechanical Engineering"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-1">Desired Job/Career</label>
            <input
              id="job"
              type="text"
              value={desiredJob}
              onChange={(e) => setDesiredJob(e.target.value)}
              placeholder="e.g., Licensed Professional Engineer (PE)"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Generate Pathway <Zap className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </Card>
    </div>
  );
};

/**
 * @param {{stage: PathwayStage, stageIndex: number, totalStages: number}} props
 */
const StageCard = ({ stage, stageIndex, totalStages }) => {
  const [isOpen, setIsOpen] = useState(stageIndex === 0);

  const levelColors = {
    'AA/AS': 'bg-green-100 border-green-300 text-green-800',
    'BS/BA': 'bg-blue-100 border-blue-300 text-blue-800',
    'MS/MA': 'bg-purple-100 border-purple-300 text-purple-800',
    'PhD/Doctorate': 'bg-red-100 border-red-300 text-red-800',
  };

  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <Card className="relative mb-6 border border-gray-200">
      <div
        className="p-5 cursor-pointer flex justify-between items-center transition duration-200 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">
            {stageIndex + 1}
          </span>
          <div>
            <Badge className={`px-3 py-1 ${levelColors[stage.degreeLevel]}`}>{stage.degreeLevel}</Badge>
            <h3 className="text-xl font-semibold text-gray-800 mt-1">{stage.institution}</h3>
          </div>
        </div>
        <Icon className="h-5 w-5 text-gray-500" />
      </div>

      {isOpen && (
        <CardContent className="p-5 pt-0 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 mt-3 mb-4">
            <span className="font-semibold">Duration:</span> {stage.duration}
            <span className="mx-2 text-gray-400">|</span>
            <span className="font-semibold">Transfer Plan:</span> {stage.transferAgreement}
          </p>

          <h4 className="font-bold text-gray-800 mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-blue-500" /> Key Requirements
          </h4>
          <ul className="space-y-3">
            {stage.requirements.map((req, i) => (
              <li key={i} className="flex items-start text-sm">
                <Badge
                  variant={req.type === 'exam' || req.type === 'certification' ? 'success' : 'default'}
                  className="mr-3 shrink-0"
                >
                  {req.type.charAt(0).toUpperCase() + req.type.slice(1)}
                </Badge>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{req.name}</p>
                  <p className="text-gray-500 italic">{req.details}</p>
                  {req.type === 'exam' && req.isRequired && (
                    <span className="text-xs text-red-500 font-semibold mt-0.5 block">
                      *Mandatory for Licensure/Graduation
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      )}

      {/* Vertical connector line */}
      {stageIndex < totalStages - 1 && (
        <div className="absolute left-7 top-full w-0.5 h-6 bg-gray-300 -mt-2 -mb-2"></div>
      )}
    </Card>
  );
};

// --- MAIN APPLICATION COMPONENT ---
export default function PathwayPlanner() {
  const [userProfile, setUserProfile] = useState(null);
  const [activePathwayId, setActivePathwayId] = useState(null);

  const handleProfileSubmit = (profile) => {
    setUserProfile(profile);
  };

  const handleReset = useCallback(() => {
    setUserProfile(null);
    setActivePathwayId(null);
  }, []);

  if (!userProfile) {
    return <OnboardingForm onSubmit={handleProfileSubmit} />;
  }

  const pathways = getSimulatedPathways(userProfile);
  // Default to the first pathway if none is explicitly active
  const activePathway = pathways.find(p => p.id === activePathwayId) || pathways[0];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-blue-600">Full-Cycle Pathway Planner</h1>
                <p className="text-sm text-gray-600">A.A./A.S. to Ph.D. Roadmap</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleReset} className="hidden sm:flex">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome and Profile Summary */}
        <div className="mb-10">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-3xl font-extrabold text-white mb-2">Welcome, {userProfile.name}!</h2>
                  <p className="text-blue-100 mb-4 font-light">
                    Your full {userProfile.major} pathway, leading to {userProfile.desiredJob}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {userProfile.major}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {userProfile.desiredJob}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={handleReset}
                  className="sm:hidden bg-white text-blue-600 hover:bg-blue-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Pathways Selection */}
        <div className="mb-10 p-6 bg-white rounded-xl shadow-md border-t-4 border-yellow-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 mr-3 text-yellow-600" /> Alternative Pathways ({pathways.length})
          </h3>
          <p className="text-gray-600 mb-4">
            Select a pathway below to view the detailed academic and career plan.
          </p>
          <div className="flex flex-wrap gap-3">
            {pathways.map((path) => (
              <button
                key={path.id}
                onClick={() => setActivePathwayId(path.id)}
                className={`py-2 px-4 rounded-full text-sm font-semibold transition duration-150 ease-in-out border 
                  ${activePathway.id === path.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
              >
                {path.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Pathway Details */}
        <h3 className="text-3xl font-bold text-gray-800 mb-6">{activePathway.name}</h3>
        <p className="text-lg text-gray-700 mb-8 italic border-l-4 border-blue-500 pl-4">
          {activePathway.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Stage Progression */}
            <div className="relative">
              <h4 className="text-2xl font-bold mb-4 text-blue-600">Full Academic Journey: A.A./A.S. → Ph.D.</h4>
              <div className="space-y-6">
                {activePathway.stages.map((stage, index) => (
                  <StageCard
                    key={index}
                    stage={stage}
                    stageIndex={index}
                    totalStages={activePathway.stages.length}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel: Focus, Salary, Certifications & Warnings */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="p-5 border-l-4 border-blue-500">
              <h4 className="font-bold text-lg text-gray-800 mb-2">Pathway Focus</h4>
              <p className="text-gray-600 text-sm">{activePathway.focus}</p>
            </Card>

            {/* UPDATED: Internship Recommendations Card with levels */}
            {activePathway.recommendedInternships && activePathway.recommendedInternships.length > 0 && (
              <InternshipRecommendationsCard internships={activePathway.recommendedInternships} />
            )}

            {/* Existing: Salary Expectation Card */}
            {activePathway.salaryExpectation && (
              <SalaryExpectationCard salary={activePathway.salaryExpectation} />
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <div>
                <AlertTitle>Articulation Agreement Details</AlertTitle>
                <AlertDescription>
                  This pathway leverages the 2+2 articulation agreement between MDC and FIU (for Pathway 1). Always verify major-specific course equivalencies with both institutions' advisors.
                </AlertDescription>
              </div>
            </Alert>

            {/* General Requirement Summary (Exams/Certifications/Internships) */}
            <Card className="p-5">
              <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-purple-600" /> Career Milestones
              </h4>
              <ul className="space-y-3">
                {activePathway.stages.flatMap(s => s.requirements)
                  .filter(r => r.type !== 'course')
                  .map((req, i) => (
                    <li key={i} className="flex justify-between items-start text-sm border-b pb-2 last:border-b-0">
                      <div className="flex-1 pr-2">
                        <p className="font-medium text-gray-700">{req.name}</p>
                        <p className="text-xs text-gray-500">{req.details}</p>
                      </div>
                      <Badge variant={req.isRequired ? 'destructive' : 'default'} className="shrink-0 text-xs">
                        {req.isRequired ? 'MANDATORY' : 'OPTIONAL'}
                      </Badge>
                    </li>
                  ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Educational Pathway Planner | MDC & FIU Partnership Model
            </p>
            <p className="text-xs text-gray-500">
              This is a planning tool only. Always consult with an academic advisor for official requirements and guidance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
