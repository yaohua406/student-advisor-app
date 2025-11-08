export function getCoursesByMajorAndInstitution(major = 'General', institution = 'MDC') {
  // minimal stub: return a few sample course objects
  return [
    { code: `${institution}-101`, title: `${major} Basics` },
    { code: `${institution}-102`, title: `${major} Intermediate` },
  ];
}
