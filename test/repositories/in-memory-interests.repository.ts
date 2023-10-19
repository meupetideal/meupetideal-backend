import { DomainEvents } from '@core/enterprise/domain-events';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { InterestsRepository } from '@domain/adoption/application/repositories/interests.repository';
import { Interest } from '@domain/adoption/enterprise/entities/interest';

export class InMemoryInterestsRepository implements InterestsRepository {
  items: Interest[] = [];

  public findByAnimalIdAndUserId(
    animalId: string,
    userId: string,
  ): Promise<Interest | undefined> {
    return Promise.resolve(
      this.items.find(
        (interest) =>
          interest.animalId.equals(UniqueEntityId.create(animalId)) &&
          interest.userId.equals(UniqueEntityId.create(userId)),
      ),
    );
  }

  public async insert(entity: Interest): Promise<void> {
    this.items.push(entity);

    DomainEvents.dispatchEventsForAggregate(entity.id);
  }
}
