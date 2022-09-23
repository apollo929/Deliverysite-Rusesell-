import { Logger, NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import session = require('express-session');
import passport = require('passport');

import { AppModule } from './app/app.module';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import * as fs from 'fs';
const key = process.env.PRIVATE_KEY_PATH;
const cert = process.env.CERT_PATH;

const opts: NestApplicationOptions = {};
if (
  key &&
  key.length &&
  cert &&
  cert.length &&
  fs.existsSync(key) &&
  fs.existsSync(cert)
) {
  opts.httpsOptions = {};
  opts.httpsOptions.key = fs.readFileSync(key);
  opts.httpsOptions.cert = fs.readFileSync(cert);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, opts);
  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = configService.get('APP_PORT');

  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    host: configService.get('REDIS_HOST'),
    port: configService.get('REDIS_PORT'),
  });

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      store: new RedisStore({ client: redisClient }),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000 * 168,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const server = await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
  server.setTimeout(1800000);
}

bootstrap();
