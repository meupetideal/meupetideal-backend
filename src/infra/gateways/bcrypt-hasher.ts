import { compare, hash } from 'bcrypt';
import { injectable } from 'tsyringe';

import { HasherGateway } from '@domain/accounts/application/gateways/hasher';

@injectable()
export class BcryptHasher implements HasherGateway {
  private readonly HASH_SALT_LENGTH = 8;

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }
}
