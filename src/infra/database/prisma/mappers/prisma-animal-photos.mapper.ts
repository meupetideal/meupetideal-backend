import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { AnimalPhoto } from '@domain/adoption/enterprise/entities/animal-photo';
import { Prisma, AnimalPhoto as PrismaAnimalPhoto } from '@prisma/client';

export class PrismaAnimalPhotoMapper {
  public static toDomain(raw: PrismaAnimalPhoto): AnimalPhoto {
    return AnimalPhoto.create(
      {
        animalId: UniqueEntityId.create(raw.animalId),
        photoUrl: raw.photoUrl,
      },
      UniqueEntityId.create(raw.id),
    );
  }

  public static toPrismaCreateMany(
    photos: AnimalPhoto[],
  ): Prisma.AnimalPhotoCreateManyArgs {
    return {
      data: photos.map((photo) => ({
        id: photo.id.toString(),
        animalId: photo.animalId.toString(),
        photoUrl: photo.photoUrl,
      })),
    };
  }

  public static toPrismaUpdateMany(
    photos: AnimalPhoto[],
  ): Prisma.AnimalPhotoUpdateManyArgs {
    const photoIds = photos.map((photo) => photo.id.toString());

    return {
      where: {
        id: {
          in: photoIds,
        },
      },
      data: {
        animalId: photos[0].animalId.toString(),
      },
    };
  }
}
