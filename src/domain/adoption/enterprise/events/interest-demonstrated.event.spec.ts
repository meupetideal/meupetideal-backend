import { InterestBuilder } from 'test/data-builders/interest.builder';
import { InterestDemonstratedEvent } from './interest-demonstrated.event';

describe('InterestDemonstratedEvent', () => {
  test('constructor', () => {
    const interest = InterestBuilder.create().build();

    const event = new InterestDemonstratedEvent(interest);

    expect(event.interest).toEqual(interest);
    expect(event.ocurredAt).toBeInstanceOf(Date);
  });

  test('getEntityId', () => {
    const interest = InterestBuilder.create().build();

    const event = new InterestDemonstratedEvent(interest);

    expect(event.getEntityId()).toEqual(interest.id);
  });
});
