import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { RefreshToken } from './refresh-token';

describe('RefreshToken Unit Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: new Date(2023, 7, 26, 15).getTime(),
    });
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('constructor', () => {
    const spyValidate = vi.spyOn(RefreshToken, 'validate');
    let refreshToken = RefreshToken.create({
      userId: UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      token: UniqueEntityId.create('a6c8c0dc-72b8-4035-ba6f-1052194a28b6'),
      expiresAt: new Date(2022, 7, 26),
    });

    expect(refreshToken).toBeDefined();
    expect(refreshToken.id).toBeInstanceOf(UniqueEntityId);
    expect(refreshToken.userId).toBeInstanceOf(UniqueEntityId);
    expect(refreshToken.token).toBeInstanceOf(UniqueEntityId);
    expect(refreshToken.expiresAt).toEqual(new Date(2022, 7, 26));

    expect(spyValidate).toHaveBeenCalledOnce();

    refreshToken = RefreshToken.create({
      userId: UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      token: UniqueEntityId.create('a6c8c0dc-72b8-4035-ba6f-1052194a28b6'),
    });

    expect(refreshToken).toBeDefined();
    expect(refreshToken.id).toBeInstanceOf(UniqueEntityId);
    expect(refreshToken.userId).toBeInstanceOf(UniqueEntityId);
    expect(refreshToken.token).toBeInstanceOf(UniqueEntityId);
    expect(refreshToken.expiresAt).toEqual(new Date(2023, 8, 2, 15));
  });

  test('validate', () => {
    expect(() => RefreshToken.validate({} as any)).toThrowError(
      EntityValidationError,
    );
  });

  describe('validateToken', () => {
    beforeAll(() => {
      vi.spyOn(RefreshToken, 'validate').mockImplementation(() => true);
    });

    test('should return true if token is valid', () => {
      const arrange = [new Date(2023, 7, 26, 16), new Date(2023, 7, 26, 17)];

      arrange.forEach((expiresAt) => {
        const sut = RefreshToken.create({ expiresAt } as any);
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
          const sut = RefreshToken.create({ expiresAt } as any);
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
        .spyOn(RefreshToken, 'validate')
        .mockImplementation(() => true);
    });

    test('userId getter and setter', () => {
      const refreshToken = RefreshToken.create({
        userId: UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      } as any);
      expect(refreshToken.userId).toStrictEqual(
        UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      );

      refreshToken.userId = UniqueEntityId.create(
        'f8264bd1-6438-434f-9978-22c4eee83a55',
      );
      expect(refreshToken.userId).toStrictEqual(
        UniqueEntityId.create('f8264bd1-6438-434f-9978-22c4eee83a55'),
      );

      expect(spyValidate).toHaveBeenCalled();
    });

    test('token getter and setter', () => {
      const refreshToken = RefreshToken.create({
        token: UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      } as any);
      expect(refreshToken.token).toStrictEqual(
        UniqueEntityId.create('0b8ac42f-17ba-48b9-a1bb-43a3572dcdcf'),
      );

      refreshToken.token = UniqueEntityId.create(
        'f8264bd1-6438-434f-9978-22c4eee83a55',
      );
      expect(refreshToken.token).toStrictEqual(
        UniqueEntityId.create('f8264bd1-6438-434f-9978-22c4eee83a55'),
      );

      expect(spyValidate).toHaveBeenCalled();
    });

    test('expiresAt getter and setter', () => {
      const refreshToken = RefreshToken.create({
        expiresAt: new Date(2022, 7, 26),
      } as any);
      expect(refreshToken.expiresAt).toEqual(new Date(2022, 7, 26));

      refreshToken.expiresAt = new Date(2021, 2, 19);
      expect(refreshToken.expiresAt).toEqual(new Date(2021, 2, 19));

      expect(spyValidate).toHaveBeenCalled();
    });
  });
});
