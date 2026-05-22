export const TITLE_MAX_WORDS = 16;
export const CONTENT_MAX_WORDS = 500;

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function wordLimitError(
  text: string,
  max: number,
  label: string,
): string | null {
  const count = countWords(text);
  if (count > max) {
    return `${label} must be at most ${max} words (currently ${count}).`;
  }
  return null;
}
