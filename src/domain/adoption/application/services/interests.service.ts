import { Service } from '@core/application/service';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { inject, injectable } from 'tsyringe';
import { InterestsRepository } from '../repositories/interests.repository';

interface RegisterInterestInput {
  animalId: string;
  userId: string;
}

@injectable()
export class InterestsService implements Service {
  constructor(
    @inject('InterestsRepository')
    private interestsRepository: InterestsRepository,
  ) {}

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
