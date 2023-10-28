import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { AggregateRoot } from '@core/enterprise/aggregate-root';
import { UserValidatorFactory } from '../validators/user.validator';
import { UserCreatedEvent } from '../events/user-created.event';
import { CPF } from './value-objects/cpf.vo';
import { Email } from './value-objects/email.vo';
import { Birthday } from './value-objects/birthday.vo';
import { PhoneNumber } from './value-objects/phone-number.vo';

export interface UserProps {
  name: string;
  cpf: CPF;
  email: Email;
  hashedPassword: string;
  birthday: Birthday;
  phoneNumber: PhoneNumber;
  avatarUrl?: string;
}

export class User extends AggregateRoot<UserProps> {
  public static create(props: UserProps, id?: UniqueEntityId): User {
    this.validate(props);
    const user = new User({ ...props }, id);

    const isNew = !id;
    if (isNew) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return user;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get cpf(): CPF {
    return this.props.cpf;
  }

  set cpf(cpf: CPF) {
    this.props.cpf = cpf;
  }

  get email(): Email {
    return this.props.email;
  }

  set email(email: Email) {
    this.props.email = email;
  }

  get hashedPassword(): string {
    return this.props.hashedPassword;
  }

  set hashedPassword(hashedPassword: string) {
    this.props.hashedPassword = hashedPassword;
  }

  get birthday(): Birthday {
    return this.props.birthday;
  }

  set birthday(birthday: Birthday) {
    this.props.birthday = birthday;
  }

  get phoneNumber(): PhoneNumber {
    return this.props.phoneNumber;
  }

  set phoneNumber(phoneNumber: PhoneNumber) {
    this.props.phoneNumber = phoneNumber;
  }

  get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }

  set avatarUrl(avatarUrl: string | undefined) {
    this.props.avatarUrl = avatarUrl;
  }

  static validate(data: UserProps): void {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(data);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
