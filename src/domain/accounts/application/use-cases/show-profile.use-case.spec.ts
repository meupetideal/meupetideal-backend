import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { UserBuilder } from 'test/data-builders/user.builder';
import { FakeHasher } from 'test/gateways/fake-hasher';
import { ShowProfileUseCase } from './show-profile.use-case';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UsersService } from '../services/users.service';

describe('#UC07 ShowProfileUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let hasher: FakeHasher;

  let usersService: UsersService;

  let showProfileUseCase: ShowProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hasher = new FakeHasher();

    usersService = new UsersService(usersRepository, hasher);

    showProfileUseCase = new ShowProfileUseCase(usersService);
  });

  it('should be able to show an user profile', async () => {
    const existingUser = UserBuilder.create().build();
    await usersRepository.insert(existingUser);

    const spyFindById = vi.spyOn(usersRepository, 'findById');

    const input = {
      userId: existingUser.id.value,
    };

    const output = await showProfileUseCase.execute(input);

    expect(spyFindById).toHaveBeenCalledWith(input.userId);

    expect(output.user).toEqual(existingUser);
  });

  it('should throw an error if the user does not exist', async () => {
    const input = {
      userId: 'non-existing-user-id',
    };

    await expect(showProfileUseCase.execute(input)).rejects.toThrowError(
      UserNotFoundError,
    );
  });
});
