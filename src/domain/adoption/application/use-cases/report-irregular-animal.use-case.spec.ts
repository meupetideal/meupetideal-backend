import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Report } from '@domain/adoption/enterprise/entities/report';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { InMemoryAnimalPhotosRepository } from 'test/repositories/in-memory-animal-photos.repository';
import { FakeStorageGateway } from 'test/gateways/fake-storage';
import { ReportIrregularAnimalUseCase } from './report-irregular-animal.use-case';
import { AnimalNotFoundError } from './errors/animal-not-found.error';
import { AnimalsService } from '../services/animals.service';

describe('#UC213 ReportIrregularAnimalUseCase', () => {
  let animalsRepository: InMemoryAnimalsRepository;
  let animalPhotosRepository: InMemoryAnimalPhotosRepository;
  let storageGateway: FakeStorageGateway;

  let animalsService: AnimalsService;

  let reportIrregularAnimalUseCase: ReportIrregularAnimalUseCase;

  beforeEach(() => {
    storageGateway = new FakeStorageGateway();
    animalPhotosRepository = new InMemoryAnimalPhotosRepository();
    animalsRepository = new InMemoryAnimalsRepository(animalPhotosRepository);

    animalsService = new AnimalsService(animalsRepository, storageGateway);

    reportIrregularAnimalUseCase = new ReportIrregularAnimalUseCase(
      animalsService,
    );
  });

  it('should report irregular animal', async () => {
    const spyFindById = vi.spyOn(animalsRepository, 'findById');
    const spyCreate = vi.spyOn(Report, 'create');

    const animalId = '1e307039-a203-43f3-8033-a8a881f71def';
    const ownerId = '80b45af0-6aa8-49a4-af34-a5c3283c87f9';
    const reporterId = 'ccffcf6a-ae5c-4db9-894e-1e347b53b994';

    const animal = DogBuilder.create()
      .withId(animalId)
      .withOwnerId(ownerId)
      .build();
    await animalsRepository.insert(animal);

    await reportIrregularAnimalUseCase.execute({
      animalId,
      reporterId,
      reason: 'Some reason',
    });

    expect(spyFindById).toHaveBeenCalledWith(animalId);
    expect(spyCreate).toHaveBeenCalledWith({
      reporterId: UniqueEntityId.create(reporterId),
      accusedOwnerId: UniqueEntityId.create(ownerId),
      animalId: UniqueEntityId.create(animalId),
      reason: 'Some reason',
    });
  });

  it('should throw AnimalNotFoundError when animal does not exist', async () => {
    const animalId = '1e307039-a203-43f3-8033-a8a881f71def';
    const reporterId = 'ccffcf6a-ae5c-4db9-894e-1e347b53b994';

    await expect(() =>
      reportIrregularAnimalUseCase.execute({
        animalId,
        reporterId,
        reason: 'Some reason',
      }),
    ).rejects.toThrowError(AnimalNotFoundError);
  });
});
