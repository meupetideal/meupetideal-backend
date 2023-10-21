import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { InMemoryInterestsRepository } from 'test/repositories/in-memory-interests.repository';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { InterestBuilder } from 'test/data-builders/interest.builder';
import { UserBuilder } from 'test/data-builders/user.builder';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { DemonstrateInterestInAnimalUseCase } from './demonstrate-interest-in-animal.use-case';
import { AnimalNotFoundError } from './errors/animal-not-found.error';
import { AnimalIsUnavailableError } from './errors/animal-is-unavailable.error';
import { UserIsAnimalOwnerError } from './errors/user-is-animal-owner.error';
import { InterestAlreadyDemonstratedError } from './errors/interest-already-demonstrated.error';
import { AnimalsService } from '../services/animals.service';

describe('#UC16 DemonstrateInterestInAnimalUseCase', () => {
  let animalsRepository: InMemoryAnimalsRepository;
  let interestsRepository: InMemoryInterestsRepository;

  let animalsService: AnimalsService;

  let sut: DemonstrateInterestInAnimalUseCase;

  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository();
    interestsRepository = new InMemoryInterestsRepository();

    animalsService = new AnimalsService(animalsRepository);

    sut = new DemonstrateInterestInAnimalUseCase(
      animalsService,
      interestsRepository,
    );
  });

  it('should be able to demonstrate interest in an animal', async () => {
    const spyFindById = vi.spyOn(animalsRepository, 'findById');
    const spyInsert = vi.spyOn(interestsRepository, 'insert');

    const animal = DogBuilder.create().build();
    await animalsRepository.insert(animal);

    const userId = '80aa3692-31cf-4241-a9b4-37276e527673';

    const output = await sut.execute({
      animalId: animal.id.value,
      userId,
    });

    expect(output.interest.animalId).toEqual(animal.id);
    expect(output.interest.userId).toEqual(UniqueEntityId.create(userId));
    expect(output.interest.expressedAt).toBeInstanceOf(Date);

    expect(spyFindById).toHaveBeenCalledWith(animal.id.value);
    expect(spyInsert).toHaveBeenCalledWith(output.interest);
  });

  it('should throw an error if animal does not exist', async () => {
    const userId = '80aa3692-31cf-4241-a9b4-37276e527673';

    const input = {
      animalId: 'non-existing-animal-id',
      userId,
    };

    expect(sut.execute(input)).rejects.toThrowError(AnimalNotFoundError);
  });

  it('should throw an error if user already demonstrated interest in animal', async () => {
    const animal = DogBuilder.create().build();
    await animalsRepository.insert(animal);

    const user = UserBuilder.create().build();

    const interest = InterestBuilder.create()
      .withAnimalId(animal.id.value)
      .withUserId(user.id.value)
      .build();

    await interestsRepository.insert(interest);

    const input = {
      animalId: animal.id.value,
      userId: user.id.value,
    };

    expect(sut.execute(input)).rejects.toThrowError(
      InterestAlreadyDemonstratedError,
    );
  });

  it('should throw an error if user is the animal owner', async () => {
    const userId = '80aa3692-31cf-4241-a9b4-37276e527673';

    const animal = DogBuilder.create().withOwnerId(userId).build();
    await animalsRepository.insert(animal);

    const input = {
      animalId: animal.id.value,
      userId,
    };

    expect(sut.execute(input)).rejects.toThrowError(UserIsAnimalOwnerError);
  });

  it('should throw an error if animal is not available', async () => {
    const animalId = 'ccffcf6a-ae5c-4db9-894e-1e347b53b994';
    const userId = '80aa3692-31cf-4241-a9b4-37276e527673';

    const animal = DogBuilder.create().withId(animalId).build();
    animal.adopt();
    await animalsRepository.insert(animal);

    const input = {
      animalId,
      userId,
    };

    expect(sut.execute(input)).rejects.toThrowError(AnimalIsUnavailableError);
  });
});
