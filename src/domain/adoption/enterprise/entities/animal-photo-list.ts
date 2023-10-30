import { WatchedList } from '@core/enterprise/watched-list';
import { AnimalPhoto } from './animal-photo';

export class AnimalPhotoList extends WatchedList<AnimalPhoto> {
  compareItems(a: AnimalPhoto, b: AnimalPhoto): boolean {
    return a.animalId.equals(b.animalId);
  }
}
