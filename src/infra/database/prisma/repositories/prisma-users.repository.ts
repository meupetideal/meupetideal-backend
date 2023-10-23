import { UsersRepository } from '@domain/accounts/application/repositories/users.repository';
import { User } from '@domain/accounts/enterprise/entities/user';
import { inject, injectable } from 'tsyringe';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';

@injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    @inject('PrismaService')
    private prismaService: PrismaService,
  ) {}

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return undefined;
    }

    return PrismaUserMapper.toDomain(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      return undefined;
    }

    return PrismaUserMapper.toDomain(user);
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.prismaService.user.findUnique({ where: { cpf } });

    if (!user) {
      return undefined;
    }

    return PrismaUserMapper.toDomain(user);
  }

  public async insert(entity: User): Promise<void> {
    await this.prismaService.user.create({
      data: PrismaUserMapper.toPrisma(entity),
    });
  }

  public async save(entity: User): Promise<void> {
    await this.prismaService.user.update({
      where: { id: entity.id.value },
      data: PrismaUserMapper.toPrisma(entity),
    });
  }
}
