import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { jwtConfig } from '../config';
import { AccessTokenStrategy } from './strategies/at.strategy';
import * as redisStore from 'cache-manager-redis-store';

import type { RedisClientOptions } from 'redis';
import redisCacheConfig from '../config/cache/redis-cache.config';
import { RefreshTokenStrategy } from './strategies/rt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    ConfigModule.forFeature(jwtConfig),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule.forFeature(redisCacheConfig)],
      inject: [redisCacheConfig.KEY],
      useFactory: (config: ConfigType<typeof redisCacheConfig>) => ({
        store: redisStore,
        username: config.username,
        database: config.db,
        port: config.port,
        host: config.host,
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
