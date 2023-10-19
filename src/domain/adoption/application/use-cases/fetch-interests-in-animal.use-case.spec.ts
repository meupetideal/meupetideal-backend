import { InMemoryInterestsRepository } from 'test/repositories/in-memory-interests.repository';
import { InterestBuilder } from 'test/data-builders/interest.builder';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { FetchInterestsInAnimalUseCase } from './fetch-interests-in-animal.use-case';
import { AnimalNotFoundError } from './errors/animal-not-found.error';
import { UserNotOwnsTheAnimalError } from './errors/user-not-owns-the-animal.error';

describe('#UC21 FetchInterestsInAnimalUseCase', () => {
  let interestsRepository: InMemoryInterestsRepository;
  let animalsRepository: InMemoryAnimalsRepository;

  let sut: FetchInterestsInAnimalUseCase;

  beforeEach(() => {
    interestsRepository = new InMemoryInterestsRepository();
    animalsRepository = new InMemoryAnimalsRepository();

    sut = new FetchInterestsInAnimalUseCase(
      animalsRepository,
      interestsRepository,
    );
  });

  it('should fetch interests by animal', async () => {
    const spyFindById = vi.spyOn(animalsRepository, 'findById');
    const spyFindAllByAnimalId = vi.spyOn(
      interestsRepository,
      'findAllByAnimalId',
    );

    const ownerId = 'owner-id';
    const animalId = 'animal-id';

    const animal = DogBuilder.create()
      .withId(animalId)
      .withOwnerId(ownerId)
      .build();
    const interest = InterestBuilder.create().withAnimalId(animalId).build();
    animalsRepository.insert(animal);
    interestsRepository.insert(interest);

    const interestInAnotherAnimal = InterestBuilder.create().build();
    interestsRepository.insert(interestInAnotherAnimal);

    const output = await sut.execute({
      ownerId,
      animalId,
    });

    expect(output.interests).toHaveLength(1);
    expect(output.interests[0]).toEqual(interest);

    expect(spyFindById).toHaveBeenCalledWith(animalId);
    expect(spyFindAllByAnimalId).toHaveBeenCalledWith(animalId);
  });

  it('should throw AnimalNotFoundError when animal does not exist', async () => {
    await expect(
      sut.execute({
        ownerId: 'owner-id',
        animalId: 'animal-id',
      }),
    ).rejects.toThrowError(AnimalNotFoundError);
  });

  it('should throw UserNotOwnsTheAnimalError when user does not own the animal', async () => {
    const ownerId = 'owner-id';
    const animalId = 'animal-id';

    const animal = DogBuilder.create()
      .withId(animalId)
      .withOwnerId('another-owner-id')
      .build();
    animalsRepository.insert(animal);

    await expect(
      sut.execute({
        ownerId,
        animalId,
      }),
    ).rejects.toThrowError(UserNotOwnsTheAnimalError);
  });
});
