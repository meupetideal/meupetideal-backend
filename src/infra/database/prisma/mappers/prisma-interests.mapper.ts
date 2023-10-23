import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { Prisma, Interest as PrismaInterest } from '@prisma/client';

export class PrismaInterestMapper {
  static toDomain(raw: PrismaInterest): Interest {
    return Interest.create(
      {
        animalId: UniqueEntityId.create(raw.animalId),
        userId: UniqueEntityId.create(raw.userId),
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
