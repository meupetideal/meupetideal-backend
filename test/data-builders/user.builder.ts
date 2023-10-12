import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { User } from '@domain/accounts/enterprise/entities/user';

export class UserBuilder {
  private id: string | undefined;

  private name: string = 'John Doe';

  private cpf: string = '42167471246';

  private email: string = 'john.doe@example.com';

  private hashedPassword: string = 'password-hashed';

  private birthday: Date = new Date('1990-08-23');

  private phoneNumber: string = '+5595998615483';

  private constructor() {}

  public static create(): UserBuilder {
    return new UserBuilder();
  }

  public withId(id: string): UserBuilder {
    this.id = id;
    return this;
  }

  public withName(name: string): UserBuilder {
    this.name = name;
    return this;
  }

  public withCpf(cpf: string): UserBuilder {
    this.cpf = cpf;
    return this;
  }

  public withEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  public withHashedPassword(hashedPassword: string): UserBuilder {
    this.hashedPassword = hashedPassword;
    return this;
  }

  public withBirthday(birthday: Date): UserBuilder {
    this.birthday = birthday;
    return this;
  }

  public withPhoneNumber(phoneNumber: string): UserBuilder {
    this.phoneNumber = phoneNumber;
    return this;
  }

  public build(): User {
    return User.create(
      {
        name: this.name,
        cpf: this.cpf,
        email: this.email,
        hashedPassword: this.hashedPassword,
        birthday: this.birthday,
        phoneNumber: this.phoneNumber,
      },
      UniqueEntityId.create(this.id),
    );
  }
}
