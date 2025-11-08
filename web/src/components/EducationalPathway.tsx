import React, { useState } from 'react';
import { UserProfile } from '../types';
import OnboardingForm from './OnboardingForm';
import InstitutionComparison from './InstitutionComparison';
import CourseRoadmap from './CourseRoadmap';
import CareerProgression from './CareerProgression';
import SkillsAndCertifications from './SkillsAndCertifications';
import Button from './ui/button';
import { Card, CardContent } from './ui/card';
import Badge from './ui/badge';
import { getInstitutionByCode } from '../data/institutions';
import { getCoursesByMajorAndInstitution } from '../data/courseCatalogs';
import { getCareerPathwayByJobTitle } from '../data/careerPathways';
import { GraduationCap, ArrowLeft, User, BookOpen, Briefcase, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export default function EducationalPathway() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleReset = () => {
    setUserProfile(null);
  };

  if (!userProfile) {
    return <OnboardingForm onSubmit={handleProfileSubmit} />;
  }

  // Fetch data based on user profile
  const institution = getInstitutionByCode(userProfile.institution);
  const mdcCourses = getCoursesByMajorAndInstitution(userProfile.major, 'MDC');
  const fiuCourses = getCoursesByMajorAndInstitution(userProfile.major, 'FIU');
  const careerPathway = getCareerPathwayByJobTitle(userProfile.desiredJob);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-blue-600">Educational Pathway Planner</h1>
                <p className="text-sm text-gray-600">Your personalized roadmap to success</p>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-white mb-2">Welcome, {userProfile.name}!</h2>
                  <p className="text-blue-100 mb-4">
                    Here's your personalized educational pathway
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <User className="h-3 w-3 mr-1" />
                      {userProfile.name}
                    </Badge>
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

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Institution Information */}
          {institution && (
            <InstitutionComparison institution={institution} />
          )}

          {/* Educational Path Info */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Your Educational Journey</AlertTitle>
            <AlertDescription>
              Start at Miami Dade College (MDC) with an Associate degree, then transfer to Florida International University (FIU) 
              to complete your Bachelor's degree. All credits from MDC transfer seamlessly through articulation agreements.
            </AlertDescription>
          </Alert>

          {/* MDC Course Roadmap */}
          {mdcCourses && (
            <div>
              <div className="mb-4">
                <h2>Step 1: Associate Degree at MDC</h2>
                <p className="text-gray-600">Foundation courses at Miami Dade College</p>
              </div>
              <CourseRoadmap degreeRequirement={mdcCourses} />
            </div>
          )}

          {/* FIU Course Roadmap */}
          {fiuCourses && (
            <div>
              <div className="mb-4">
                <h2>Step 2: Bachelor's Degree at FIU</h2>
                <p className="text-gray-600">Transfer to Florida International University to complete your degree</p>
              </div>
              <CourseRoadmap degreeRequirement={fiuCourses} />
            </div>
          )}

          {/* Skills and Certifications */}
          {careerPathway && (
            <div>
              <div className="mb-4">
                <h2>Professional Development</h2>
                <p className="text-gray-600">Skills and certifications to enhance your career</p>
              </div>
              <SkillsAndCertifications 
                skills={careerPathway.keySkills}
                certifications={careerPathway.certifications}
              />
            </div>
          )}

          {/* Career Progression */}
          {careerPathway && (
            <div>
              <div className="mb-4">
                <h2>Career Path: {userProfile.desiredJob}</h2>
                <p className="text-gray-600">From entry-level to senior positions with salary expectations</p>
              </div>
              <CareerProgression jobLevels={careerPathway.jobLevels} />
            </div>
          )}

          {/* No Data Warning */}
          {(!mdcCourses || !fiuCourses || !careerPathway) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Limited Information Available</AlertTitle>
              <AlertDescription>
                Some course or career information is not yet available for {userProfile.major} / {userProfile.desiredJob}. 
                Please consult with an academic advisor for detailed guidance.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Educational Pathway Planner | MDC & FIU Partnership
            </p>
            <p className="text-xs text-gray-500">
              This is a planning tool only. Always consult with an academic advisor for official requirements and guidance.
              Salary data is approximate and based on industry averages.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
