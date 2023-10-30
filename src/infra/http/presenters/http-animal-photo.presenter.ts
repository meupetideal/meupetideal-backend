import { AnimalPhoto } from '@domain/adoption/enterprise/entities/animal-photo';

export class HttpAnimalPhotoPresenter {
  static toHttp(photo: AnimalPhoto) {
    return {
      id: photo.id.value,
      photoUrl: photo.photoUrl,
    };
  }
}
