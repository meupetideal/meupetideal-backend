export abstract class EncrypterGateway {
  abstract encrypt(
    payload: Record<string, unknown>,
    secretkey?: 'access' | 'refresh',
  ): Promise<string>;

  abstract decrypt(
    token: string,
    secretkey?: 'access' | 'refresh',
  ): Promise<Record<string, unknown>>;
}
