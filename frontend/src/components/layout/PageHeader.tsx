type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <header className="mb-12 space-y-4">
      {eyebrow && (
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-faint">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-4xl leading-tight md:text-5xl">{title}</h1>
      {subtitle && (
        <p className="max-w-xl text-lg leading-relaxed text-ink-muted dark:text-[#a8a4a0]">
          {subtitle}
        </p>
      )}
      <div className="h-px w-16 bg-rule dark:bg-rule-dark" aria-hidden />
    </header>
  );
}
