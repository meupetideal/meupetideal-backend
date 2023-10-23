import { inject, injectable } from 'tsyringe';
import { AnimalsRepository } from '@domain/adoption/application/repositories/animals.repository';
import {
  SearchInput,
  SearchMapper,
  SearchOutput,
} from '@core/application/pagination';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { PrismaService } from '../prisma.service';
import { PrismaAnimalMapper } from '../mappers/prisma-animals.mapper';

@injectable()
export class PrismaAnimalsRepository implements AnimalsRepository {
  constructor(
    @inject('PrismaService')
    private prismaService: PrismaService,
  ) {}

  public async search({
    page,
    perPage,
  }: SearchInput): Promise<SearchOutput<Cat | Dog>> {
    const animals = await this.prismaService.animal.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const total = await this.prismaService.animal.count();

    return SearchMapper.toOutput({
      items: animals.map((animal) => PrismaAnimalMapper.toDomain(animal)),
      page,
      total,
    });
  }

  public async findManyByOwnerId(ownerId: string): Promise<(Cat | Dog)[]> {
    const animals = await this.prismaService.animal.findMany({
      where: { ownerId },
    });

    return animals.map((animal) => PrismaAnimalMapper.toDomain(animal));
  }

  public async findById(id: string): Promise<Cat | Dog | undefined> {
    const animal = await this.prismaService.animal.findUnique({
      where: { id },
    });

    if (!animal) return undefined;

    return PrismaAnimalMapper.toDomain(animal);
  }

  public async insert(entity: Cat | Dog): Promise<void> {
    await this.prismaService.animal.create({
      data: PrismaAnimalMapper.toPrisma(entity),
    });
  }

  public async save(entity: Cat | Dog): Promise<void> {
    await this.prismaService.animal.update({
      where: { id: entity.id.value },
      data: PrismaAnimalMapper.toPrisma(entity),
    });
  }
}
