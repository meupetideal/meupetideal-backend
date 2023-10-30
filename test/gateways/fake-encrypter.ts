import { EncrypterGateway } from '@domain/accounts/application/gateways/encrypter';

export class FakeEncrypter implements EncrypterGateway {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }

  async decrypt(token: string): Promise<Record<string, unknown>> {
    return JSON.parse(token);
  }
}
