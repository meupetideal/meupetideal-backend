import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';
import {
  Prisma,
  PasswordRecoveryToken as PrismaPasswordRecoveryToken,
} from '@prisma/client';

export class PrismaPasswordRecoveryTokenMapper {
  static toDomain(raw: PrismaPasswordRecoveryToken): PasswordRecoveryToken {
    return PasswordRecoveryToken.create(
      {
        token: UniqueEntityId.create(raw.token),
        userId: UniqueEntityId.create(raw.userId),
        expiresAt: raw.expiresAt ?? undefined,
      },
      UniqueEntityId.create(raw.id),
    );
  }

  static toPrisma(
    passwordRecoveryToken: PasswordRecoveryToken,
  ): Prisma.PasswordRecoveryTokenUncheckedCreateInput {
    return {
      id: passwordRecoveryToken.id.value,
      token: passwordRecoveryToken.token.value,
      userId: passwordRecoveryToken.userId.value,
      expiresAt: passwordRecoveryToken.expiresAt,
    };
  }
}
