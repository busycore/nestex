import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import jwtPayload from './jwtPayload';
import Users from '../entities/Users.entity';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1337',
    });
  }

  async validate(payload: jwtPayload): Promise<Users> {
    const user = new Users();
    user.name = 'baka';
    return user;
  }
}
