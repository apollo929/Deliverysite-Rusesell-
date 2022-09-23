import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config({
  path: join(__dirname, '.env'),
});
let connConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  ssl: false,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export = {
  type: 'postgres',
  entities: [
    join(
      __dirname,
      'dist',
      'libs',
      'api',
      'core',
      'src',
      'lib',
      'entity',
      'src',
      'lib',
      '*.entity.{ts,js}',
    ),
  ],
  synchronize: false,
  migrations: ['apps/dfobobcat-api/src/db/migrations/*'],
  subscribers: [],
  cli: {
    migrationsDir: 'apps/dfobobcat-api/src/db/migrations',
  },
  ...connConfig,
};
