import { ConnectionOptions } from 'typeorm';

export const getConfig = (): {
  database: ConnectionOptions;
} => {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
  } = process.env;
  return {
    database: {
      type: 'postgres',
      host: POSTGRES_HOST,
      port: parseInt(POSTGRES_PORT!),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      synchronize: false,
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '../../migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    },
  };
};

export default getConfig().database;
