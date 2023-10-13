import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { UserBuilder } from 'test/data-builders/user.builder';
import { ShowProfileUseCase } from './show-profile.use-case';
import { UserNotFoundError } from './errors/user-not-found.error';

describe('#UC07 ShowProfileUseCase', () => {
  let usersRepository: InMemoryUsersRepository;

  let showProfileUseCase: ShowProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    showProfileUseCase = new ShowProfileUseCase(usersRepository);
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
