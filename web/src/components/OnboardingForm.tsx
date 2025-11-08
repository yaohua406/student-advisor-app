import React, { useState } from 'react';
import { UserProfile } from '../types';

type Props = {
  onSubmit: (profile: UserProfile) => void;
};

export default function OnboardingForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('MDC');
  const [major, setMajor] = useState('Computer Science');
  const [desiredJob, setDesiredJob] = useState('Software Engineer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, institution, major, desiredJob });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Welcome — let's get started</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input className="w-full border p-2" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Institution</label>
          <select className="w-full border p-2" value={institution} onChange={e => setInstitution(e.target.value)}>
            <option value="MDC">Miami Dade College (MDC)</option>
            <option value="FIU">Florida International University (FIU)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Major</label>
          <input className="w-full border p-2" value={major} onChange={e => setMajor(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Desired Job</label>
          <input className="w-full border p-2" value={desiredJob} onChange={e => setDesiredJob(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Start</button>
        </div>
      </form>
    </div>
  );
}
