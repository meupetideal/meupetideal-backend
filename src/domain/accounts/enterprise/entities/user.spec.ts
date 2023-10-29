import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { User } from './user';
import { CPF } from './value-objects/cpf.vo';
import { Email } from './value-objects/email.vo';
import { Birthday } from './value-objects/birthday.vo';
import { PhoneNumber } from './value-objects/phone-number.vo';
import { Address } from './value-objects/address.vo';
import { Country } from './value-objects/country.vo';

describe('User Unit Tests', () => {
  test('constructor', () => {
    const spyValidate = vi.spyOn(User, 'validate');

    const address = Address.create({
      neighborhood: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'São Paulo',
      country: Country.create('br'),
    });

    const user = User.create({
      name: 'John Doe',
      cpf: CPF.create('02154401023'),
      email: Email.create('johndoe@example.com'),
      birthday: Birthday.create(new Date(1960, 7, 26)),
      hashedPassword:
        '$2a$08$ekAjnR5DXK.tHjvgtkZpk.ZaPtRQK6VwnjL.Y3YQWtvKHxbhY6UaW',
      phoneNumber: PhoneNumber.create('94997793802'),
      address,
    });

    expect(user).toBeDefined();
    expect(user.id).toBeInstanceOf(UniqueEntityId);
    expect(user.name).toBe('John Doe');
    expect(user.cpf.value).toBe('02154401023');
    expect(user.email.value).toBe('johndoe@example.com');
    expect(user.birthday.value).toEqual(new Date(1960, 7, 26));
    expect(user.hashedPassword).toBe(
      '$2a$08$ekAjnR5DXK.tHjvgtkZpk.ZaPtRQK6VwnjL.Y3YQWtvKHxbhY6UaW',
    );
    expect(user.phoneNumber.value).toBe('94997793802');
    expect(spyValidate).toHaveBeenCalledOnce();
  });

  test('validate', () => {
    expect(() => User.validate({} as any)).toThrowError(EntityValidationError);
  });

  describe('getters and setters', () => {
    let spyValidate: SpyInstance;

    beforeAll(() => {
      spyValidate = vi.spyOn(User, 'validate').mockImplementation(() => true);
    });

    test('name getter and setter', () => {
      const user = User.create({ name: 'John Doe' } as any);
      expect(user.name).toBe('John Doe');

      user.name = 'Jane Doe';
      expect(user.name).toBe('Jane Doe');

      expect(spyValidate).toHaveBeenCalled();
    });

    test('cpf getter and setter', () => {
      const user = User.create({ cpf: CPF.create('02154401023') } as any);
      expect(user.cpf.value).toBe('02154401023');

      user.cpf = CPF.create('41389124959');
      expect(user.cpf.value).toBe('41389124959');

      expect(spyValidate).toHaveBeenCalled();
    });

    test('email getter and setter', () => {
      const user = User.create({
        email: Email.create('johndoe@example.com'),
      } as any);
      expect(user.email.value).toBe('johndoe@example.com');

      user.email = Email.create('janedoe@example.com');
      expect(user.email.value).toBe('janedoe@example.com');

      expect(spyValidate).toHaveBeenCalled();
    });

    test('hashedPassword getter and setter', () => {
      const user = User.create({
        hashedPassword: 'some-hashed-password',
      } as any);
      expect(user.hashedPassword).toBe('some-hashed-password');

      user.hashedPassword = 'another-hashed-password';
      expect(user.hashedPassword).toBe('another-hashed-password');

      expect(spyValidate).toHaveBeenCalled();
    });

    test('birthday getter and setter', () => {
      const user = User.create({
        birthday: Birthday.create(new Date(1960, 7, 26)),
      } as any);
      expect(user.birthday.value).toEqual(new Date(1960, 7, 26));

      user.birthday = Birthday.create(new Date(1960, 7, 27));
      expect(user.birthday.value).toEqual(new Date(1960, 7, 27));

      expect(spyValidate).toHaveBeenCalled();
    });

    test('phoneNumber getter and setter', () => {
      const user = User.create({
        phoneNumber: PhoneNumber.create('94997793802'),
      } as any);
      expect(user.phoneNumber.value).toBe('94997793802');

      user.phoneNumber = PhoneNumber.create('94997793803');
      expect(user.phoneNumber.value).toBe('94997793803');

      expect(spyValidate).toHaveBeenCalled();
    });

    test('avatarUrl getter and setter', () => {
      const user = User.create({ avatarUrl: 'firstAvatarUrl.png' } as any);
      expect(user.avatarUrl).toBe('firstAvatarUrl.png');

      user.avatarUrl = 'secondAvatarUrl.png';
      expect(user.avatarUrl).toBe('secondAvatarUrl.png');

      expect(spyValidate).toHaveBeenCalled();
    });
  });
});
