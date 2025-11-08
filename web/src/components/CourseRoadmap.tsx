import React from 'react';

type Props = {
  degreeRequirement: Array<any>;
};

export default function CourseRoadmap({ degreeRequirement }: Props) {
  if (!degreeRequirement) return null;
  return (
    <div className="p-4 bg-white border rounded">
      <ul>
        {degreeRequirement.map((c: any, i: number) => (
          <li key={i} className="py-1 border-b">{c.title || c.code || c}</li>
        ))}
      </ul>
    </div>
  );
}
