import { inject, injectable } from 'tsyringe';

import { UseCase } from '@core/application/use-case';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { AnimalsRepository } from '../repositories/animals.repository';

type Input = {
  ownerId: string;
};

type Output = {
  animals: (Dog | Cat)[];
};

@injectable()
export class FetchOwnerAnimalsUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: AnimalsRepository,
  ) {}

  public async execute({ ownerId }: Input): Promise<Output> {
    const animals = await this.animalsRepository.findManyByOwnerId(ownerId);

    return { animals };
  }
}
