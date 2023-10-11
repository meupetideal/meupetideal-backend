import { Repository } from '@core/application/repository';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { User } from '@domain/accounts/enterprise/entities/user';

export abstract class UsersRepository extends Repository {
  public abstract findById(id: UniqueEntityId): Promise<User | undefined>;
  public abstract findByEmail(email: string): Promise<User | undefined>;
  public abstract findByCpf(cpf: string): Promise<User | undefined>;
  public abstract insert(entity: User): Promise<void>;
  public abstract update(entity: User): Promise<void>;
}
