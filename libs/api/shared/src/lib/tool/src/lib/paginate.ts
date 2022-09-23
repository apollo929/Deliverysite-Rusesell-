/* import {
  LessThan,
  MoreThan,
  MoreThanOrEqual,
  SelectQueryBuilder,
} from 'typeorm';
import { PageInfo, PaginationArgs } from '@dfobobcat/graphql-types';

const SPLIT_BY = ',';

export function getOrderAndDirection(
  orderBy = '+id',
  entityAlias: string,
): [string, 'DESC' | 'ASC' | undefined] {
  let direction: '-' | '+';
  let order: string;
  if (orderBy[0] !== '-' && orderBy[0] !== '+') {
    direction = '+';
    order = orderBy;
  } else {
    direction = orderBy[0];
    order = orderBy.slice(1);
  }
  return [`${entityAlias}.${order}`, direction === '-' ? 'DESC' : 'ASC'];
}

export async function paginate<T>(
  entityAlias: string,
  query: SelectQueryBuilder<T>,
  paginationArgs: PaginationArgs = {} as PaginationArgs,
  setOrder = '+id',
  defaultLimit = 6,
): Promise<any> {
  const totalCountQuery = query.clone();
  let limit = defaultLimit;
  const orderBy = getOrderAndDirection(orderDirection, entityAlias);
  const cursorColumn = orderBy[1];
  const orderDirection = orderBy[0];

  if (paginationArgs.first) {
    if (paginationArgs.after) {
      const decodedCursor = Buffer.from(
        paginationArgs.after,
        'base64',
      ).toString('ascii');
      const paginationData = decodedCursor.split(SPLIT_BY);
      const offsetId = Number(paginationData[0]);
      orderDirection = paginationData[1];
      query.where({
        [`${entityAlias}.${cursorColumn}`]: MoreThanOrEqual(offsetId),
      });
    }

    if (paginationArgs.first) {
      limit = paginationArgs.first;
    }
  } else if (paginationArgs.last && paginationArgs.before) {
    const decodedCursor = Buffer.from(paginationArgs.before, 'base64').toString(
      'ascii',
    );
    const paginationData = decodedCursor.split(SPLIT_BY);
    const offsetId = Number(paginationData[0]);
    orderDirection = paginationData[1];

    if (paginationArgs.last) {
      limit = paginationArgs.last;
    }

    query.where({ [`${entityAlias}.${cursorColumn}`]: LessThan(offsetId) });
  }

  const result = await query
    .take(limit)
    .orderBy(...getOrderAndDirection(orderDirection, entityAlias))
    .getMany();

  const startCursorId: number =
    result.length > 0 ? (result[0] as any)[cursorColumn] : undefined;
  const endCursorId: number =
    result.length > 0 ? (result as any).slice(-1)[0][cursorColumn] : undefined;

  const beforeQuery = totalCountQuery.clone();

  const afterQuery = beforeQuery.clone();

  let countBefore = 0;
  let countAfter = 0;
  if (
    beforeQuery.expressionMap.wheres &&
    beforeQuery.expressionMap.wheres.length
  ) {
    countBefore = await beforeQuery
      .andWhere(`${`${entityAlias}.${cursorColumn}`} < :cursor`, {
        cursor: startCursorId,
      })
      .getCount();
    countAfter = await afterQuery
      .andWhere(`${`${entityAlias}.${cursorColumn}`} > :cursor`, {
        cursor: endCursorId,
      })
      .getCount();
  } else {
    countBefore = await beforeQuery
      .where(`${`${entityAlias}.${cursorColumn}`} < :cursor`, {
        cursor: startCursorId,
      })
      .getCount();

    countAfter = await afterQuery
      .where(`${`${entityAlias}.${cursorColumn}`} > :cursor`, {
        cursor: endCursorId,
      })
      .getCount();
  }

  const edges = result.map((value) => {
    return {
      node: value,
      cursor: Buffer.from(
        `${(value as any)[cursorColumn]},${setOrder}`,
      ).toString('base64'),
    };
  });

  const pageInfo: PageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
  };
  pageInfo.startCursor = edges.length > 0 ? edges[0].cursor : undefined;
  pageInfo.endCursor = edges.length > 0 ? edges.slice(-1)[0].cursor : undefined;
  console.log('COUNT BEFORE', countBefore);
  pageInfo.hasNextPage = countAfter > 0;
  pageInfo.hasPreviousPage = countBefore > 0;
  // pageInfo.countBefore = countBefore;
  // pageInfo.countNext = countAfter;
  // pageInfo.countCurrent = edges.length;
  // pageInfo.countTotal = countAfter + countBefore + edges.length;

  return { edges, pageInfo };
}
 */
