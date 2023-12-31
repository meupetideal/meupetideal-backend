import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { UserBuilder } from 'test/data-builders/user.builder';
import { FakeHasher } from 'test/gateways/fake-hasher';
import { UpdateProfileUseCase } from './update-profile.use-case';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { UsersService } from '../services/users.service';

describe('#UC06 UpdateProfileUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let hasher: FakeHasher;

  let usersService: UsersService;

  let updateProfileUseCase: UpdateProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hasher = new FakeHasher();

    usersService = new UsersService(usersRepository, hasher);

    updateProfileUseCase = new UpdateProfileUseCase(
      usersService,
      usersRepository,
    );
  });

  it('should be able to update an user profile', async () => {
    const existingUser = UserBuilder.create().build();
    await usersRepository.insert(existingUser);

    const spyFindById = vi.spyOn(usersRepository, 'findById');
    const spyUpdate = vi.spyOn(usersRepository, 'save');

    const input = {
      userId: existingUser.id.value,
      name: 'New Name',
      email: 'new.name@example.com',
      cpf: '27432647488',
      birthday: new Date(1984, 8, 3),
      phoneNumber: '6836748707',
    };

    const output = await updateProfileUseCase.execute(input);

    expect(spyFindById).toHaveBeenCalledWith(input.userId);
    expect(spyUpdate).toHaveBeenCalledWith(existingUser);

    const { user } = output;

    expect(user.name).toBe(input.name);
    expect(user.email.value).toBe(input.email);
    expect(user.cpf.value).toBe(input.cpf);
    expect(user.birthday.value).toBe(input.birthday);
    expect(user.phoneNumber.value).toBe(input.phoneNumber);
  });

  it('should throw an error if the user does not exist', async () => {
    const input = {
      userId: 'non-existing-user-id',
      name: 'New Name',
      email: 'new.name@example.com',
      cpf: '27432647488',
      birthday: new Date(1984, 8, 3),
      phoneNumber: '6836748707',
    };

    await expect(updateProfileUseCase.execute(input)).rejects.toThrowError(
      UserNotFoundError,
    );
  });

  it('should throw an error if the user email already exists', async () => {
    const existingUser = UserBuilder.create()
      .withEmail('new.name@example.com')
      .build();
    await usersRepository.insert(existingUser);

    const user = UserBuilder.create().withEmail('name@example.com').build();
    await usersRepository.insert(user);

    const input = {
      userId: user.id.value,
      name: 'New Name',
      email: 'new.name@example.com',
      cpf: '27432647488',
      birthday: new Date(1984, 8, 3),
      phoneNumber: '6836748707',
    };

    await expect(updateProfileUseCase.execute(input)).rejects.toThrowError(
      UserAlreadyExistsError,
    );
  });

  it('should throw an error if the user cpf already exists', async () => {
    const existingUser = UserBuilder.create()
      .withEmail('some.email@example.com')
      .withCpf('27432647488')
      .build();
    await usersRepository.insert(existingUser);

    const user = UserBuilder.create()
      .withEmail('another.email@example.com')
      .withCpf('42586032284')
      .build();
    await usersRepository.insert(user);

    const input = {
      userId: user.id.value,
      name: 'New Name',
      email: 'new.name@example.com',
      cpf: '27432647488',
      birthday: new Date(1984, 8, 3),
      phoneNumber: '6836748707',
    };

    await expect(updateProfileUseCase.execute(input)).rejects.toThrowError(
      UserAlreadyExistsError,
    );
  });
});
