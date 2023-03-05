import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import redisCacheConfig from '../config/cache/redis-cache.config';
import { Permission } from '../permission/permission.entity';
import { PermissionModule } from '../permission/permission.module';
import { Roles } from '../roles/roles.entity';
import { RolesModule } from '../roles/roles.module';
import { UsersInitService } from './users-init.service';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import * as redisStore from 'cache-manager-redis-store';

import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Roles, Users]),
    PermissionModule,
    RolesModule,
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
  providers: [UsersInitService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
