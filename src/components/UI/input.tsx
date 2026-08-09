import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <input
          ref={ref}
          {...props}
          placeholder=" "
          className={`
            peer w-full px-4 pt-6 pb-2 bg-white/5 border-2 rounded-xl
            text-white placeholder-white/5
            transition-all duration-200 outline-none
            ${error
              ? 'border-red-400 focus:border-red-300'
              : 'border-white/20 focus:border-blue-400'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
        <label
          className={`
            absolute left-4 text-white/50 transition-all duration-200 pointer-events-none
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-300
            peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs
            ${error ? 'text-red-300!' : ''}
          `}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-300 pl-4">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;