import { DomainEvents } from '@core/enterprise/domain-events';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { InterestsRepository } from '@domain/adoption/application/repositories/interests.repository';
import { Interest } from '@domain/adoption/enterprise/entities/interest';

export class InMemoryInterestsRepository implements InterestsRepository {
  items: Interest[] = [];

  public async findAllByAnimalId(animalId: string): Promise<Interest[]> {
    return this.items.filter((interest) =>
      interest.animalId.equals(UniqueEntityId.create(animalId)),
    );
  }

  public async findAllFromUserId(userId: string): Promise<Interest[]> {
    return this.items.filter((interest) =>
      interest.userId.equals(UniqueEntityId.create(userId)),
    );
  }

  public async findByAnimalIdAndUserId(
    animalId: string,
    userId: string,
  ): Promise<Interest | undefined> {
    return this.items.find(
      (interest) =>
        interest.animalId.equals(UniqueEntityId.create(animalId)) &&
        interest.userId.equals(UniqueEntityId.create(userId)),
    );
  }

  public async insert(entity: Interest): Promise<void> {
    this.items.push(entity);

    DomainEvents.dispatchEventsForAggregate(entity.id);
  }
}
