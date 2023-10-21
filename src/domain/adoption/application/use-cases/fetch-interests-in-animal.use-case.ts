import { UseCase } from '@core/application/use-case';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { InterestsRepository } from '../repositories/interests.repository';
import { AnimalsService } from '../services/animals.service';

type Input = {
  ownerId: string;
  animalId: string;
};

type Output = {
  interests: Interest[];
};

export class FetchInterestsInAnimalUseCase implements UseCase<Input, Output> {
  constructor(
    private animalsService: AnimalsService,
    private interestsRepository: InterestsRepository,
  ) {}

  public async execute({ ownerId, animalId }: Input): Promise<Output> {
    const animal = await this.animalsService.getOwnerAnimal(animalId, ownerId);

    const interests = await this.interestsRepository.findAllByAnimalId(
      animal.id.value,
    );

    return { interests };
  }
}
