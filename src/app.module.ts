import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { postgresConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfig],
    }),
  ],
})
export class AppModule {}
