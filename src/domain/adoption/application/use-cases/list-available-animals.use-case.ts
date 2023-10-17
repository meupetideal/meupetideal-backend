import { UseCase } from '@core/application/use-case';
import { Animal } from '@domain/adoption/enterprise/entities/animal';
import { SearchOutput } from '@core/application/pagination';
import { AnimalsRepository } from '../repositories/animals.repository';

type Input = {
  page: number;
  perPage: number;
};

type Output = SearchOutput<Animal>;

export class ListAvailableAnimalsUseCase implements UseCase<Input, Output> {
  constructor(private animalsRepository: AnimalsRepository) {}

  public async execute({ page, perPage }: Input): Promise<Output> {
    const output = await this.animalsRepository.search({
      page,
      perPage,
    });

    return output;
  }
}
