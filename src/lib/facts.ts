export const facts = { currency: '', tax: null, today: '2026-11-03', payoutSchedule: null, referencePrefix: 'RES-', restaurant: 'Olive & Ember' } as const;
export const amount = (value: number) => Number.isFinite(value) ? value.toFixed(2).replace(/\.00$/, '') : '0';
export const reference = (value: number) => facts.referencePrefix + value;
