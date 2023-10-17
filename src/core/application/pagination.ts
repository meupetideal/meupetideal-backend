import { Entity } from '@core/enterprise/entity';

export interface SearchInput {
  page: number;
  perPage: number;
}

export interface SearchOutput<T extends Entity> {
  items: T[];
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
}

interface SearchMapperInput<E extends Entity> {
  items: E[];
  page: number;
  total: number;
}

interface SearchMapperPaginateInput<E extends Entity> {
  items: E[];
  page: number;
  perPage: number;
}

export class SearchMapper {
  static toOutput<E extends Entity>({
    page,
    total,
    items,
  }: SearchMapperInput<E>): SearchOutput<E> {
    const itemsArray = items ?? [];
    const lastPage = Math.ceil(total / itemsArray.length);

    return {
      currentPage: page,
      perPage: itemsArray.length,
      lastPage,
      total,
      items: itemsArray,
    };
  }

  static paginate<E extends Entity>({
    page,
    perPage,
    items,
  }: SearchMapperPaginateInput<E>): E[] {
    const itemsArray = items ?? [];
    const offset = (page - 1) * perPage;
    const limit = offset + perPage;

    return itemsArray.slice(offset, limit);
  }
}
