import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { RefreshToken } from '@domain/accounts/enterprise/entities/refresh-token';
import { Prisma, RefreshToken as PrismaRefreshToken } from '@prisma/client';

export class PrismaRefreshTokenMapper {
  static toDomain(raw: PrismaRefreshToken): RefreshToken {
    return RefreshToken.create(
      {
        token: UniqueEntityId.create(raw.token),
        userId: UniqueEntityId.create(raw.userId),
        expiresAt: raw.expiresAt ?? undefined,
      },
      UniqueEntityId.create(raw.id),
    );
  }

  static toPrisma(
    refreshToken: RefreshToken,
  ): Prisma.RefreshTokenUncheckedCreateInput {
    return {
      id: refreshToken.id.value,
      token: refreshToken.token.value,
      userId: refreshToken.userId.value,
      expiresAt: refreshToken.expiresAt,
    };
  }
}
