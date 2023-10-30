import { AnimalPhoto } from '@domain/adoption/enterprise/entities/animal-photo';
import { Prisma } from '@prisma/client';

export class PrismaAnimalPhotoMapper {
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
