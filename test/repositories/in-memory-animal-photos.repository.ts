import { AnimalPhotosRepository } from '@domain/adoption/application/repositories/animal-photos.repository';
import { AnimalPhoto } from '@domain/adoption/enterprise/entities/animal-photo';

export class InMemoryAnimalPhotosRepository implements AnimalPhotosRepository {
  private items: AnimalPhoto[] = [];

  public async createMany(photos: AnimalPhoto[]): Promise<void> {
    this.items.push(...photos);
  }
}
