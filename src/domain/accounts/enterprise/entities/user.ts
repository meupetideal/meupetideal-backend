import { Entity } from '@core/enterprise/entity';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';

interface UserProps {
  name: string;
  cpf: string;
  email: string;
  hashedPassword: string;
  birthday: Date;
  phoneNumber: string;
}

export class User extends Entity<UserProps> {
  public static create(props: UserProps, id?: UniqueEntityId): User {
    return new User({ ...props }, id);
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get hashedPassword(): string {
    return this.props.hashedPassword;
  }

  set hashedPassword(hashedPassword: string) {
    this.props.hashedPassword = hashedPassword;
  }

  get birthday(): Date {
    return this.props.birthday;
  }

  set birthday(birthday: Date) {
    this.props.birthday = birthday;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
  }
}
