import { RefreshTokensRepository } from '@domain/accounts/application/repositories/refresh-tokens.repository';
import { RefreshToken } from '@domain/accounts/enterprise/entities/refresh-token';
import { inject, injectable } from 'tsyringe';
import { PrismaService } from '../prisma.service';
import { PrismaRefreshTokenMapper } from '../mappers/prisma-refresh-token.mapper';

@injectable()
export class PrismaRefreshTokensRepository implements RefreshTokensRepository {
  constructor(
    @inject('PrismaService')
    private prismaService: PrismaService,
  ) {}

  public async findByTokenId(
    tokenId: string,
  ): Promise<RefreshToken | undefined> {
    const refreshToken = await this.prismaService.refreshToken.findUnique({
      where: { token: tokenId },
    });

    if (!refreshToken) {
      return undefined;
    }

    return PrismaRefreshTokenMapper.toDomain(refreshToken);
  }

  public async insert(entity: RefreshToken): Promise<void> {
    await this.prismaService.refreshToken.create({
      data: PrismaRefreshTokenMapper.toPrisma(entity),
    });
  }

  public async delete(entity: RefreshToken): Promise<void> {
    await this.prismaService.refreshToken.delete({
      where: { token: entity.token.value },
    });
  }
}
