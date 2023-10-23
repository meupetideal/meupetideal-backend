import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { User } from '@domain/accounts/enterprise/entities/user';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        email: raw.email,
        hashedPassword: raw.hashedPassword,
        birthday: raw.birthday,
        phoneNumber: raw.phoneNumber,
        avatarUrl: raw.avatarUrl ?? undefined,
      },
      UniqueEntityId.create(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.value,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      hashedPassword: user.hashedPassword,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl ?? null,
    };
  }
}
