import { getFutureTimeWithoutLeap, parseToTimestamp } from './time.util';

describe('parseToTimestamp', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('adds 1 day across Feb 29 in a leap year (UTC anchor)', () => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    jest.setSystemTime(new Date('2024-02-28T12:00:00.000Z'));

    const ts = parseToTimestamp('1d');
    expect(new Date(ts).toISOString()).toBe('2024-02-29T12:00:00.000Z');
  });

  it('adds 1 day from Feb 29 to Mar 1 in a leap year', () => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    jest.setSystemTime(new Date('2024-02-29T12:00:00.000Z'));

    const ts = parseToTimestamp('1d');
    expect(new Date(ts).toISOString()).toBe('2024-03-01T12:00:00.000Z');
  });

  it('adds 1 calendar year from leap day (not fixed 365d)', () => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    jest.setSystemTime(new Date('2024-02-29T12:00:00.000Z'));

    const ts = parseToTimestamp('1y');
    expect(new Date(ts).toISOString()).toBe('2025-02-28T12:00:00.000Z');
  });

  it('1y across a leap year is one day after naive 365 × 24h from Mar 1 anchor', () => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    jest.setSystemTime(new Date('2023-03-01T12:00:00.000Z'));

    const calendarOneYear = parseToTimestamp('1y');
    const naive365Days = Date.now() + 365 * 24 * 60 * 60 * 1000;

    expect(calendarOneYear - naive365Days).toBe(24 * 60 * 60 * 1000);
    expect(new Date(calendarOneYear).toISOString()).toBe(
      '2024-03-01T12:00:00.000Z',
    );
  });
});

describe('getFutureTimeWithoutLeap', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('uses exactly 365d per year (differs from calendar year over leap boundary)', () => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    jest.setSystemTime(new Date('2023-03-01T12:00:00.000Z'));

    const withoutLeap = getFutureTimeWithoutLeap('1y');
    const calendar = parseToTimestamp('1y');

    expect(withoutLeap).toBe(Date.now() + 365 * 24 * 60 * 60 * 1000);
    expect(new Date(withoutLeap).toISOString()).toBe(
      '2024-02-29T12:00:00.000Z',
    );
    expect(calendar - withoutLeap).toBe(24 * 60 * 60 * 1000);
  });
});
