import React from 'react';

type Props = {
  jobLevels: Array<{ title?: string; salary?: number }> | null;
};

export default function CareerProgression({ jobLevels }: Props) {
  if (!jobLevels) return null;
  return (
    <div className="p-4 bg-white border rounded">
      <ul>
        {jobLevels.map((jl, i) => (
          <li key={i} className="py-2 border-b">
            <strong>{jl.title}</strong> — ${jl.salary?.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
