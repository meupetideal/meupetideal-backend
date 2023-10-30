import { inject, injectable } from 'tsyringe';
import { InterestsRepository } from '@domain/adoption/application/repositories/interests.repository';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { DomainEvents } from '@core/enterprise/domain-events';
import { PrismaService } from '../prisma.service';
import { PrismaInterestMapper } from '../mappers/prisma-interests.mapper';

@injectable()
export class PrismaInterestsRepository implements InterestsRepository {
  constructor(
    @inject('PrismaService')
    private prismaService: PrismaService,
  ) {}

  public async findAllByAnimalId(animalId: string): Promise<Interest[]> {
    const interests = await this.prismaService.interest.findMany({
      where: { animalId },
    });

    return interests.map((interest) => PrismaInterestMapper.toDomain(interest));
  }

  public async findByAnimalIdAndUserId(
    animalId: string,
    userId: string,
  ): Promise<Interest | undefined> {
    const interest = await this.prismaService.interest.findFirst({
      where: {
        animalId,
        userId,
      },
    });

    if (!interest) return undefined;

    return PrismaInterestMapper.toDomain(interest);
  }

  public async findAllFromUserId(userId: string): Promise<Interest[]> {
    const interests = await this.prismaService.interest.findMany({
      where: { userId },
    });

    return interests.map((interest) => PrismaInterestMapper.toDomain(interest));
  }

  public async insert(entity: Interest): Promise<void> {
    await this.prismaService.interest.create({
      data: PrismaInterestMapper.toPrisma(entity),
    });

    DomainEvents.dispatchEventsForEntity(entity.id);
  }
}
