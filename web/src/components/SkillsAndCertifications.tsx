import React from 'react';

type Props = {
  skills?: string[];
  certifications?: string[];
};

export default function SkillsAndCertifications({ skills = [], certifications = [] }: Props) {
  return (
    <div className="p-4 bg-white border rounded">
      <h4 className="font-semibold">Key Skills</h4>
      <ul className="mb-3">
        {skills.map((s, i) => (
          <li key={i} className="text-sm">• {s}</li>
        ))}
      </ul>
      <h4 className="font-semibold">Certifications</h4>
      <ul>
        {certifications.map((c, i) => (
          <li key={i} className="text-sm">• {c}</li>
        ))}
      </ul>
    </div>
  );
}
