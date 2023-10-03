import { UniqueEntityId } from './unique-entity-id.vo';

describe('UniqueEntityId Unit Tests', () => {
  it('should create a new instance with a valid UUID value', () => {
    const validUUID = '88a7a8e6-1d3f-498a-a0ec-a6ae268bc2a7';

    const uniqueEntityId = UniqueEntityId.create(validUUID);

    expect(uniqueEntityId.value).toBe(validUUID);
  });

  it('should create a new instance without passing a value, generating a random UUID', () => {
    const uniqueEntityId = UniqueEntityId.create();

    expect(uniqueEntityId.value).toBeDefined();
  });

  it('should compare two instances with the same value and return true', () => {
    const uuid = '025e2428-94a0-42f7-8fd8-c775fe2ba169';
    const uniqueEntityId1 = UniqueEntityId.create(uuid);
    const uniqueEntityId2 = UniqueEntityId.create(uuid);

    const result = uniqueEntityId1.equals(uniqueEntityId2);

    expect(result).toBe(true);
  });

  it('should compare two instances with different values and return false', () => {
    const uniqueEntityId1 = UniqueEntityId.create(
      'ea98ad54-4e5b-4dca-b69e-814a50fa4060',
    );
    const uniqueEntityId2 = UniqueEntityId.create(
      'f5612fa2-591e-4ca0-a3df-c60122f36c0d',
    );

    const result = uniqueEntityId1.equals(uniqueEntityId2);

    expect(result).toBe(false);
  });
});
