import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { Prisma, Interest as PrismaInterest } from '@prisma/client';
import {
  PrismaAnimalMapper,
  PrismaAnimalWithPhotos,
} from './prisma-animals.mapper';

interface PrismaInterestWithAnimal extends PrismaInterest {
  animal?: PrismaAnimalWithPhotos;
}

export class PrismaInterestMapper {
  static toDomain(raw: PrismaInterestWithAnimal): Interest {
    return Interest.create(
      {
        animalId: UniqueEntityId.create(raw.animalId),
        userId: UniqueEntityId.create(raw.userId),
        animal: raw.animal
          ? PrismaAnimalMapper.toDomain(raw.animal)
          : undefined,
        expressedAt: raw.expressedAt,
      },
      UniqueEntityId.create(raw.id),
    );
  }

  static toPrisma(interest: Interest): Prisma.InterestUncheckedCreateInput {
    return {
      id: interest.id.value,
      animalId: interest.animalId.value,
      userId: interest.userId.value,
      expressedAt: interest.expressedAt,
    };
  }
}
