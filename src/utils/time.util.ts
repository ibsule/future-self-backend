import * as dayjs from 'dayjs';

type TimeUnit = 's' | 'm' | 'h' | 'd' | 'w' | 'y';

const UNIT_TO_MS: Record<TimeUnit, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  w: 7 * 24 * 60 * 60 * 1000,
  y: 365 * 24 * 60 * 60 * 1000,
};

function parseBaseTime(base?: string | number | Date): number {
  if (!base) return Date.now();

  if (typeof base === 'number') return base;

  if (base instanceof Date) return base.getTime();

  const parsed = new Date(base).getTime();
  if (isNaN(parsed)) {
    throw new Error(`Invalid base time: ${base}`);
  }

  return parsed;
}

/**
 * Get future time without accounting for leap year
 * @param duration Time unit. e.g '1y'
 * @param baseTime Base time for adding duration
 * @returns Future timestamp in milliseconds
 */
export function getFutureTimeWithoutLeap(
  duration: string,
  baseTime?: string | number | Date,
): number {
  const match = duration.match(/^(\d+)([smhdwy])$/);

  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2] as TimeUnit;

  const baseMs = parseBaseTime(baseTime);
  const durationMs = value * UNIT_TO_MS[unit];

  return baseMs + durationMs;
}

/**
 * Get future time accounting for leap year
 * @param input Time unit e.g '1d', '4m', '2y'
 * @returns Future timestamp in milliseconds
 */
export function getFutureTimeLeap(input: string): number {
  const match = input.match(/^(\d+)([smhdwy])$/);

  if (!match) {
    throw new Error(`Invalid time format: ${input}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2] as TimeUnit;

  const now = new Date();

  switch (unit) {
    case 's':
      now.setSeconds(now.getSeconds() + value);
      break;
    case 'm':
      now.setMinutes(now.getMinutes() + value);
      break;
    case 'h':
      now.setHours(now.getHours() + value);
      break;
    case 'd':
      now.setDate(now.getDate() + value);
      break;
    case 'w':
      now.setDate(now.getDate() + value * 7);
      break;
    case 'y':
      now.setFullYear(now.getFullYear() + value);
      break;
  }

  return now.getTime();
}

export function getFutureTime(input: string): number {
  const match = input.match(/^(\d+)([smhdwMy])$/);

  if (!match) {
    throw new Error(`Invalid time format: ${input}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const unitMap: Record<string, dayjs.ManipulateType> = {
    s: 'second',
    m: 'minute',
    h: 'hour',
    d: 'day',
    w: 'week',
    M: 'month',
    y: 'year',
  };

  return dayjs().add(value, unitMap[unit]).valueOf();
}

export function parseToTimestamp(value: string): number {
  const [, amountStr, unit] = value.match(/^(\d+)([smhdwMy])$/)!;

  const unitMap: Record<string, dayjs.ManipulateType> = {
    s: 'second',
    m: 'minute',
    h: 'hour',
    d: 'day',
    w: 'week',
    M: 'month',
    y: 'year',
  };

  return dayjs().add(parseInt(amountStr, 10), unitMap[unit]).valueOf();
}
