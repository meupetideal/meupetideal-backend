import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Cat, CatConstructor } from '../cat';
import { Dog, DogConstructor } from '../dog';
import { InvalidAnimalSpeciesError } from '../errors/invalid-animal-species.error';
import { AnimalDogBreed } from '../value-objects/animal-dog-breed.vo';
import { AnimalCatBreed } from '../value-objects/animal-cat-breed.vo';
import { AnimalGender } from '../value-objects/animal-gender.vo';
import { AnimalSize } from '../value-objects/animal-size.vo';
import { AnimalTemperament } from '../value-objects/animal-temperament.vo';
import { AnimalCoatColor } from '../value-objects/animal-coat-color.vo';

type AnimalSpecies = 'dog' | 'cat';

interface AnimalFactoryProps {
  ownerId: string;
  name: string;
  gender: string;
  approximateAge: number;
  approximateWeight: number;
  size: string;
  temperaments: string[];
  coatColors: string[];
  isVaccinated: boolean;
  isDewormed: boolean;
  isNeutered: boolean;
  isSpecialNeeds: boolean;
  breed: string;
}

export class AnimalFactory {
  public static create(species: AnimalSpecies, props: AnimalFactoryProps) {
    const domainProps = AnimalFactory.toDomain(species, props);

    if (domainProps.breed.constructor.name === 'AnimalDogBreed') {
      return Dog.create(domainProps as DogConstructor);
    }

    return Cat.create(domainProps as CatConstructor);
  }

  private static toDomain(species: AnimalSpecies, props: AnimalFactoryProps) {
    const animalProps = {
      ownerId: UniqueEntityId.create(props.ownerId),
      name: props.name,
      gender: AnimalGender.create(props.gender),
      approximateAge: props.approximateAge,
      approximateWeight: props.approximateWeight,
      size: AnimalSize.create(props.size),
      temperaments: props.temperaments.map((temperament) =>
        AnimalTemperament.create(temperament),
      ),
      coatColors: props.coatColors.map((coatColor) =>
        AnimalCoatColor.create(coatColor),
      ),
      isVaccinated: props.isVaccinated,
      isDewormed: props.isDewormed,
      isNeutered: props.isNeutered,
      isSpecialNeeds: props.isSpecialNeeds,
      breed: AnimalFactory.toDomainBreed(species, props.breed),
    };

    return animalProps;
  }

  public static toDomainBreed(species: AnimalSpecies, breed: string) {
    switch (species) {
      case 'dog': {
        return AnimalDogBreed.create(breed);
      }
      case 'cat': {
        return AnimalCatBreed.create(breed);
      }
      default:
        throw new InvalidAnimalSpeciesError(species);
    }
  }
}
