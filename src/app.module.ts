import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { postgresConfig } from './config';
import { validationSchema } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfig],
      validationSchema,
    }),
  ],
})
export class AppModule {}
