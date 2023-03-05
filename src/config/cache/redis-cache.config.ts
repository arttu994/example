import { registerAs } from '@nestjs/config';
import { ConfigTokens } from '../../constants';
import RedisCache from './redis-cache.interface';

export default registerAs(
  ConfigTokens.REDIS_CACHE,
  (): RedisCache => ({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    db: parseInt(process.env.REDIS_DB),
  }),
);
