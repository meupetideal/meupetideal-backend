import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { Report } from './report';

describe('Report Unit Tests', () => {
  test('constructor', () => {
    const spyValidate = vi.spyOn(Report, 'validate');

    const report = Report.create({
      reporterId: UniqueEntityId.create(),
      accusedOwnerId: UniqueEntityId.create(),
      animalId: UniqueEntityId.create(),
      reason: 'Some reason',
    });

    expect(report).toBeDefined();
    expect(report.id).toBeInstanceOf(UniqueEntityId);
    expect(report.reporterId).toBeInstanceOf(UniqueEntityId);
    expect(report.accusedOwnerId).toBeInstanceOf(UniqueEntityId);
    expect(report.animalId).toBeInstanceOf(UniqueEntityId);
    expect(report.reason).toBe('Some reason');
    expect(spyValidate).toHaveBeenCalledOnce();
  });

  test('validate', () => {
    expect(() => Report.validate({} as any)).toThrowError(
      EntityValidationError,
    );
  });

  describe('getters and setters', () => {
    let spyValidate: SpyInstance;

    beforeAll(() => {
      spyValidate = vi.spyOn(Report, 'validate').mockImplementation(() => true);
    });

    test('reporterId getter and setter', () => {
      const uniqueEntityId = UniqueEntityId.create(
        '879b18db-f2a8-4169-8c0c-d1388cb2a44b',
      );
      const report = Report.create({ reporterId: uniqueEntityId } as any);
      expect(report.reporterId).toEqual(uniqueEntityId);

      const anotherUniqueEntityId = UniqueEntityId.create(
        '80b45af0-6aa8-49a4-af34-a5c3283c87f9',
      );
      report.reporterId = anotherUniqueEntityId;
      expect(report.reporterId).toBe(anotherUniqueEntityId);

      expect(spyValidate).toHaveBeenCalled();
    });

    test('accusedOwnerId getter and setter', () => {
      const uniqueEntityId = UniqueEntityId.create(
        '879b18db-f2a8-4169-8c0c-d1388cb2a44b',
      );
      const report = Report.create({ accusedOwnerId: uniqueEntityId } as any);
      expect(report.accusedOwnerId).toEqual(uniqueEntityId);

      const anotherUniqueEntityId = UniqueEntityId.create(
        '80b45af0-6aa8-49a4-af34-a5c3283c87f9',
      );
      report.accusedOwnerId = anotherUniqueEntityId;
      expect(report.accusedOwnerId).toBe(anotherUniqueEntityId);

      expect(spyValidate).toHaveBeenCalled();
    });

    test('animalId getter and setter', () => {
      const uniqueEntityId = UniqueEntityId.create(
        '879b18db-f2a8-4169-8c0c-d1388cb2a44b',
      );
      const report = Report.create({ animalId: uniqueEntityId } as any);
      expect(report.animalId).toEqual(uniqueEntityId);

      const anotherUniqueEntityId = UniqueEntityId.create(
        '80b45af0-6aa8-49a4-af34-a5c3283c87f9',
      );
      report.animalId = anotherUniqueEntityId;
      expect(report.animalId).toBe(anotherUniqueEntityId);

      expect(spyValidate).toHaveBeenCalled();
    });

    test('reason getter and setter', () => {
      const report = Report.create({ reason: 'Some reason.' } as any);
      expect(report.reason).toBe('Some reason.');

      report.reason = 'Another reason.';
      expect(report.reason).toBe('Another reason.');

      expect(spyValidate).toHaveBeenCalled();
    });
  });
});
