import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import jwtPayload from './jwtPayload';
import Users from '../entities/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../repositories/Users.repository';
import { classToClass } from 'class-transformer';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1337',
    });
  }

  async validate(payload: jwtPayload): Promise<Users> {
    //TODO : CHANGE THE PAYLOAD TO RETRIEVE THE USER DATA WITH ONLY ONE CALL TO DB
    const user = await this.usersRepository.findByUsername(payload.username);

    //Using classToClass we ensure we transform the entity, removing its password
    return classToClass(user);
  }
}
