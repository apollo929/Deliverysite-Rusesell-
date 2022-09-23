import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./libs/api/core/src/lib/schema/**/*.graphql'],
  path: './libs/common/src/lib/types/graphql.ts',
  outputAs: 'interface',
});
