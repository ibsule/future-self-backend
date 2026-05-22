type Props = {
  children: string;
  tone?: 'neutral' | 'success';
};

export function Alert({ children, tone = 'neutral' }: Props) {
  const toneClass =
    tone === 'success'
      ? 'border-ink/30 bg-black/[0.03] dark:border-[#e8e4dc]/30 dark:bg-white/[0.04]'
      : 'border-rule bg-black/[0.02] dark:border-rule-dark dark:bg-white/[0.02]';

  return (
    <p
      className={`border px-4 py-3 font-mono text-xs leading-relaxed tracking-wide ${toneClass}`}
      role="status"
    >
      {children}
    </p>
  );
}
