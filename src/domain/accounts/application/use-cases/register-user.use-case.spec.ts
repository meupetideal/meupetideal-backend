import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { User } from '@domain/accounts/enterprise/entities/user';
import { FakeHasher } from 'test/gateways/fake-hasher';
import { makeUser } from 'test/factories/make-user';
import { UsersRepository } from '../repositories/users.repository';
import { RegisterUserUseCase } from './register-user.use-case';
import { HasherGateway } from '../gateways/hasher';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

describe('#UC01 RegisterUserUseCase', () => {
  let usersRepository: UsersRepository;
  let hasher: HasherGateway;

  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hasher = new FakeHasher();

    registerUserUseCase = new RegisterUserUseCase(usersRepository, hasher);
  });

  it('should be able to register a new user', async () => {
    const spyFindByEmail = vi.spyOn(usersRepository, 'findByEmail');
    const spyFindByCpf = vi.spyOn(usersRepository, 'findByCpf');
    const spyInsert = vi.spyOn(usersRepository, 'insert');

    const input = {
      name: 'John Doe',
      cpf: '93725168300',
      email: 'john.doe@example.com',
      password: 'password',
      birthday: new Date(1960, 7, 26),
      phoneNumber: '+5561928473441',
    };

    const output = await registerUserUseCase.execute(input);

    expect(spyFindByEmail).toHaveBeenCalledWith(input.email);
    expect(spyFindByCpf).toHaveBeenCalledWith(input.cpf);
    expect(spyInsert).toHaveBeenCalledWith(expect.any(User));
    expect(output.user).toBeInstanceOf(User);

    expect(output.user.name).toBe(input.name);
    expect(output.user.cpf).toBe(input.cpf);
    expect(output.user.email).toBe(input.email);
    expect(output.user.hashedPassword).not.toBe(input.password);
    expect(output.user.birthday).toBe(input.birthday);
    expect(output.user.phoneNumber).toBe(input.phoneNumber);
  });

  it('should hash the password before inserting the user into the repository', async () => {
    const spyHash = vi.spyOn(hasher, 'hash');

    const input = {
      name: 'John Doe',
      cpf: '93725168300',
      email: 'john.doe@example.com',
      password: 'password',
      birthday: new Date(1960, 7, 26),
      phoneNumber: '+5561928473441',
    };

    const output = await registerUserUseCase.execute(input);

    expect(spyHash).toHaveBeenCalledWith(input.password);
    expect(output.user).toMatchObject({
      hashedPassword: expect.any(String),
    });
  });

  it('should throw UserAlreadyExistsError if user with the same email already exists', async () => {
    const existingUser = makeUser({ email: 'existing.user@example.com' });

    await usersRepository.insert(existingUser);

    const input = {
      name: 'John Doe',
      cpf: '93725168300',
      email: 'existing.user@example.com',
      password: 'password',
      birthday: new Date(1960, 7, 26),
      phoneNumber: '+5561928473441',
    };

    await expect(registerUserUseCase.execute(input)).rejects.toThrow(
      UserAlreadyExistsError,
    );
  });

  it('should throw UserAlreadyExistsError if user with the same cpf already exists', async () => {
    const existingUser = makeUser({ cpf: '93725168300' });

    await usersRepository.insert(existingUser);

    const input = {
      name: 'John Doe',
      cpf: '93725168300',
      email: 'johndoe@example.com',
      password: 'password',
      birthday: new Date(1990, 7, 26),
      phoneNumber: '+5561928473441',
    };

    await expect(registerUserUseCase.execute(input)).rejects.toThrow(
      UserAlreadyExistsError,
    );
  });
});
