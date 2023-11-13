import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { PickOut } from '@core/enterprise/logic/pick-out';
import { Entity } from '@core/enterprise/entity';
import { InterestValidatorFactory } from '../validators/interest.validator';
import { InterestDemonstratedEvent } from '../events/interest-demonstrated.event';
import { Animal } from './animal';

interface InterestProps {
  animalId: UniqueEntityId;
  userId: UniqueEntityId;
  animal?: Animal;
  expressedAt: Date;
}

export class Interest extends Entity<InterestProps> {
  static create(
    props: PickOut<InterestProps, 'expressedAt'>,
    id?: UniqueEntityId,
  ): Interest {
    const expressedAt = props.expressedAt ?? new Date();
    const propsWithExpressedAt = {
      ...props,
      expressedAt,
    };

    Interest.validate(propsWithExpressedAt);

    const interest = new Interest(propsWithExpressedAt, id);

    const isNew = !id;
    if (isNew) {
      interest.addDomainEvent(new InterestDemonstratedEvent(interest));
    }

    return interest;
  }

  get animalId(): UniqueEntityId {
    return this.props.animalId;
  }

  set animalId(animalId: UniqueEntityId) {
    this.props.animalId = animalId;
    this._touch();
  }

  get animal(): Animal | undefined {
    return this.props.animal;
  }

  set animal(animal: Animal | undefined) {
    this.props.animal = animal;
    this._touch();
  }

  get userId(): UniqueEntityId {
    return this.props.userId;
  }

  set userId(userId: UniqueEntityId) {
    this.props.userId = userId;
    this._touch();
  }

  get expressedAt(): Date {
    return this.props.expressedAt;
  }

  set expressedAt(expressedAt: Date) {
    this.props.expressedAt = expressedAt;
    this._touch();
  }

  static validate(data: InterestProps): void {
    const validator = InterestValidatorFactory.create();
    const isValid = validator.validate(data);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  private _touch(): void {
    Interest.validate(this.props);
  }
}
