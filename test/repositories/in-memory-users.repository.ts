import { DomainEvents } from '@core/enterprise/domain-events';
import { UsersRepository } from '@domain/accounts/application/repositories/users.repository';
import { User } from '@domain/accounts/enterprise/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.items.find((entity) => entity.id.value === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.items.find((entity) => entity.email === email);
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    return this.items.find((entity) => entity.cpf === cpf);
  }

  public async insert(entity: User): Promise<void> {
    this.items.push(entity);

    DomainEvents.dispatchEventsForAggregate(entity.id);
  }

  public async save(entity: User): Promise<void> {
    const index = this.items.findIndex((u) => u.id.equals(entity.id));

    this.items[index] = entity;
  }
}
