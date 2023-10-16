import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Animal, AnimalConstructor } from './animal';
import { AnimalCatBreed } from './value-objects/animal-cat-breed.vo';

export interface CatProps {
  breed: AnimalCatBreed;
}

export type CatConstructor = AnimalConstructor & CatProps;

export class Cat extends Animal<CatProps> {
  public static create(props: CatConstructor, id?: UniqueEntityId): Cat {
    return new Cat({ ...props, species: 'cat' }, id);
  }

  get breed(): AnimalCatBreed {
    return this.props.breed;
  }

  set breed(breed: AnimalCatBreed) {
    this.props.breed = breed;
  }
}
