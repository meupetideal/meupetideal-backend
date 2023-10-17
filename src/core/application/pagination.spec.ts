import { Entity } from '@core/enterprise/entity';
import { SearchMapper } from './pagination';

class StubEntity extends Entity {
  public static create() {
    return new StubEntity({});
  }
}

describe('SearchMapper', () => {
  describe('paginate', () => {
    it('should return an array with length equal to perPage when given an array with length greater than perPage', () => {
      const input = {
        page: 1,
        perPage: 2,
        items: [StubEntity.create(), StubEntity.create(), StubEntity.create()],
      };

      const output = SearchMapper.paginate(input);

      expect(output.length).toBe(2);
    });

    it('should return an array with length equal to items array length when given an array with length less than perPage', () => {
      const input = {
        page: 1,
        perPage: 2,
        items: [StubEntity.create()],
      };

      const output = SearchMapper.paginate(input);

      expect(output.length).toBe(1);
    });

    it('should return an empty array when given an empty array', () => {
      const input = {
        page: 1,
        perPage: 2,
        items: [],
      };

      const output = SearchMapper.paginate(input);

      expect(output.length).toBe(0);
    });

    it('should return an empty array when given undefined', () => {
      const input = {
        page: 1,
        perPage: 2,
        items: undefined,
      };

      const output = SearchMapper.paginate(input as any);

      expect(output.length).toBe(0);
    });
  });

  describe('toOutput', () => {
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
});
