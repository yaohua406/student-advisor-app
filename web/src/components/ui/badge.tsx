import React from 'react';

export default function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-block px-2 py-0.5 rounded text-xs ${className}`}>{children}</span>;
}
