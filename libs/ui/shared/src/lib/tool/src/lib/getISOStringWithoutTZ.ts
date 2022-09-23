export const getISOStringWithoutTZ = (date: number): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date - tzoffset).toISOString();
};
