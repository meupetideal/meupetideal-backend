import { Service } from '@core/application/service';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { inject, injectable } from 'tsyringe';
import { PasswordRecoveryTokensRepository } from '../repositories/password-recovery-tokens.repository';
import { InvalidRecoveryTokenError } from '../use-cases/errors/invalid-recovery-token.error';

interface RegisterInput {
  userId: UniqueEntityId;
}

@injectable()
export class PasswordRecoveryTokensService implements Service {
  constructor(
    @inject('PasswordRecoveryTokensRepository')
    private passwordRecoveryTokensRepository: PasswordRecoveryTokensRepository,
  ) {}

  public async register({
    userId,
  }: RegisterInput): Promise<PasswordRecoveryToken> {
    const passwordRecoveryToken = PasswordRecoveryToken.create({
      userId,
      token: UniqueEntityId.create(),
    });

    await this.passwordRecoveryTokensRepository.insert(passwordRecoveryToken);

    return passwordRecoveryToken;
  }

  public async getValidPasswordRecoveryToken(
    token: string,
  ): Promise<PasswordRecoveryToken> {
    const passwordRecoveryToken =
      await this.passwordRecoveryTokensRepository.findByToken(token);

    if (!passwordRecoveryToken || !passwordRecoveryToken.validateToken()) {
      throw new InvalidRecoveryTokenError();
    }

    return passwordRecoveryToken;
  }
}
