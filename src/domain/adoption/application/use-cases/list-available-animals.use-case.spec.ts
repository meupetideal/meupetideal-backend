import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { CatBuilder } from 'test/data-builders/cat.builder';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { ListAvailableAnimalsUseCase } from './list-available-animals.use-case';

describe('#UC16 ListAvailableAnimalsUseCase', () => {
  let animalsRepository: InMemoryAnimalsRepository;

  let listAvailableAnimalsUseCase: ListAvailableAnimalsUseCase;

  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository();

    listAvailableAnimalsUseCase = new ListAvailableAnimalsUseCase(
      animalsRepository,
    );
  });

  it('should list available animals', async () => {
    const spySearch = vi.spyOn(animalsRepository, 'search');

    const cat = CatBuilder.create().build();
    await animalsRepository.insert(cat);

    const dog = DogBuilder.create().build();
    await animalsRepository.insert(dog);

    const output = await listAvailableAnimalsUseCase.execute({
      page: 1,
      perPage: 10,
    });

    expect(output.items).toHaveLength(2);
    expect(output.items[0]).toBeInstanceOf(Cat);
    expect(output.items[1]).toBeInstanceOf(Dog);

    expect(spySearch).toHaveBeenCalledWith({
      page: 1,
      perPage: 10,
    });
  });

  it('should not list unavailable animals', async () => {
    const cat = CatBuilder.create().build();
    await animalsRepository.insert(cat);

    const dog = DogBuilder.create().build();
    dog.adopt();
    await animalsRepository.insert(dog);

    const output = await listAvailableAnimalsUseCase.execute({
      page: 1,
      perPage: 10,
    });

    expect(output.items).toHaveLength(1);
    expect(output.items[0]).toBeInstanceOf(Cat);
  });
});
