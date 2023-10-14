import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { RegisterAnimalForAdoptionUseCase } from './register-animal-for-adoption.use-case';

describe('#UC20 RegisterAnimalForAdoptionUseCase', () => {
  let animalsRepository: InMemoryAnimalsRepository;

  let registerAnimalForAdoptionUseCase: RegisterAnimalForAdoptionUseCase;

  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository();

    registerAnimalForAdoptionUseCase = new RegisterAnimalForAdoptionUseCase(
      animalsRepository,
    );
  });

  it('should register a dog for adoption', async () => {
    const spyInsert = vi.spyOn(animalsRepository, 'insert');

    const output = await registerAnimalForAdoptionUseCase.execute({
      species: 'dog',
      ownerId: '1e307039-a203-43f3-8033-a8a881f71def',
      name: 'Rosita',
      gender: 'female',
      approximateAge: 1,
      approximateWeight: 2,
      size: 'extra-small',
      temperaments: ['calm', 'child-friendly'],
      coatColors: ['black', 'white'],
      isVaccinated: true,
      isDewormed: true,
      isNeutered: false,
      isSpecialNeeds: false,
      breed: 'chihuahua',
    });

    expect(spyInsert).toHaveBeenCalledWith(expect.any(Dog));
    expect(output.animal).toBeInstanceOf(Dog);

    expect(output.animal.ownerId).toEqual(
      UniqueEntityId.create('1e307039-a203-43f3-8033-a8a881f71def'),
    );
    expect(output.animal.name).toBe('Rosita');
    expect(output.animal.gender.value).toEqual('female');
    expect(output.animal.approximateAge).toBe(1);
    expect(output.animal.approximateWeight).toBe(2);
    expect(output.animal.size.value).toEqual('extra-small');
    expect(output.animal.temperaments[0].value).toEqual('calm');
    expect(output.animal.temperaments[1].value).toEqual('child-friendly');
    expect(output.animal.coatColors[0].value).toEqual('black');
    expect(output.animal.coatColors[1].value).toEqual('white');
    expect(output.animal.isVaccinated).toBe(true);
    expect(output.animal.isDewormed).toBe(true);
    expect(output.animal.isNeutered).toBe(false);
    expect(output.animal.isSpecialNeeds).toBe(false);
    expect(output.animal.breed.value).toEqual('chihuahua');
  });
});
