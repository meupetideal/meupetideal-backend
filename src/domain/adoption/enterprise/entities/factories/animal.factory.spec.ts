import { Cat } from '../cat';
import { Dog } from '../dog';
import { InvalidAnimalSpeciesError } from '../errors/invalid-animal-species.error';
import { AnimalFactory } from './animal.factory';

describe('AnimalFactory', () => {
  it('should create a dog', () => {
    const dog = AnimalFactory.create('dog', {
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

    expect(dog).toBeInstanceOf(Dog);
  });

  it('should create a cat', () => {
    const cat = AnimalFactory.create('cat', {
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
      breed: 'srd',
    });

    expect(cat).toBeInstanceOf(Cat);
  });

  it('should throw an error if the species is invalid', () => {
    expect(() =>
      AnimalFactory.create('turtle' as any, {
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
        breed: 'srd',
      }),
    ).toThrowError(InvalidAnimalSpeciesError);
  });
});
