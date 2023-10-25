import { UseCase } from '@core/application/use-case';
import { Report } from '@domain/adoption/enterprise/entities/report';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { inject, injectable } from 'tsyringe';
import { AnimalsService } from '../services/animals.service';

type Input = {
  reporterId: string;
  animalId: string;
  reason: string;
};

type Output = void;

@injectable()
export class ReportIrregularAnimalUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('AnimalsService')
    private animalsService: AnimalsService,
  ) {}

  public async execute({
    reporterId,
    animalId,
    reason,
  }: Input): Promise<Output> {
    const animal = await this.animalsService.getAnimal(animalId);

    Report.create({
      reporterId: UniqueEntityId.create(reporterId),
      accusedOwnerId: animal.ownerId,
      animalId: animal.id,
      reason,
    });
  }
}
