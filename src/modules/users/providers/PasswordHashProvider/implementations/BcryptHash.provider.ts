import { Injectable, Scope } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

import IPasswordHashProvider from '../models/IPasswordHashProvider';

const salt = '213123142joifjofjsiofjsjlksdjf023u4023uzçklfeorihq';

@Injectable({ scope: Scope.DEFAULT })
export default class BCryptHashProvider implements IPasswordHashProvider {
  public async hash(word: string): Promise<string> {
    return hash(word, 8);
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}
