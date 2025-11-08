import React from 'react';

type Props = {
  institution: { code?: string; name?: string } | null;
};

export default function InstitutionComparison({ institution }: Props) {
  if (!institution) return null;
  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="text-lg font-semibold">{institution.name || institution.code}</h3>
      <p className="text-sm text-gray-600">Basic comparison information here.</p>
    </div>
  );
}
