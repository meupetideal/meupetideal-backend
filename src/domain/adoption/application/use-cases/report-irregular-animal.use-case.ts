import { UseCase } from '@core/application/use-case';
import { Report } from '@domain/adoption/enterprise/entities/report';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { AnimalsRepository } from '../repositories/animals.repository';
import { AnimalNotFoundError } from './errors/animal-not-found.error';

type Input = {
  reporterId: string;
  animalId: string;
  reason: string;
};

type Output = void;

export class ReportIrregularAnimalUseCase implements UseCase<Input, Output> {
  constructor(private animalsRepository: AnimalsRepository) {}

  public async execute({
    reporterId,
    animalId,
    reason,
  }: Input): Promise<Output> {
    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) {
      throw new AnimalNotFoundError(animalId);
    }

    Report.create({
      reporterId: UniqueEntityId.create(reporterId),
      accusedOwnerId: animal.ownerId,
      animalId: animal.id,
      reason,
    });
  }
}
