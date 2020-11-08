import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import CreateUserDTO from '../dtos/CreateUser.dto';
import Users from '../entities/Users.entity';
import jwtPayload from '../authentication/jwtPayload';
import BCryptHashProvider from '../providers/PasswordHashProvider/implementations/BcryptHash.provider';
import IPasswordHashProvider from '../providers/PasswordHashProvider/models/IPasswordHashProvider';
import { UsersRepository } from '../repositories/Users.repository';

@Injectable()
export default class UsersServices {
  //Injecting our repository
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @Inject(BCryptHashProvider) private hashProvider: IPasswordHashProvider,
    private jwtService: JwtService,
  ) {}

  public async getAllUsersService(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  public async updateUser(id: string, user: CreateUserDTO) {
    await this.getUserById(id);
    await this.usersRepository.update(id, user);
    return { id, ...user };
  }

  public async authenticate(
    username: string,
    password: string,
  ): Promise<boolean> {
    const userExists = await this.getUserByUsername(username);

    const authresult = this.hashProvider.compare(password, userExists.password);

    if (!authresult) {
      throw new HttpException('Failed to authenticate', HttpStatus.BAD_REQUEST);
    }

    const payload: jwtPayload = { username };
    const token = await this.jwtService.sign(payload);
    console.log(token);
    return authresult;
  }

  public async getUserById(id: string): Promise<Users> {
    Logger.log('TESTE', 'INFO');
    Logger.debug('DEBUG', 'DEBUG');
    Logger.error('ERROR', 'ERROR');
    Logger.verbose('VERBOSE', 'VERBOSE');
    const userExists = await this.usersRepository.findOne({ where: { id } });

    if (!userExists) {
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    }

    return userExists;
  }

  public async getUserByUsername(username: string): Promise<Users> {
    const userExists = await this.usersRepository.findByUsername(username);
    console.log(username, userExists);

    if (!userExists) {
      throw new HttpException('Username does not exists', HttpStatus.NOT_FOUND);
    }

    return userExists;
  }

  public async createNewUsers(user: CreateUserDTO): Promise<Users> {
    ///const userExists = await this.getUserByCPF(user.cpf);

    const userExists = await this.usersRepository.findByUsername(user.username);

    if (userExists) {
      throw new HttpException(
        'This username is already registered',
        HttpStatus.CONFLICT,
      );
    }

    user.password = await this.hashProvider.hash(user.password);
    return this.usersRepository.createNewUser(user);
  }

  private async getUserByCPF(cpf: number): Promise<Users> {
    const userExists = this.usersRepository.findByCPF(cpf);

    if (!userExists) {
      throw new HttpException(
        'This CPF does is not registered',
        HttpStatus.CONFLICT,
      );
    }

    return userExists;
  }

  public async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    this.usersRepository.remove(user);
  }
}
