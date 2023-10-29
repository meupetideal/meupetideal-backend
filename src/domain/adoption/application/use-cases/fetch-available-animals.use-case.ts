import { UseCase } from '@core/application/use-case';
import { SearchOutput } from '@core/application/pagination';
import { inject, injectable } from 'tsyringe';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { AnimalsRepository } from '../repositories/animals.repository';

type Input = {
  page: number;
  perPage: number;
  filters?: {
    age?: {
      min?: number;
      max?: number;
    };
    weight?: {
      min?: number;
      max?: number;
    };
    gender?: string;
    species?: string;
    sizes?: string[];
    breeds?: string[];
    coatColors?: string[];
    temperaments?: string[];
  };
};

type Output = SearchOutput<Dog | Cat>;

@injectable()
export class FetchAvailableAnimalsUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: AnimalsRepository,
  ) {}

  public async execute({ page, perPage, filters }: Input): Promise<Output> {
    const output = await this.animalsRepository.search({
      page,
      perPage,
      filters,
    });

    return output;
  }
}
