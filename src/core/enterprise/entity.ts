import { UniqueEntityId } from './unique-entity-id.vo';

export abstract class Entity<Props = unknown> {
  private _id: UniqueEntityId;

  private _createdAt: Date;

  private _updatedAt: Date;

  protected readonly props: Props;

  protected constructor(
    props: Props,
    id?: UniqueEntityId,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.props = props;
    this._id = id ?? UniqueEntityId.create();
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected _touch(): void {
    this._updatedAt = new Date();
  }

  public equals(entity: Entity<Props>): boolean {
    if (!(entity instanceof Entity)) {
      return false;
    }

    return entity.id.equals(this._id);
  }
}
