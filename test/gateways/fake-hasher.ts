import { HasherGateway } from '@domain/accounts/application/gateways/hasher';

export class FakeHasher implements HasherGateway {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat('-hashed') === hashed;
  }
}
