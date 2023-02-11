import { registerAs } from '@nestjs/config';
import { ConfigTokens } from 'src/constants';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

export default registerAs(
  ConfigTokens.POSTGRES,
  (): Partial<PostgresConnectionCredentialsOptions> => ({
    host: process.env.POSTGRES_HOST,
    port: Number.parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  }),
);
