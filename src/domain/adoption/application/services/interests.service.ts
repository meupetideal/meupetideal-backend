import { Service } from '@core/application/service';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { InterestsRepository } from '../repositories/interests.repository';

interface RegisterInterestInput {
  animalId: string;
  userId: string;
}

export class InterestsService implements Service {
  constructor(private interestsRepository: InterestsRepository) {}

  public async getInterest(animalId: string, userId: string) {
    const interest = await this.interestsRepository.findByAnimalIdAndUserId(
      animalId,
      userId,
    );

    return interest;
  }

  public async register({ animalId, userId }: RegisterInterestInput) {
    const interest = Interest.create({
      animalId: UniqueEntityId.create(animalId),
      userId: UniqueEntityId.create(userId),
    });

    await this.interestsRepository.insert(interest);

    return interest;
  }
}
