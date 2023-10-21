import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { CatBuilder } from 'test/data-builders/cat.builder';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { ShowAnimalDetailsUseCase } from './show-animal-details.use-case';
import { AnimalNotFoundError } from './errors/animal-not-found.error';
import { AnimalsService } from '../services/animals.service';

describe('#UC22 ShowAnimalDetailsUseCase', () => {
  let animalsRepository: InMemoryAnimalsRepository;

  let animalsService: AnimalsService;

  let showAnimalDetailsUseCase: ShowAnimalDetailsUseCase;

  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository();

    animalsService = new AnimalsService(animalsRepository);

    showAnimalDetailsUseCase = new ShowAnimalDetailsUseCase(animalsService);
  });

  it('should show animal details', async () => {
    const cat = CatBuilder.create().build();
    await animalsRepository.insert(cat);

    const catOutput = await showAnimalDetailsUseCase.execute({
      animalId: cat.id.toString(),
    });
    expect(catOutput.animal).toBeInstanceOf(Cat);
    expect(catOutput.animal.id).toEqual(cat.id);

    const dog = DogBuilder.create().build();
    await animalsRepository.insert(dog);

    const dogOutput = await showAnimalDetailsUseCase.execute({
      animalId: dog.id.toString(),
    });
    expect(dogOutput.animal).toBeInstanceOf(Dog);
    expect(dogOutput.animal.id).toEqual(dog.id);
  });

  it('should throw an error if animal is not found', async () => {
    await expect(() =>
      showAnimalDetailsUseCase.execute({
        animalId: '1e307039-a203-43f3-8033-a8a881f71def',
      }),
    ).rejects.toThrowError(AnimalNotFoundError);
  });
});
