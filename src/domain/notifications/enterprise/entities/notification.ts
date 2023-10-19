import { Entity } from '@core/enterprise/entity';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { PickOut } from '@core/enterprise/logic/pick-out';
import { NotificationValidatorFactory } from '../validators/notification.validator';

interface NotificationProps {
  recipientId: UniqueEntityId;
  title: string;
  redirectToUrl: string;
  sentAt: Date;
  readedAt: Date | null;
}

export class Notification extends Entity<NotificationProps> {
  static create(
    props: PickOut<NotificationProps, 'sentAt' | 'readedAt'>,
    id?: UniqueEntityId,
  ): Notification {
    const sentAt = props.sentAt ?? new Date();
    const readedAt = props.readedAt ?? null;
    const propsWithDefaults = {
      ...props,
      sentAt,
      readedAt,
    };
    Notification.validate(propsWithDefaults);
    return new Notification(propsWithDefaults, id);
  }

  get recipientId(): UniqueEntityId {
    return this.props.recipientId;
  }

  set recipientId(recipientId: UniqueEntityId) {
    this._touch();
    this.props.recipientId = recipientId;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this._touch();
    this.props.title = title;
  }

  get redirectToUrl(): string {
    return this.props.redirectToUrl;
  }

  set redirectToUrl(redirectToUrl: string) {
    this._touch();
    this.props.redirectToUrl = redirectToUrl;
  }

  get sentAt(): Date {
    return this.props.sentAt;
  }

  get readedAt(): Date | null {
    return this.props.readedAt;
  }

  static validate(data: NotificationProps): void {
    const validator = NotificationValidatorFactory.create();
    const isValid = validator.validate(data);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  private _touch(): void {
    Notification.validate(this.props);
  }

  public markAsRead(): void {
    this.props.readedAt = new Date();
  }
}
