import React from 'react';

export function Alert({ children, variant }: { children: React.ReactNode; variant?: string }) {
  return <div className={`p-3 rounded border ${variant === 'destructive' ? 'bg-red-50' : 'bg-white'}`}>{children}</div>;
}

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <div className="font-semibold">{children}</div>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-600">{children}</div>;
}
