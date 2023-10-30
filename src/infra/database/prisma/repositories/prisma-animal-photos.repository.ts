import { AnimalPhotosRepository } from '@domain/adoption/application/repositories/animal-photos.repository';
import { AnimalPhoto } from '@domain/adoption/enterprise/entities/animal-photo';
import { inject, injectable } from 'tsyringe';
import { PrismaService } from '../prisma.service';
import { PrismaAnimalPhotoMapper } from '../mappers/prisma-animal-photos.mapper';

@injectable()
export class PrismaAnimalPhotosRepository implements AnimalPhotosRepository {
  constructor(
    @inject('PrismaService')
    private prismaService: PrismaService,
  ) {}

  public async createMany(photos: AnimalPhoto[]): Promise<void> {
    if (photos.length === 0) {
      return;
    }

    await this.prismaService.animalPhoto.createMany(
      PrismaAnimalPhotoMapper.toPrismaCreateMany(photos),
    );
  }
}
