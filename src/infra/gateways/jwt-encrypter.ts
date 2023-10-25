import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { EncrypterGateway } from '@domain/accounts/application/gateways/encrypter';

@injectable()
export class JwtEncrypter implements EncrypterGateway {
  public async encrypt(payload: Record<string, unknown>): Promise<string> {
    const secret = process.env.APP_SECRET ?? '';

    return jwt.sign(payload, secret, { expiresIn: '15m' });
  }
}
