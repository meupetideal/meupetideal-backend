import { InMemoryAnimalsRepository } from 'test/repositories/in-memory-animals.repository';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications.repository';
import { waitFor } from 'test/utils/wait-for';
import { DogBuilder } from 'test/data-builders/dog.builder';
import { InterestBuilder } from 'test/data-builders/interest.builder';
import { InterestsRepository } from '@domain/adoption/application/repositories/interests.repository';
import { SpyInstance } from 'vitest';
import { InMemoryInterestsRepository } from 'test/repositories/in-memory-interests.repository';
import { OnAnimalInterestDemonstrated } from './on-animal-interest-demonstrated';
import {
  SendNotificationInput,
  SendNotificationOutput,
  SendNotificationUseCase,
} from '../use-cases/send-notification.use-case';

describe('On Interest Created', () => {
  let animalsRepository: InMemoryAnimalsRepository;
  let interestsRepository: InterestsRepository;
  let notificationsRepository: InMemoryNotificationsRepository;

  let sendNotificationUseCase: SendNotificationUseCase;

  let sendNotificationExecuteSpy: SpyInstance<
    [SendNotificationInput],
    Promise<SendNotificationOutput>
  >;

  beforeEach(() => {
    animalsRepository = new InMemoryAnimalsRepository();
    interestsRepository = new InMemoryInterestsRepository();
    notificationsRepository = new InMemoryNotificationsRepository();

    sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

    // eslint-disable-next-line no-new
    new OnAnimalInterestDemonstrated(
      animalsRepository,
      sendNotificationUseCase,
    );
  });

  it('should  send a notification when an interest is created', async () => {
    const animal = DogBuilder.create().build();
    await animalsRepository.insert(animal);
    const interest = InterestBuilder.create()
      .withAnimalId(animal.id.value)
      .build();
    await interestsRepository.insert(interest);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
