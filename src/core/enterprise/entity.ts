import { UniqueEntityId } from './unique-entity-id.vo';

export abstract class Entity<Props = unknown> {
  private _id: UniqueEntityId;

  protected readonly props: Props;

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? UniqueEntityId.create();
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  public equals(entity: Entity<Props>): boolean {
    if (!(entity instanceof Entity)) {
      return false;
    }

    return entity.id.equals(this._id);
  }
}
