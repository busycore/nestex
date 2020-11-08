import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from './config/database.providers';

import { UsersModule } from './modules/users/users.module';

@Module({
  //Create the DB connection, than import the UsersModule
  imports: [TypeOrmModule.forRoot(databaseProviders), UsersModule],
})
export class AppModule {}
