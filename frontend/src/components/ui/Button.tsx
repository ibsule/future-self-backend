import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'ghost' | 'outline';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:opacity-90 dark:bg-[#e8e4dc] dark:text-paper-dark',
  ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5',
  outline:
    'border border-rule bg-transparent hover:bg-black/[0.03] dark:border-rule-dark dark:hover:bg-white/[0.04]',
};

const baseClass =
  'inline-flex items-center justify-center rounded-sm px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40';

type Shared = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type Props = Shared &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined })
    | (Omit<LinkProps, 'className' | 'children'> & { to: string })
  );

export function Button({
  variant = 'primary',
  className = '',
  children,
  to,
  ...props
}: Props) {
  const classes = `${baseClass} ${variants[variant]} ${className}`;

  if (to) {
    const { to: _ignored, ...linkProps } = props as LinkProps;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
