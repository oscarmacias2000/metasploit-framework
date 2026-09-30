'use client';

import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightAdornment?: ReactNode;
};

// Input con anillo de foco animado (focus-within) y estado de error.
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightAdornment, className = '', id, ...rest }, ref) => {
    const inputId = id ?? rest.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <div
          className={`flex items-center gap-2 rounded-lg border bg-card px-3 transition-all duration-150 focus-within:ring-2 focus-within:ring-primary/40 ${
            error ? 'border-danger' : 'border-border focus-within:border-primary'
          }`}
        >
          {icon}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground ${className}`}
            {...rest}
          />
          {rightAdornment}
        </div>
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
