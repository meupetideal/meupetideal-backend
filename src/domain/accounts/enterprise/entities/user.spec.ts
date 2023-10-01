import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { User } from './user';

describe('User Unit Tests', () => {
  test('constructor', () => {
    const user = User.create({
      name: 'John Doe',
      cpf: '02154401023',
      email: 'johndoe@example.com',
      birthday: new Date(1960, 7, 26),
      hashedPassword:
        '$2a$08$ekAjnR5DXK.tHjvgtkZpk.ZaPtRQK6VwnjL.Y3YQWtvKHxbhY6UaW',
      phoneNumber: '+5594997793802',
    });

    expect(user).toBeDefined();
    expect(user.id).toBeInstanceOf(UniqueEntityId);
    expect(user.name).toBe('John Doe');
    expect(user.cpf).toBe('02154401023');
    expect(user.email).toBe('johndoe@example.com');
    expect(user.birthday).toEqual(new Date(1960, 7, 26));
    expect(user.hashedPassword).toBe(
      '$2a$08$ekAjnR5DXK.tHjvgtkZpk.ZaPtRQK6VwnjL.Y3YQWtvKHxbhY6UaW',
    );
    expect(user.phoneNumber).toBe('+5594997793802');
  });

  test('name getter and setter', () => {
    const user = User.create({ name: 'John Doe' } as any);
    expect(user.name).toBe('John Doe');

    user.name = 'Jane Doe';
    expect(user.name).toBe('Jane Doe');
  });

  test('cpf getter and setter', () => {
    const user = User.create({ cpf: '02154401023' } as any);
    expect(user.cpf).toBe('02154401023');

    user.cpf = '41389124959';
    expect(user.cpf).toBe('41389124959');
  });

  test('email getter and setter', () => {
    const user = User.create({ email: 'johndoe@example.com' } as any);
    expect(user.email).toBe('johndoe@example.com');

    user.email = 'janedoe@example.com';
    expect(user.email).toBe('janedoe@example.com');
  });

  test('hashedPassword getter and setter', () => {
    const user = User.create({ hashedPassword: 'some-hashed-password' } as any);
    expect(user.hashedPassword).toBe('some-hashed-password');

    user.hashedPassword = 'another-hashed-password';
    expect(user.hashedPassword).toBe('another-hashed-password');
  });

  test('birthday getter and setter', () => {
    const user = User.create({ birthday: new Date(1960, 7, 26) } as any);
    expect(user.birthday).toEqual(new Date(1960, 7, 26));

    user.birthday = new Date(1960, 7, 27);
    expect(user.birthday).toEqual(new Date(1960, 7, 27));
  });

  test('phoneNumber getter and setter', () => {
    const user = User.create({ phoneNumber: '+5594997793802' } as any);
    expect(user.phoneNumber).toBe('+5594997793802');

    user.phoneNumber = '+5594997793803';
    expect(user.phoneNumber).toBe('+5594997793803');
  });
});
