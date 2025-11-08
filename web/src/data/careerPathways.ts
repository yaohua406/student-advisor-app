export function getCareerPathwayByJobTitle(title?: string) {
  if (!title) return null;
  return {
    jobTitle: title,
    keySkills: ['Problem solving', 'Communication', 'Teamwork'],
    certifications: ['Certification A', 'Certification B'],
    jobLevels: [
      { title: 'Entry Level', salary: 45000 },
      { title: 'Mid Level', salary: 70000 },
      { title: 'Senior Level', salary: 110000 },
    ],
  };
}
