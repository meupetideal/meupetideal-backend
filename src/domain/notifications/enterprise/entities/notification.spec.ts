import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { Notification } from './notification';

describe('Notification Unit Tests', () => {
  test('constructor', () => {
    const spyValidate = vi.spyOn(Notification, 'validate');

    const notification = Notification.create({
      title: 'Some title',
      recipientId: UniqueEntityId.create(),
      redirectToUrl: 'https://example.com',
    });

    expect(notification).toBeDefined();
    expect(notification.id).toBeInstanceOf(UniqueEntityId);
    expect(notification.title).toBe('Some title');
    expect(notification.recipientId).toBeInstanceOf(UniqueEntityId);
    expect(notification.redirectToUrl).toBe('https://example.com');
    expect(spyValidate).toHaveBeenCalledOnce();
  });

  test('validate', () => {
    expect(() => Notification.validate({} as any)).toThrowError(
      EntityValidationError,
    );
  });

  describe('getters and setters', () => {
    let spyValidate: SpyInstance;

    beforeAll(() => {
      spyValidate = vi
        .spyOn(Notification, 'validate')
        .mockImplementation(() => true);
    });

    test('title getter and setter', () => {
      const notification = Notification.create({
        title: 'Some title',
      } as any);
      expect(notification.title).toEqual('Some title');

      notification.title = 'Another title';
      expect(notification.title).toBe('Another title');

      expect(spyValidate).toHaveBeenCalled();
    });

    test('recipientId getter and setter', () => {
      const uniqueEntityId = UniqueEntityId.create(
        '879b18db-f2a8-4169-8c0c-d1388cb2a44b',
      );
      const notification = Notification.create({
        recipientId: uniqueEntityId,
      } as any);
      expect(notification.recipientId).toEqual(uniqueEntityId);

      const anotherUniqueEntityId = UniqueEntityId.create(
        '80b45af0-6aa8-49a4-af34-a5c3283c87f9',
      );
      notification.recipientId = anotherUniqueEntityId;
      expect(notification.recipientId).toBe(anotherUniqueEntityId);

      expect(spyValidate).toHaveBeenCalled();
    });

    test('redirectToUrl getter and setter', () => {
      const notification = Notification.create({
        redirectToUrl: 'https://example.com',
      } as any);
      expect(notification.redirectToUrl).toEqual('https://example.com');

      notification.redirectToUrl = 'https://another-example.com';
      expect(notification.redirectToUrl).toBe('https://another-example.com');

      expect(spyValidate).toHaveBeenCalled();
    });

    test('sentAt getter and setter', () => {
      const notification = Notification.create({
        sentAt: new Date(2023, 1, 1),
      } as any);
      expect(notification.sentAt).toEqual(new Date(2023, 1, 1));

      const anotherNotification = Notification.create({
        sentAt: null,
      } as any);
      expect(anotherNotification.sentAt).toEqual(new Date());

      expect(spyValidate).toHaveBeenCalled();
    });

    test('readedAt getter and setter', () => {
      const notification = Notification.create({
        readedAt: new Date(2023, 1, 1),
      } as any);
      expect(notification.readedAt).toEqual(new Date(2023, 1, 1));

      const anotherNotification = Notification.create({
        readedAt: undefined,
      } as any);
      expect(anotherNotification.readedAt).toEqual(null);

      expect(spyValidate).toHaveBeenCalled();
    });
  });

  test('markAsRead', () => {
    const notification = Notification.create({} as any);
    expect(notification.readedAt).toEqual(null);

    notification.markAsRead();
    expect(notification.readedAt).toBeInstanceOf(Date);
  });
});
