'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Line in ink-2, 3px radius, blue focus (moodboard .field)
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || props.name;
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const border = error ? 'border-warn' : 'border-ink-2';

    return (
      <div className="grid w-full gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-ink">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`w-full rounded-[3px] border ${border} bg-paper px-3 py-2.5 font-text text-base text-ink placeholder:text-ink-2 focus:border-brand-blue focus:outline-2 focus:outline-offset-0! focus:outline-brand-blue! ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-warn">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
