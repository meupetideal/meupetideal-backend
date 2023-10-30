import { Entity } from '@core/enterprise/entity';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';

interface AnimalPhotoProps {
  animalId: UniqueEntityId;
  photoUrl: string;
}

export class AnimalPhoto extends Entity<AnimalPhotoProps> {
  public static create(props: AnimalPhotoProps): AnimalPhoto {
    return new AnimalPhoto(props);
  }

  get animalId(): UniqueEntityId {
    return this.props.animalId;
  }

  get photoUrl(): string {
    return this.props.photoUrl;
  }
}
