import { UserBuilder } from 'test/data-builders/user.builder';
import { UserCreatedEvent } from './user-created.event';

describe('UserCreatedEvent', () => {
  test('constructor', () => {
    const user = UserBuilder.create().build();

    const event = new UserCreatedEvent(user);

    expect(event.user).toEqual(user);
    expect(event.ocurredAt).toBeInstanceOf(Date);
  });

  test('getAggregateId', () => {
    const user = UserBuilder.create().build();

    const event = new UserCreatedEvent(user);

    expect(event.getAggregateId()).toEqual(user.id);
  });
});
