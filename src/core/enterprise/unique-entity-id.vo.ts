import { randomUUID } from 'node:crypto';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  public static create(value?: string): UniqueEntityId {
    return new UniqueEntityId(value ?? randomUUID());
  }

  public equals(valueObject: UniqueEntityId): boolean {
    return this.value === valueObject.value;
  }
}
