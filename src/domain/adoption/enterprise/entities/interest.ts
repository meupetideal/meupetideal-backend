import { Entity } from '@core/enterprise/entity';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { PickOut } from '@core/enterprise/logic/pick-out';
import { InterestValidatorFactory } from '../validators/interest.validator';

interface InterestProps {
  animalId: UniqueEntityId;
  userId: UniqueEntityId;
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
    return new Interest(propsWithExpressedAt, id);
  }

  get animalId(): UniqueEntityId {
    return this.props.animalId;
  }

  set animalId(animalId: UniqueEntityId) {
    this.props.animalId = animalId;
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
