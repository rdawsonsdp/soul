import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-primary-brown mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-lg border transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:border-accent-gold
          ${error
            ? 'border-error-red bg-red-50 text-red-900'
            : 'border-light-brown/30 bg-white text-charcoal'
          }
          placeholder:text-light-brown/60
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error-red">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-light-brown">
          {helperText}
        </p>
      )}
    </div>
  );
}
