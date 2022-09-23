/**
 * get 00:00 of today in ISO format
 */
export function getTodayStart(): string {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const tzoffset = -660 * 60000;
  return new Date((date as any) - tzoffset).toISOString();
}
