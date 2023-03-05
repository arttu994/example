import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig, postgresConfig } from './config';
import { PermissionModule } from './permission/permission.module';
import { RolesModule } from './roles/roles.module';
import { validationSchema } from './schemas';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import redisCacheConfig from './config/cache/redis-cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfig, jwtConfig, redisCacheConfig],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(postgresConfig)],
      inject: [postgresConfig.KEY],
      useFactory: (config: ConfigType<typeof postgresConfig>) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    PermissionModule,
    RolesModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
