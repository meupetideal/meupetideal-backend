import { PasswordRecoveryTokenBuilder } from 'test/data-builders/password-recovery-token.builder';
import { PasswordRecoveryTokenCreatedEvent } from './password-recovery-token-created.event';

describe('PasswordRecoveryTokenCreatedEvent', () => {
  test('constructor', () => {
    const passwordRecoveryToken = PasswordRecoveryTokenBuilder.create().build();

    const event = new PasswordRecoveryTokenCreatedEvent(passwordRecoveryToken);

    expect(event.passwordRecoveryToken).toEqual(passwordRecoveryToken);
    expect(event.ocurredAt).toBeInstanceOf(Date);
  });

  test('getAggregateId', () => {
    const passwordRecoveryToken = PasswordRecoveryTokenBuilder.create().build();

    const event = new PasswordRecoveryTokenCreatedEvent(passwordRecoveryToken);

    expect(event.getAggregateId()).toEqual(passwordRecoveryToken.id);
  });
});
