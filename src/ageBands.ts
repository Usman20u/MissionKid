export const AGE_BANDS = ['4–6', '7–8', '9–10'] as const;

export type AgeBand = (typeof AGE_BANDS)[number];
