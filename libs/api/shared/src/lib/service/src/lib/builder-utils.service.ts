import { Repository } from 'typeorm';
import { UserError } from '@dfobobcat/api/shared/exception';

export class BuilderUtilService {
  constructor() {}
  public async findByIdsOrThrow(
    repo: Repository<any>,
    ids: number[],
    message = 'Invalid input error.',
  ) {
    const items = await repo.findByIds(ids);
    if (items.length !== ids.length) {
      throw new UserError(message);
    }
    return items;
  }
  public async findIdOrThrow(
    repo: Repository<any>,
    id: number,
    message = 'Invalid input error.',
  ) {
    const item = await repo.findOne(id);
    if (!item) {
      throw new UserError(message);
    }
    return item;
  }
}
