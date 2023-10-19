import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications.repository';
import { NotificationBuilder } from 'test/data-builders/notifications.builder';
import { ReadNotificationUseCase } from './read-notification.use-case';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

describe('ReadNotificationUseCase', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let sut: ReadNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(notificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const spyFindById = vi.spyOn(notificationsRepository, 'findById');
    const spySave = vi.spyOn(notificationsRepository, 'save');

    const notification = NotificationBuilder.create().build();
    await notificationsRepository.insert(notification);

    const { notification: readedNotification } = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(readedNotification.readedAt).toBeInstanceOf(Date);

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(spySave).toHaveBeenCalledTimes(1);
  });

  it('should not be able to read a notification that does not exist', async () => {
    await expect(() =>
      sut.execute({
        notificationId: 'non-existing-notification-id',
        recipientId: 'some-user-id',
      }),
    ).rejects.toThrowError(NotificationNotFoundError);
  });

  it('should not be able to read a notification from another user', async () => {
    const notification = NotificationBuilder.create().build();
    await notificationsRepository.insert(notification);

    await expect(
      sut.execute({
        recipientId: 'another-user-id',
        notificationId: notification.id.toString(),
      }),
    ).rejects.toThrowError();
  });
});
