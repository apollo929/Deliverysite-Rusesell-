export function getOrderAndDirection(
  orderBy?: string,
): [string, 'DESC' | 'ASC'] | undefined {
  if (!orderBy || !orderBy.length) {
    return undefined;
  }
  let direction: '-' | '+';
  let order: string;
  if (orderBy[0] == '-' || orderBy[0] == '+') {
    direction = orderBy[0];
    order = orderBy.slice(1);
    return [`${order}`, direction === '-' ? 'DESC' : 'ASC'];
  }
  return undefined;
}
