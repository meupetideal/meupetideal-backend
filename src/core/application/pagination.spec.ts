import { Entity } from '@core/enterprise/entity';
import { SearchMapper } from './pagination';

class StubEntity extends Entity {
  public static create() {
    return new StubEntity({});
  }
}

describe('SearchMapper', () => {
  it('should return a SearchOutput object with correct properties and values when given valid input', () => {
    const input = {
      items: [StubEntity.create(), StubEntity.create()],
      page: 1,
      total: 6,
    };

    const output = SearchMapper.toOutput(input);

    expect(output.currentPage).toBe(1);
    expect(output.perPage).toBe(2);
    expect(output.lastPage).toBe(3);
    expect(output.total).toBe(6);
    expect(output.items).toEqual(input.items);
  });

  it('should return an empty array for items property when given empty items array', () => {
    const input = {
      items: [],
      page: 1,
      total: 0,
    };

    const output = SearchMapper.toOutput(input);

    expect(output.items).toEqual([]);
  });

  it('should return a SearchOutput object with correct lastPage value when total is not evenly divisible by perPage', () => {
    const input = {
      items: [StubEntity.create()],
      page: 1,
      total: 3,
    };

    const output = SearchMapper.toOutput(input);

    expect(output.lastPage).toBe(3);
  });

  it('should return an empty array for items property when given undefined items array', () => {
    const input = {
      items: undefined,
      page: 1,
      total: 0,
    };

    const output = SearchMapper.toOutput(input as any);

    expect(output.items).toEqual([]);
  });

  it('should return an empty array for items property when given null items array', () => {
    const input = {
      items: null,
      page: 1,
      total: 0,
    };

    const output = SearchMapper.toOutput(input as any);

    expect(output.items).toEqual([]);
  });

  it('should return an empty array for items property when given items array with length 0', () => {
    const input = {
      items: [],
      page: 1,
      total: 0,
    };

    const output = SearchMapper.toOutput(input);

    expect(output.items).toEqual([]);
  });
});
