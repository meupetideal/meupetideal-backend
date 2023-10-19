import { UseCase } from '@core/application/use-case';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { InterestsRepository } from '../repositories/interests.repository';

type Input = {
  userId: string;
};

type Output = {
  interests: Interest[];
};

export class FetchInterestsFromUserUseCase implements UseCase<Input, Output> {
  constructor(private interestsRepository: InterestsRepository) {}

  public async execute({ userId }: Input): Promise<Output> {
    const interests = await this.interestsRepository.findAllFromUserId(userId);

    return { interests };
  }
}
