import { UsersRepository } from '@domain/accounts/application/repositories/users.repository';
import { User } from '@domain/accounts/enterprise/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    return this.users.find((user) => user.cpf === cpf);
  }

  public async insert(user: User): Promise<void> {
    this.users.push(user);
  }
}
