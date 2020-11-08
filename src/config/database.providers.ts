import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProviders: TypeOrmModuleOptions = {
  type: 'sqlite',
  //database: ':memory:',
  database: './db/test.db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};
