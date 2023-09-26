export abstract class ValueObject<Value = unknown> {
  private readonly _value: Value;

  protected constructor(value: Value) {
    this._value = value;
  }

  get value(): Value {
    return this._value;
  }

  public abstract equals(valueObject: ValueObject<Value>): boolean;

  toString(): string {
    if (
      typeof this._value === 'object' &&
      this._value !== null &&
      typeof this._value.toString === 'function'
    ) {
      return this._value.toString();
    }

    return `${this._value}`;
  }
}
