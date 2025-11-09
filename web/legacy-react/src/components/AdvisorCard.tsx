import React from 'react';

interface AdvisorCardProps {
  name: string;
  expertise: string;
  contact: string;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ name, expertise, contact }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-700">{expertise}</p>
      <p className="text-gray-500">{contact}</p>
    </div>
  );
};

export default AdvisorCard;
