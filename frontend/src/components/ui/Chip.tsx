type Props = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function Chip({ label, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-150 ${
        selected
          ? 'border-ink bg-ink text-paper dark:border-[#e8e4dc] dark:bg-[#e8e4dc] dark:text-paper-dark'
          : 'border-rule bg-transparent text-ink-muted hover:border-ink hover:text-ink dark:border-rule-dark dark:text-[#8a8680] dark:hover:border-[#e8e4dc] dark:hover:text-[#e8e4dc]'
      }`}
    >
      {label}
    </button>
  );
}
