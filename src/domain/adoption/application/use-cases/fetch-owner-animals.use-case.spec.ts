import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { CatBuilder } from 'test/data-builders/cat.builder';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { InMemoryAnimalPhotosRepository } from 'test/repositories/in-memory-animal-photos.repository';
import { FetchOwnerAnimalsUseCase } from './fetch-owner-animals.use-case';

describe('#UC19 FetchOwnerAnimalsUseCase', () => {
  let animalsRepository: InMemoryAnimalsRepository;
  let animalPhotosRepository: InMemoryAnimalPhotosRepository;

  let fetchOwnerAnimalsUseCase: FetchOwnerAnimalsUseCase;

  beforeEach(() => {
    animalPhotosRepository = new InMemoryAnimalPhotosRepository();
    animalsRepository = new InMemoryAnimalsRepository(animalPhotosRepository);

    fetchOwnerAnimalsUseCase = new FetchOwnerAnimalsUseCase(animalsRepository);
  });

  it('should fetch available animals', async () => {
    const spyFindManyByOwnerId = vi.spyOn(
      animalsRepository,
      'findManyByOwnerId',
    );

    const ownerId = 'owner-id';

    const cat = CatBuilder.create().withOwnerId(ownerId).build();
    await animalsRepository.insert(cat);
    const dog = DogBuilder.create().withOwnerId(ownerId).build();
    await animalsRepository.insert(dog);
    const anotherDog = DogBuilder.create().build();
    await animalsRepository.insert(anotherDog);

    const output = await fetchOwnerAnimalsUseCase.execute({
      ownerId,
    });

    expect(output.animals).toHaveLength(2);
    expect(output.animals[0]).toBeInstanceOf(Cat);
    expect(output.animals[1]).toBeInstanceOf(Dog);

    expect(spyFindManyByOwnerId).toHaveBeenCalledWith(ownerId);
  });
});
