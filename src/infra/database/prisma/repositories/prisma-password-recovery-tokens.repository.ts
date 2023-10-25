import { PasswordRecoveryTokensRepository } from '@domain/accounts/application/repositories/password-recovery-tokens.repository';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';
import { inject, injectable } from 'tsyringe';
import { DomainEvents } from '@core/enterprise/domain-events';
import { PrismaService } from '../prisma.service';
import { PrismaPasswordRecoveryTokenMapper } from '../mappers/prisma-password-recovery-token.mapper';

@injectable()
export class PrismaPasswordRecoveryTokensRepository
  implements PasswordRecoveryTokensRepository
{
  constructor(
    @inject('PrismaService')
    private prismaService: PrismaService,
  ) {}

  public async findByToken(
    token: string,
  ): Promise<PasswordRecoveryToken | undefined> {
    const passwordRecoveryToken =
      await this.prismaService.passwordRecoveryToken.findUnique({
        where: { token },
      });

    if (!passwordRecoveryToken) return undefined;

    return PrismaPasswordRecoveryTokenMapper.toDomain(passwordRecoveryToken);
  }

  public async insert(entity: PasswordRecoveryToken): Promise<void> {
    await this.prismaService.passwordRecoveryToken.create({
      data: PrismaPasswordRecoveryTokenMapper.toPrisma(entity),
    });

    DomainEvents.dispatchEventsForAggregate(entity.id);
  }

  public async delete(entity: PasswordRecoveryToken): Promise<void> {
    await this.prismaService.passwordRecoveryToken.delete({
      where: { id: entity.id.value },
    });
  }
}
