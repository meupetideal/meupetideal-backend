import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { PasswordRecoveryToken } from './password-recovery-token';

describe('PasswordRecoveryToken Unit Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: new Date(2023, 7, 26, 15).getTime(),
    });
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('constructor', () => {
    const spyValidate = vi.spyOn(PasswordRecoveryToken, 'validate');
    let passwordRecoveryToken = PasswordRecoveryToken.create({
      userId: UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      token: UniqueEntityId.create('a6c8c0dc-72b8-4035-ba6f-1052194a28b6'),
      expiresAt: new Date(2022, 7, 26),
    });

    expect(passwordRecoveryToken).toBeDefined();
    expect(passwordRecoveryToken.id).toBeInstanceOf(UniqueEntityId);
    expect(passwordRecoveryToken.userId).toBeInstanceOf(UniqueEntityId);
    expect(passwordRecoveryToken.token).toBeInstanceOf(UniqueEntityId);
    expect(passwordRecoveryToken.expiresAt).toEqual(new Date(2022, 7, 26));

    expect(spyValidate).toHaveBeenCalledOnce();

    passwordRecoveryToken = PasswordRecoveryToken.create({
      userId: UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      token: UniqueEntityId.create('a6c8c0dc-72b8-4035-ba6f-1052194a28b6'),
    });

    expect(passwordRecoveryToken).toBeDefined();
    expect(passwordRecoveryToken.id).toBeInstanceOf(UniqueEntityId);
    expect(passwordRecoveryToken.userId).toBeInstanceOf(UniqueEntityId);
    expect(passwordRecoveryToken.token).toBeInstanceOf(UniqueEntityId);
    expect(passwordRecoveryToken.expiresAt).toEqual(new Date(2023, 7, 26, 17));
  });

  test('validate', () => {
    expect(() => PasswordRecoveryToken.validate({} as any)).toThrowError(
      EntityValidationError,
    );
  });

  describe('validateToken', () => {
    beforeAll(() => {
      vi.spyOn(PasswordRecoveryToken, 'validate').mockImplementation(
        () => true,
      );
    });

    test('should return true if token is valid', () => {
      const arrange = [new Date(2023, 7, 26, 16), new Date(2023, 7, 26, 17)];

      arrange.forEach((expiresAt) => {
        const sut = PasswordRecoveryToken.create({ expiresAt } as any);
        const isValid = sut.validateToken();

        expect(isValid).toBe(true);
      });
    });

    test('should return false if token is invalid', () => {
      vi.spyOn(global.Date, 'now').mockImplementation(() =>
        new Date(2023, 7, 26, 15).getTime(),
      );

      test('should return true if token is valid', () => {
        const arrange = [new Date(2023, 7, 26, 17), new Date(2023, 9, 28)];

        arrange.forEach((expiresAt) => {
          const sut = PasswordRecoveryToken.create({ expiresAt } as any);
          const isValid = sut.validateToken();

          expect(isValid).toBe(false);
        });
      });
    });
  });

  describe('getters and setters', () => {
    let spyValidate: SpyInstance;

    beforeAll(() => {
      spyValidate = vi
        .spyOn(PasswordRecoveryToken, 'validate')
        .mockImplementation(() => true);
    });

    test('userId getter and setter', () => {
      const passwordRecoveryToken = PasswordRecoveryToken.create({
        userId: UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      } as any);
      expect(passwordRecoveryToken.userId).toStrictEqual(
        UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      );

      passwordRecoveryToken.userId = UniqueEntityId.create(
        'f8264bd1-6438-434f-9978-22c4eee83a55',
      );
      expect(passwordRecoveryToken.userId).toStrictEqual(
        UniqueEntityId.create('f8264bd1-6438-434f-9978-22c4eee83a55'),
      );

      expect(spyValidate).toHaveBeenCalled();
    });

    test('token getter and setter', () => {
      const passwordRecoveryToken = PasswordRecoveryToken.create({
        token: UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      } as any);
      expect(passwordRecoveryToken.token).toStrictEqual(
        UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      );

      passwordRecoveryToken.token = UniqueEntityId.create(
        'f8264bd1-6438-434f-9978-22c4eee83a55',
      );
      expect(passwordRecoveryToken.token).toStrictEqual(
        UniqueEntityId.create('f8264bd1-6438-434f-9978-22c4eee83a55'),
      );

      expect(spyValidate).toHaveBeenCalled();
    });

    test('expiresAt getter and setter', () => {
      const passwordRecoveryToken = PasswordRecoveryToken.create({
        expiresAt: new Date(2022, 7, 26),
      } as any);
      expect(passwordRecoveryToken.expiresAt).toEqual(new Date(2022, 7, 26));

      passwordRecoveryToken.expiresAt = new Date(2021, 2, 19);
      expect(passwordRecoveryToken.expiresAt).toEqual(new Date(2021, 2, 19));

      expect(spyValidate).toHaveBeenCalled();
    });
  });
});
