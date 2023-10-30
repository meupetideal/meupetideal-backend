import { Service } from '@core/application/service';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { AnimalFactory } from '@domain/adoption/enterprise/entities/factories/animal.factory';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { inject, injectable } from 'tsyringe';
import { StorageGateway } from '@core/application/gateways/storage.gateway';
import { AnimalPhoto } from '@domain/adoption/enterprise/entities/animal-photo';
import { AnimalPhotoList } from '@domain/adoption/enterprise/entities/animal-photo-list';
import { AnimalsRepository } from '../repositories/animals.repository';
import { AnimalNotFoundError } from '../use-cases/errors/animal-not-found.error';
import { UserNotOwnsTheAnimalError } from '../use-cases/errors/user-not-owns-the-animal.error';

interface RegisterAnimalInput {
  species: 'dog' | 'cat';
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
  photos: Array<{
    fileName: string;
    fileType: string;
    body: Buffer;
  }>;
}

@injectable()
export class AnimalsService implements Service {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: AnimalsRepository,
    @inject('StorageGateway')
    private storage: StorageGateway,
  ) {}

  public async getAnimal(animalId: string): Promise<Dog | Cat> {
    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) {
      throw new AnimalNotFoundError(animalId);
    }

    return animal;
  }

  public async getOwnerAnimal(
    animalId: string,
    ownerId: string,
  ): Promise<Dog | Cat> {
    const animal = await this.getAnimal(animalId);

    if (!animal.ownerId.equals(UniqueEntityId.create(ownerId))) {
      throw new UserNotOwnsTheAnimalError(ownerId, animalId);
    }

    return animal;
  }

  public async register({
    species,
    ownerId,
    name,
    gender,
    approximateAge,
    approximateWeight,
    size,
    temperaments,
    coatColors,
    isVaccinated,
    isDewormed,
    isNeutered,
    isSpecialNeeds,
    breed,
    photos,
  }: RegisterAnimalInput): Promise<Dog | Cat> {
    const animal = AnimalFactory.create(species, {
      ownerId,
      name,
      gender,
      approximateAge,
      approximateWeight,
      size,
      temperaments,
      coatColors,
      isVaccinated,
      isDewormed,
      isNeutered,
      isSpecialNeeds,
      breed,
    });

    const animalPhotos = await Promise.all(
      photos.map(async ({ fileName, fileType, body }) => {
        const { url: photoUrl } = await this.storage.upload({
          fileName,
          fileType,
          body,
        });

        return AnimalPhoto.create({ animalId: animal.id, photoUrl });
      }),
    );

    animal.photos = new AnimalPhotoList(animalPhotos);

    await this.animalsRepository.insert(animal);

    return animal;
  }
}
