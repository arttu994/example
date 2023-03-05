import { QueryFailedError } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TypeOrmExceptions extends QueryFailedError {}
