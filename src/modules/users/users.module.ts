import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFileUploadProvider from 'src/shared/providers/FileUploadProvider/implementations/LocalFileUploadProvider';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/Users.repository';
import UsersServices from './services/users.service';
import BCryptHashProvider from './providers/PasswordHashProvider/implementations/BcryptHash.provider';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from './authentication/jwt.strategy';

@Module({
  //Make the UsersController available within the module
  controllers: [UsersController],
  //Make the UsersServices,and FileUploadProvider available within the module
  providers: [
    UsersServices,
    JwtStrategy,
    LocalFileUploadProvider,
    BCryptHashProvider,
  ],
  //Register the passport module
  //Register a JWT Token
  //Make the UsersRepository available within the module
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: '1337', signOptions: { expiresIn: 3600 } }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
