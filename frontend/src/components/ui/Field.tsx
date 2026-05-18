import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string | null;
};

export function Field({ label, hint, error, id, className = '', ...props }: Props) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={fieldId} className="block space-y-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted dark:text-[#8a8680]">
        {label}
      </span>
      <input
        id={fieldId}
        className={`w-full border-b border-rule bg-transparent py-2.5 font-serif text-lg outline-none transition-colors placeholder:text-ink-faint focus:border-ink dark:border-rule-dark dark:focus:border-[#e8e4dc] ${className}`}
        {...props}
      />
      {hint && !error && (
        <span className="block font-mono text-[10px] text-ink-faint">{hint}</span>
      )}
      {error && (
        <span className="block font-mono text-[10px] text-ink" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
