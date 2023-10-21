import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { CatBuilder } from 'test/data-builders/cat.builder';
import { UserBuilder } from 'test/data-builders/user.builder';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { MarkAnimalAsAdoptedUseCase } from './mark-animal-as-adopted.use-case';
import { AnimalNotFoundError } from './errors/animal-not-found.error';
import { UserNotOwnsTheAnimalError } from './errors/user-not-owns-the-animal.error';
import { AnimalsService } from '../services/animals.service';

describe('#UC15 MarkAnimalAsAdoptedUseCase', () => {
  let animalsRepository: InMemoryAnimalsRepository;
  let usersRepository: InMemoryUsersRepository;

  let animalsService: AnimalsService;

  let markAnimalAsAdoptedUseCase: MarkAnimalAsAdoptedUseCase;

  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository();
    usersRepository = new InMemoryUsersRepository();
    animalsService = new AnimalsService(animalsRepository);

    markAnimalAsAdoptedUseCase = new MarkAnimalAsAdoptedUseCase(
      animalsService,
      animalsRepository,
    );
  });

  it('should mark animal as adopted', async () => {
    const spyFindById = vi.spyOn(animalsRepository, 'findById');
    const spySave = vi.spyOn(animalsRepository, 'save');

    const ownerId = '8b18c6af-ecc7-487e-af99-2fbaa59edd6b';
    const animalId = '1e307039-a203-43f3-8033-a8a881f71def';

    const cat = DogBuilder.create()
      .withId(animalId)
      .withOwnerId(ownerId)
      .build();
    const owner = UserBuilder.create().withId(ownerId).build();
    await animalsRepository.insert(cat);
    await usersRepository.insert(owner);

    const output = await markAnimalAsAdoptedUseCase.execute({
      animalId,
      ownerId,
    });
    expect(output.animal).toBeInstanceOf(Dog);
    expect(output.animal.id).toEqual(cat.id);
    expect(output.animal.status.value).toEqual('adopted');

    expect(spyFindById).toHaveBeenCalledWith(animalId);
    expect(spySave).toHaveBeenCalledWith(cat);
  });

  it('should throw an error if animal is not found', async () => {
    const animalId = '1e307039-a203-43f3-8033-a8a881f71def';
    const ownerId = '8b18c6af-ecc7-487e-af99-2fbaa59edd6b';

    await expect(() =>
      markAnimalAsAdoptedUseCase.execute({
        animalId,
        ownerId,
      }),
    ).rejects.toThrowError(AnimalNotFoundError);
  });

  it('should throw an error if owner is not the same', async () => {
    const animalId = '1e307039-a203-43f3-8033-a8a881f71def';
    const ownerId = '8b18c6af-ecc7-487e-af99-2fbaa59edd6b';
    const anotherOwnerId = '0cbddfd4-2816-453b-8425-618d364e815e';

    const cat = CatBuilder.create()
      .withId(animalId)
      .withOwnerId(ownerId)
      .build();
    const owner = UserBuilder.create().withId(ownerId).build();
    await animalsRepository.insert(cat);
    await usersRepository.insert(owner);

    await expect(() =>
      markAnimalAsAdoptedUseCase.execute({
        animalId,
        ownerId: anotherOwnerId,
      }),
    ).rejects.toThrowError(UserNotOwnsTheAnimalError);
  });
});
