import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className={`relative ${className}`}>
        <input
          ref={ref}
          id={inputId}
          {...props}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`
            peer w-full px-4 pt-5 pb-2 bg-white border-2 rounded-xl
            text-gray-900 placeholder-transparent
            transition-all duration-200 outline-none
            focus:ring-2 focus:ring-blue-500/30
            ${error
              ? 'border-red-500 focus:border-red-600 focus:ring-red-500/30'
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'}
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100
          `}
        />
        <label
          htmlFor={inputId}
          className={`
            absolute left-4 pointer-events-none transition-all duration-200
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:text-base peer-placeholder-shown:text-black
            peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
            peer-focus:font-medium peer-focus:text-blue-600
            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0
            peer-not-placeholder-shown:text-xs
            ${error ? 'text-red-600' : ''}
          `}
        >
          {label}
        </label>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;