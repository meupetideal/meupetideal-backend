import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { UsersRepository } from '@domain/accounts/application/repositories/users.repository';
import { User } from '@domain/accounts/enterprise/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = [];

  public async findById(id: UniqueEntityId): Promise<User | undefined> {
    return this.items.find((entity) => entity.id.equals(id));
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.items.find((entity) => entity.email === email);
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    return this.items.find((entity) => entity.cpf === cpf);
  }

  public async insert(entity: User): Promise<void> {
    this.items.push(entity);
  }

  public async update(entity: User): Promise<void> {
    const index = this.items.findIndex((u) => u.id.equals(entity.id));

    this.items[index] = entity;
  }
}
