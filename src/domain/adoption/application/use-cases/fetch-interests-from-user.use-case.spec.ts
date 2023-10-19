import { InMemoryInterestsRepository } from 'test/repositories/in-memory-interests.repository';
import { InterestBuilder } from 'test/data-builders/interest.builder';
import { FetchInterestsFromUserUseCase } from './fetch-interests-from-user.use-case';

describe('#UC17 FetchInterestsFromUserUseCase', () => {
  let interestsRepository: InMemoryInterestsRepository;

  let sut: FetchInterestsFromUserUseCase;

  beforeEach(() => {
    interestsRepository = new InMemoryInterestsRepository();

    sut = new FetchInterestsFromUserUseCase(interestsRepository);
  });

  it('should fetch available interests from user', async () => {
    const spyFindAllFromUserId = vi.spyOn(
      interestsRepository,
      'findAllFromUserId',
    );

    const userId = 'user-id';
    const interest1 = InterestBuilder.create().withUserId(userId).build();
    const interest2 = InterestBuilder.create().withUserId(userId).build();
    interestsRepository.insert(interest1);
    interestsRepository.insert(interest2);

    const output = await sut.execute({
      userId,
    });

    expect(output.interests).toHaveLength(2);
    expect(output.interests[0]).toEqual(interest1);
    expect(output.interests[1]).toEqual(interest2);

    expect(spyFindAllFromUserId).toHaveBeenCalledWith(userId);
  });
});
