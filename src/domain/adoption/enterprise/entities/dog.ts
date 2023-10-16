import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Animal, AnimalConstructor } from './animal';
import { AnimalDogBreed } from './value-objects/animal-dog-breed.vo';

export interface DogProps {
  breed: AnimalDogBreed;
}

export type DogConstructor = AnimalConstructor & DogProps;

export class Dog extends Animal<DogProps> {
  public static create(props: DogConstructor, id?: UniqueEntityId): Dog {
    return new Dog({ ...props, species: 'dog' }, id);
  }

  get breed(): AnimalDogBreed {
    return this.props.breed;
  }

  set breed(breed: AnimalDogBreed) {
    this.props.breed = breed;
  }
}
