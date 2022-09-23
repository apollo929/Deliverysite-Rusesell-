import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { buildContext } from 'graphql-passport';
import { GqlContext } from '@dfobobcat/api/shared/model';
import { UserService } from '@dfobobcat/api/shared/service';
import { GraphQLUpload } from 'apollo-server-express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
// import { DateValidatorDirective } from './dateValidator.directive';
@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      // fieldResolverEnhancers: ['guards'],
      typePaths: ['./**/*.graphql'],
      resolvers: {
        Upload: GraphQLUpload,
      },
      uploads: {
        maxFieldSize: 524288000,
      },
      path: '/graphql',
      cors: {
        origin: this.configService.get('ALLOWED_ORIGINS').split(','),
        credentials: true,
      },
      bodyParserConfig: { limit: '50mb' },
      introspection: false,
      context: async ({ req, res, connection }): Promise<GqlContext> => {
        return buildContext({ req, res, User: req.user });
      },
      formatError: (error) => {
        this.logger.error(error);

        // user must only see specific error messages
        if (error.extensions?.code !== 'BAD_USER_INPUT') {
          return {
            message:
              'Sorry, something went wrong! We are already working on it.',
            code: error.extensions?.code || 'SERVER_ERROR',
            statusCode:
              error.extensions?.exception?.status ||
              HttpStatus.INTERNAL_SERVER_ERROR,
          };
        }
        return {
          message: error.message,
          code: error.extensions?.code || 'SERVER_ERROR',
          statusCode:
            error.extensions?.exception?.status ||
            HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
      debug: false,

      formatResponse: (response) => {
        return response;
      },
      schemaDirectives: {
        // dateValidator: DateValidatorDirective,
      },
    };
  }
}
