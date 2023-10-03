import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { User, UserProps } from '@domain/accounts/enterprise/entities/user';
import { faker } from '@faker-js/faker';

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      cpf: '43730412965',
      email: faker.internet.email(),
      hashedPassword: faker.internet.password(),
      birthday: faker.date.past({ refDate: new Date(2003, 0, 1) }),
      phoneNumber: '+5583929591632',
      ...override,
    },
    id,
  );

  return user;
}
