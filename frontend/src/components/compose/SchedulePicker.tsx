import { Chip } from '../ui/Chip';
import { minDatetimeLocalValue } from '../../lib/dates';

export const SCHEDULE_PRESETS = [
  { label: '1 hour', value: '1h' },
  { label: '1 day', value: '1d' },
  { label: '1 week', value: '1w' },
  { label: '1 month', value: '1M' },
  { label: '1 year', value: '1y' },
] as const;

export type ScheduleMode = 'relative' | 'absolute';

type Props = {
  mode: ScheduleMode;
  onModeChange: (mode: ScheduleMode) => void;
  sendAfter: string;
  onSendAfterChange: (value: string) => void;
  sendAtLocal: string;
  onSendAtLocalChange: (value: string) => void;
};

export function SchedulePicker({
  mode,
  onModeChange,
  sendAfter,
  onSendAfterChange,
  sendAtLocal,
  onSendAtLocalChange,
}: Props) {
  return (
    <fieldset className="space-y-5 border-0 p-0">
      <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted dark:text-[#8a8680]">
        When should this arrive?
      </legend>

      <div className="flex gap-2" role="group" aria-label="Schedule type">
        <Chip
          label="From now"
          selected={mode === 'relative'}
          onSelect={() => onModeChange('relative')}
        />
        <Chip
          label="Exact date"
          selected={mode === 'absolute'}
          onSelect={() => onModeChange('absolute')}
        />
      </div>

      {mode === 'relative' ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {SCHEDULE_PRESETS.map((preset) => (
              <Chip
                key={preset.value}
                label={preset.label}
                selected={sendAfter === preset.value}
                onSelect={() => onSendAfterChange(preset.value)}
              />
            ))}
          </div>
          <label className="block space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              Custom (e.g. 2d, 3M)
            </span>
            <input
              type="text"
              value={sendAfter}
              onChange={(e) => onSendAfterChange(e.target.value)}
              placeholder="1h"
              className="w-full border-b border-rule bg-transparent py-2 font-mono text-sm outline-none focus:border-ink dark:border-rule-dark dark:focus:border-[#e8e4dc]"
            />
          </label>
        </div>
      ) : (
        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            Delivery date & time
          </span>
          <input
            type="datetime-local"
            value={sendAtLocal}
            min={minDatetimeLocalValue()}
            onChange={(e) => onSendAtLocalChange(e.target.value)}
            className="w-full border-b border-rule bg-transparent py-2 font-mono text-sm outline-none focus:border-ink dark:border-rule-dark dark:focus:border-[#e8e4dc]"
          />
        </label>
      )}
    </fieldset>
  );
}
