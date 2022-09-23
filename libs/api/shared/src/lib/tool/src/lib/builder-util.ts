import { Repository } from 'typeorm';
import { UserError } from '@dfobobcat/api/shared/exception';

export async function findByIdsOrThrow<T = any>(
  repo: Repository<any>,
  ids: number[],
  message = 'Invalid input error.',
): Promise<Array<T>> {
  const items = await repo.findByIds(ids);
  if (items.length !== ids.length) {
    throw new UserError(message);
  }
  return items;
}
export async function findIdOrThrow<T = any>(
  repo: Repository<any>,
  id: number,
  message = 'Invalid input error.',
): Promise<T> {
  const item = await repo.findOne(id);
  if (!item) {
    throw new UserError(message);
  }
  return item;
}
