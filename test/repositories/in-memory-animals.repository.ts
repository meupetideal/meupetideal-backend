import {
  SearchInput,
  SearchMapper,
  SearchOutput,
} from '@core/application/pagination';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import {
  AnimalSearchFilters,
  AnimalsRepository,
} from '@domain/adoption/application/repositories/animals.repository';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';

type Item = Cat | Dog;

export class InMemoryAnimalsRepository implements AnimalsRepository {
  public items: Item[] = [];

  public async search({
    page,
    perPage,
    filters,
  }: SearchInput<AnimalSearchFilters>): Promise<SearchOutput<Item>> {
    let animals = this.items.filter((item) => item.isAvailable());
    if (filters) animals = this.applyFilters(animals, filters);

    const total = animals.length;
    const paginatedItems = SearchMapper.paginate<Item>({
      page,
      perPage,
      items: animals,
    });

    return SearchMapper.toOutput<Item>({
      page,
      total,
      items: paginatedItems,
    });
  }

  public async findManyByOwnerId(ownerId: string): Promise<(Cat | Dog)[]> {
    return this.items.filter((item) =>
      item.ownerId.equals(UniqueEntityId.create(ownerId)),
    );
  }

  public async findById(id: string): Promise<Item | undefined> {
    return this.items.find((item) => item.id.equals(UniqueEntityId.create(id)));
  }

  public async insert(entity: Item): Promise<void> {
    this.items.push(entity);
  }

  public async save(entity: Item): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(entity.id));

    this.items[index] = entity;
  }

  private applyFilters(animals: Item[], filters: AnimalSearchFilters): Item[] {
    const filteredAnimals = animals;

    const {
      age,
      weight,
      gender,
      species,
      sizes,
      breeds,
      coatColors,
      temperaments,
    } = filters;

    if (age) {
      const { min, max } = age;
      if (min) filteredAnimals.filter((item) => item.approximateAge >= min);
      if (max) filteredAnimals.filter((item) => item.approximateAge <= max);
    }

    if (weight) {
      const { min, max } = weight;
      if (min) filteredAnimals.filter((item) => item.approximateWeight >= min);
      if (max) filteredAnimals.filter((item) => item.approximateWeight <= max);
    }

    if (gender) {
      filteredAnimals.filter((item) => item.gender.value === gender);
    }

    if (species) {
      filteredAnimals.filter((item) => item.species === species);
    }

    if (sizes) {
      filteredAnimals.filter((item) => sizes.includes(item.size.value));
    }

    if (breeds) {
      filteredAnimals.filter((item) => breeds.includes(item.breed.value));
    }

    if (coatColors) {
      filteredAnimals.filter((item) =>
        item.coatColors.some((color) => coatColors.includes(color.value)),
      );
    }

    if (temperaments) {
      filteredAnimals.filter((item) =>
        item.temperaments.some((temperament) =>
          temperaments.includes(temperament.value),
        ),
      );
    }

    return filteredAnimals;
  }
}
