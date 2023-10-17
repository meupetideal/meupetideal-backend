import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Interest } from '@domain/adoption/enterprise/entities/interest';

export class InterestBuilder {
  private id: string | undefined;

  private animalId: string | undefined;

  private userId: string | undefined;

  private expressedAt: Date | undefined;

  private constructor() {}

  public static create(): InterestBuilder {
    return new InterestBuilder();
  }

  public withId(id: string): InterestBuilder {
    this.id = id;
    return this;
  }

  public withAnimalId(animalId: string): InterestBuilder {
    this.animalId = animalId;
    return this;
  }

  public withUserId(userId: string): InterestBuilder {
    this.userId = userId;
    return this;
  }

  public withExpressedAt(expressedAt: Date): InterestBuilder {
    this.expressedAt = expressedAt;
    return this;
  }

  public build(): Interest {
    return Interest.create(
      {
        animalId: UniqueEntityId.create(this.animalId),
        userId: UniqueEntityId.create(this.userId),
        expressedAt: this.expressedAt,
      },
      UniqueEntityId.create(this.id),
    );
  }
}
