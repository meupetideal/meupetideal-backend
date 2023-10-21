import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { CatBuilder } from 'test/data-builders/cat.builder';
import { UserBuilder } from 'test/data-builders/user.builder';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { UpdateAnimalDetailsUseCase } from './update-animal-details.use-case';
import { AnimalNotFoundError } from './errors/animal-not-found.error';
import { UserNotOwnsTheAnimalError } from './errors/user-not-owns-the-animal.error';
import { AnimalsService } from '../services/animals.service';

describe('#UC14 UpdateAnimalDetailsUseCase', () => {
  let animalsRepository: InMemoryAnimalsRepository;
  let usersRepository: InMemoryUsersRepository;

  let animalsService: AnimalsService;

  let updateAnimalDetailsUseCase: UpdateAnimalDetailsUseCase;

  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository();
    usersRepository = new InMemoryUsersRepository();

    animalsService = new AnimalsService(animalsRepository);

    updateAnimalDetailsUseCase = new UpdateAnimalDetailsUseCase(
      animalsService,
      animalsRepository,
    );
  });

  it('should update animal details', async () => {
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

    const output = await updateAnimalDetailsUseCase.execute({
      animalId,
      ownerId,
      name: 'Another name',
      gender: 'male',
      approximateAge: 4,
      approximateWeight: 6,
      size: 'medium',
      temperaments: ['aggressive'],
      coatColors: ['orange'],
      isVaccinated: false,
      isDewormed: false,
      isNeutered: true,
      isSpecialNeeds: true,
      breed: 'rottweiler',
    });
    expect(output.animal).toBeInstanceOf(Dog);
    expect(output.animal.id).toEqual(cat.id);
    expect(output.animal.name).toEqual('Another name');
    expect(output.animal.gender.value).toEqual('male');
    expect(output.animal.approximateAge).toBe(4);
    expect(output.animal.approximateWeight).toBe(6);
    expect(output.animal.size.value).toEqual('medium');
    expect(output.animal.temperaments[0].value).toEqual('aggressive');
    expect(output.animal.coatColors[0].value).toEqual('orange');
    expect(output.animal.isVaccinated).toBe(false);
    expect(output.animal.isDewormed).toBe(false);
    expect(output.animal.isNeutered).toBe(true);
    expect(output.animal.isSpecialNeeds).toBe(true);
    expect(output.animal.breed.value).toEqual('rottweiler');

    expect(spyFindById).toHaveBeenCalledWith(animalId);
    expect(spySave).toHaveBeenCalledWith(cat);
  });

  it('should throw an error if animal is not found', async () => {
    const animalId = '1e307039-a203-43f3-8033-a8a881f71def';
    const ownerId = '8b18c6af-ecc7-487e-af99-2fbaa59edd6b';

    await expect(() =>
      updateAnimalDetailsUseCase.execute({
        animalId,
        ownerId,
        name: 'Another name',
        gender: 'male',
        approximateAge: 4,
        approximateWeight: 6,
        size: 'medium',
        temperaments: ['aggresive'],
        coatColors: ['orange'],
        isVaccinated: false,
        isDewormed: false,
        isNeutered: true,
        isSpecialNeeds: true,
        breed: 'rottweiler',
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
      updateAnimalDetailsUseCase.execute({
        animalId,
        ownerId: anotherOwnerId,
        name: 'Another name',
        gender: 'male',
        approximateAge: 4,
        approximateWeight: 6,
        size: 'medium',
        temperaments: ['aggresive'],
        coatColors: ['orange'],
        isVaccinated: false,
        isDewormed: false,
        isNeutered: true,
        isSpecialNeeds: true,
        breed: 'rottweiler',
      }),
    ).rejects.toThrowError(UserNotOwnsTheAnimalError);
  });
});
