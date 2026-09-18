// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { localCompletionPeriodId } from './missionSession';
import { completionPeriodLabel } from './missionProgress';

// A fixed calendar context, so these cases do not depend on the machine running
// them. The two ends below are the only ones where a family's local month and
// the UTC month actually disagree.
function withTimeZone(timeZone: string, run: () => void) {
  const previous = process.env.TZ;
  process.env.TZ = timeZone;
  try {
    run();
  } finally {
    process.env.TZ = previous;
  }
}

describe('the period a completion belongs to', () => {
  let originalTz: string | undefined;

  beforeEach(() => {
    originalTz = process.env.TZ;
  });

  afterEach(() => {
    process.env.TZ = originalTz;
  });

  it('follows the local month east of UTC, early on the first local day', () => {
    withTimeZone('Asia/Tokyo', () => {
      // 00:30 on 1 April in Tokyo is still 31 March in UTC.
      const moment = new Date(2024, 3, 1, 0, 30).getTime();

      expect(new Date(moment).toISOString().slice(0, 7)).toBe('2024-03');
      // The family's own month is what counts.
      expect(localCompletionPeriodId(moment)).toBe('2024-04');
    });
  });

  it('follows the local month west of UTC, late on the last local day', () => {
    withTimeZone('America/Los_Angeles', () => {
      // 23:30 on 31 March in Los Angeles is already 1 April in UTC.
      const moment = new Date(2024, 2, 31, 23, 30).getTime();

      expect(new Date(moment).toISOString().slice(0, 7)).toBe('2024-04');
      expect(localCompletionPeriodId(moment)).toBe('2024-03');
    });
  });

  it('crosses a year boundary by the local calendar in both directions', () => {
    withTimeZone('Asia/Tokyo', () => {
      expect(localCompletionPeriodId(new Date(2025, 0, 1, 0, 30).getTime())).toBe('2025-01');
    });
    withTimeZone('America/Los_Angeles', () => {
      expect(localCompletionPeriodId(new Date(2024, 11, 31, 23, 30).getTime())).toBe('2024-12');
    });
  });

  it('labels a stored period identically whatever the device timezone is', () => {
    const seen = new Set<string>();

    for (const timeZone of [
      'Asia/Tokyo',
      'America/Los_Angeles',
      'Europe/Berlin',
      'Pacific/Kiritimati',
      'UTC',
    ]) {
      withTimeZone(timeZone, () => {
        // The label is built from the stored identity, never from a moment that
        // a timezone could move into another month.
        seen.add(completionPeriodLabel('2024-03', 'en'));
      });
    }

    expect(seen.size).toBe(1);
    expect([...seen][0]).toContain('2024');
    expect([...seen][0]!.toLowerCase()).toContain('march');
  });

  it('labels the stored period in the selected language', () => {
    expect(completionPeriodLabel('2024-03', 'en').toLowerCase()).toContain('march');
    expect(completionPeriodLabel('2024-03', 'de').toLowerCase()).toContain('märz');
    expect(completionPeriodLabel('2024-03', 'ru').toLowerCase()).toContain('март');
  });

  it('falls back to the stored identity when it cannot be formatted', () => {
    // A stored value that is valid in shape but not a month anyone can format
    // still reads as itself rather than as nothing.
    expect(completionPeriodLabel('not-a-period', 'en')).toBe('not-a-period');
  });
});
