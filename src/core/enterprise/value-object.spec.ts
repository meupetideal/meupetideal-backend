import { ValueObject } from './value-object';

class StubValueObject extends ValueObject {
  public static create(value: unknown): ValueObject<unknown> {
    return new StubValueObject(value);
  }

  public equals(valueObject: StubValueObject): boolean {
    return this.value === valueObject.value;
  }
}

describe('ValueObject Unit Tests', () => {
  it("should return the same value as passed in the constructor when calling the 'value' getter", () => {
    const expectedValue = 10;
    const valueObject = StubValueObject.create(expectedValue);

    const actualValue = valueObject.value;

    expect(actualValue).toBe(expectedValue);
  });

  it('should return true when comparing two instances of ValueObject with the same value', () => {
    const value = 10;
    const valueObject1 = StubValueObject.create(value);
    const valueObject2 = StubValueObject.create(value);

    const result = valueObject1.equals(valueObject2);

    expect(result).toBe(true);
  });

  it('should return false when comparing two instances of ValueObject with different values', () => {
    const value1 = 10;
    const value2 = 20;
    const valueObject1 = StubValueObject.create(value1);
    const valueObject2 = StubValueObject.create(value2);

    const result = valueObject1.equals(valueObject2);

    expect(result).toBe(false);
  });

  it('should return false when comparing two instances of ValueObject with different types of values', () => {
    const value1 = 10;
    const value2 = '10';
    const valueObject1 = StubValueObject.create(value1);
    const valueObject2 = StubValueObject.create(value2);

    const result = valueObject1.equals(valueObject2);

    expect(result).toBe(false);
  });

  it("should return a string representation of the value stored in the ValueObject when calling the 'toString' method", () => {
    const value = 10;
    const valueObject = StubValueObject.create(value);

    const result = valueObject.toString();

    expect(result).toBe('10');
  });

  it("should return a string representation of a Date value stored in the ValueObject when calling the 'toString' method", () => {
    const date = new Date('2022-01-01');
    const valueObject = StubValueObject.create(date);

    const result = valueObject.toString();

    expect(result).toBe(date.toString());
  });
});
