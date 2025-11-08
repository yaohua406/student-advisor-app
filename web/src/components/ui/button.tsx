import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'secondary' | string;
  className?: string;
};

export default function Button({ children, className = '', variant, ...props }: Props) {
  const base = 'px-3 py-1 rounded ';
  return (
    <button {...props} className={base + ' ' + className}>
      {children}
    </button>
  );
}
