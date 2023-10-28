import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { User } from '@domain/accounts/enterprise/entities/user';
import { Birthday } from '@domain/accounts/enterprise/entities/value-objects/birthday.vo';
import { CPF } from '@domain/accounts/enterprise/entities/value-objects/cpf.vo';
import { Email } from '@domain/accounts/enterprise/entities/value-objects/email.vo';
import { PhoneNumber } from '@domain/accounts/enterprise/entities/value-objects/phone-number.vo';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        cpf: CPF.create(raw.cpf),
        email: Email.create(raw.email),
        hashedPassword: raw.hashedPassword,
        birthday: Birthday.create(raw.birthday),
        phoneNumber: PhoneNumber.create(raw.phoneNumber),
        avatarUrl: raw.avatarUrl ?? undefined,
      },
      UniqueEntityId.create(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.value,
      name: user.name,
      cpf: user.cpf.value,
      email: user.email.value,
      hashedPassword: user.hashedPassword,
      birthday: user.birthday.value,
      phoneNumber: user.phoneNumber.value,
      avatarUrl: user.avatarUrl ?? null,
    };
  }
}
