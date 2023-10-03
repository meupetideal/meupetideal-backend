import { Repository } from '@core/application/repository';
import { User } from '@domain/accounts/enterprise/entities/user';

export abstract class UsersRepository extends Repository {
  public abstract findByEmail(email: string): Promise<User | undefined>;
  public abstract findByCpf(cpf: string): Promise<User | undefined>;
  public abstract insert(user: User): Promise<void>;
}
