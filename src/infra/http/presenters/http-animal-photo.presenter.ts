import { AnimalPhoto } from '@domain/adoption/enterprise/entities/animal-photo';
import { HttpStoragePresenter } from './http-storage.presenter';

export class HttpAnimalPhotoPresenter {
  static toHttp(photo: AnimalPhoto) {
    return {
      id: photo.id.value,
      photoUrl: HttpStoragePresenter.toHttp(photo.photoUrl),
    };
  }
}
