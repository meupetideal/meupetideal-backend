import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { User } from '@domain/accounts/enterprise/entities/user';
import { Address } from '@domain/accounts/enterprise/entities/value-objects/address.vo';
import { Birthday } from '@domain/accounts/enterprise/entities/value-objects/birthday.vo';
import { Country } from '@domain/accounts/enterprise/entities/value-objects/country.vo';
import { CPF } from '@domain/accounts/enterprise/entities/value-objects/cpf.vo';
import { Email } from '@domain/accounts/enterprise/entities/value-objects/email.vo';
import { PhoneNumber } from '@domain/accounts/enterprise/entities/value-objects/phone-number.vo';
import {
  Prisma,
  User as PrismaUser,
  Address as PrismaAddress,
} from '@prisma/client';

type PrismaUserWithAddress = PrismaUser & {
  address: PrismaAddress | null;
};

export class PrismaUserMapper {
  static toDomain(raw: PrismaUserWithAddress): User {
    if (!raw.address) {
      throw new Error('User without address');
    }

    return User.create(
      {
        name: raw.name,
        cpf: CPF.create(raw.cpf),
        email: Email.create(raw.email),
        hashedPassword: raw.hashedPassword,
        birthday: Birthday.create(raw.birthday),
        phoneNumber: PhoneNumber.create(raw.phoneNumber),
        avatarUrl: raw.avatarUrl ?? undefined,
        address: Address.create({
          neighborhood: raw.address.neighborhood,
          city: raw.address.city,
          state: raw.address.state,
          country: Country.create(raw.address.country),
        }),
      },
      UniqueEntityId.create(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    const address = user.address.value;

    return {
      id: user.id.value,
      name: user.name,
      cpf: user.cpf.value,
      email: user.email.value,
      hashedPassword: user.hashedPassword,
      birthday: user.birthday.value,
      phoneNumber: user.phoneNumber.value,
      avatarUrl: user.avatarUrl ?? null,
      address: {
        create: {
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          country: address.country.value,
        },
      },
    };
  }

  static toPrismaUpdate(user: User): Prisma.UserUncheckedUpdateInput {
    const address = user.address.value;

    return {
      name: user.name,
      cpf: user.cpf.value,
      email: user.email.value,
      hashedPassword: user.hashedPassword,
      birthday: user.birthday.value,
      phoneNumber: user.phoneNumber.value,
      avatarUrl: user.avatarUrl ?? null,
      address: {
        update: {
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          country: address.country.value,
        },
      },
    };
  }
}
