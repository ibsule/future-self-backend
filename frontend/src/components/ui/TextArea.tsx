import type { TextareaHTMLAttributes } from 'react';
import { countWords } from '../../lib/words';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  maxWords?: number;
  error?: string | null;
};

export function TextArea({
  label,
  maxWords,
  error,
  id,
  value = '',
  className = '',
  ...props
}: Props) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  const words = countWords(String(value));

  return (
    <label htmlFor={fieldId} className="block space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted dark:text-[#8a8680]">
          {label}
        </span>
        {maxWords !== undefined && (
          <span className="font-mono text-[10px] text-ink-faint">
            {words} / {maxWords}
          </span>
        )}
      </div>
      <textarea
        id={fieldId}
        value={value}
        className={`min-h-[220px] w-full resize-y border border-rule bg-white/40 px-4 py-3 font-serif text-base leading-relaxed outline-none transition-colors placeholder:text-ink-faint focus:border-ink dark:border-rule-dark dark:bg-white/[0.03] dark:focus:border-[#e8e4dc] ${className}`}
        {...props}
      />
      {error && (
        <span className="block font-mono text-[10px] text-ink" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
