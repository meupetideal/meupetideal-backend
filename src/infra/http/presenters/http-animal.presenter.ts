import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { HttpAnimalPhotoPresenter } from './http-animal-photo.presenter';

export class HttpAnimalPresenter {
  static toHttp(animal: Dog | Cat) {
    return {
      id: animal.id.value,
      ownerId: animal.ownerId.value,
      species: animal.species,
      name: animal.name,
      gender: animal.gender.value,
      approximateAge: animal.approximateAge,
      approximateWeight: animal.approximateWeight,
      size: animal.size.value,
      temperaments: animal.temperaments.map((temperament) => temperament.value),
      coatColors: animal.coatColors.map((coatColor) => coatColor.value),
      isVaccinated: animal.isVaccinated,
      isDewormed: animal.isDewormed,
      isNeutered: animal.isNeutered,
      isSpecialNeeds: animal.isSpecialNeeds,
      status: animal.status.value,
      breed: animal.breed.value,
      photos: animal.photos
        .getItems()
        .map((photo) => HttpAnimalPhotoPresenter.toHttp(photo)),
    };
  }
}
