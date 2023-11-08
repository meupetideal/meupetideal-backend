import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { AnimalPhotoList } from '@domain/adoption/enterprise/entities/animal-photo-list';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { AnimalCatBreed } from '@domain/adoption/enterprise/entities/value-objects/animal-cat-breed.vo';
import { AnimalCoatColor } from '@domain/adoption/enterprise/entities/value-objects/animal-coat-color.vo';
import { AnimalDogBreed } from '@domain/adoption/enterprise/entities/value-objects/animal-dog-breed.vo';
import { AnimalGender } from '@domain/adoption/enterprise/entities/value-objects/animal-gender.vo';
import { AnimalSize } from '@domain/adoption/enterprise/entities/value-objects/animal-size.vo';
import { AnimalStatus } from '@domain/adoption/enterprise/entities/value-objects/animal-status.vo';
import { AnimalTemperament } from '@domain/adoption/enterprise/entities/value-objects/animal-temperament.vo';
import {
  Prisma,
  AnimalPhoto as PrismaAnimalPhoto,
  Animal as PrismaAnimal,
} from '@prisma/client';
import { PrismaAnimalPhotoMapper } from './prisma-animal-photos.mapper';

type PrismaAnimalWithPhotos = PrismaAnimal & {
  photos: PrismaAnimalPhoto[] | null;
};

export class PrismaAnimalMapper {
  static toDomain(raw: PrismaAnimalWithPhotos): Dog | Cat {
    const props = {
      ownerId: UniqueEntityId.create(raw.ownerId),
      name: raw.name,
      gender: AnimalGender.create(raw.gender),
      approximateAge: raw.approximateAge,
      approximateWeight: raw.approximateWeight,
      size: AnimalSize.create(raw.size),
      temperaments: raw.temperaments.map((temperament) =>
        AnimalTemperament.create(temperament),
      ),
      coatColors: raw.coatColors.map((color) => AnimalCoatColor.create(color)),
      isVaccinated: raw.isVaccinated,
      isDewormed: raw.isDewormed,
      isNeutered: raw.isNeutered,
      isSpecialNeeds: raw.isSpecialNeeds,
      status: AnimalStatus.create(raw.status),
      photos: raw.photos
        ? new AnimalPhotoList(
            raw.photos.map((photo) => PrismaAnimalPhotoMapper.toDomain(photo)),
          )
        : undefined,
    };

    switch (raw.species) {
      case 'dog': {
        const breed = AnimalDogBreed.create(raw.breed);
        return Dog.create({ ...props, breed }, UniqueEntityId.create(raw.id));
      }
      case 'cat': {
        const breed = AnimalCatBreed.create(raw.breed);
        return Cat.create({ ...props, breed }, UniqueEntityId.create(raw.id));
      }
      default:
        throw new Error('Invalid animal species');
    }
  }

  static toPrisma(animal: Dog | Cat): Prisma.AnimalUncheckedCreateInput {
    return {
      id: animal.id.value,
      ownerId: animal.ownerId.value,
      name: animal.name,
      species: animal.species,
      gender: animal.gender.value,
      approximateAge: animal.approximateAge,
      approximateWeight: animal.approximateWeight,
      size: animal.size.value,
      temperaments: animal.temperaments.map((temperament) => temperament.value),
      coatColors: animal.coatColors.map((color) => color.value),
      isVaccinated: animal.isVaccinated,
      isDewormed: animal.isDewormed,
      isNeutered: animal.isNeutered,
      isSpecialNeeds: animal.isSpecialNeeds,
      status: animal.status.value,
      breed: animal.breed.value,
    };
  }
}
