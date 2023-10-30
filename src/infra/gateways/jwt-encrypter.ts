import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { EncrypterGateway } from '@domain/accounts/application/gateways/encrypter';
import { ExpiredRefreshTokenError } from '@domain/accounts/application/use-cases/errors/expired-refresh-token.error';

@injectable()
export class JwtEncrypter implements EncrypterGateway {
  private readonly SECRETS = {
    access: {
      secret: process.env.APP_SECRET,
      expiresIn: '15m',
    },
    refresh: {
      secret: process.env.APP_REFRESH_SECRET,
      expiresIn: '7d',
    },
  };

  public async encrypt(
    payload: Record<string, unknown>,
    secretKey?: 'access' | 'refresh',
  ): Promise<string> {
    const { secret, expiresIn } = this.SECRETS[secretKey ?? 'access'];

    return jwt.sign(payload, secret ?? '', { expiresIn });
  }

  public async decrypt(
    token: string,
    secretkey?: 'access' | 'refresh' | undefined,
  ): Promise<Record<string, unknown>> {
    const { secret } = this.SECRETS[secretkey ?? 'access'];

    try {
      return jwt.verify(token, secret ?? '') as Record<string, unknown>;
    } catch (error) {
      throw new ExpiredRefreshTokenError();
    }
  }
}
