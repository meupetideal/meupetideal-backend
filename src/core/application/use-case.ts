import { Either } from '@core/enterprise/logic/either';

export abstract class UseCase<Input, Output extends Either<unknown, unknown>> {
  abstract execute(input: Input): Promise<Output>;
}
