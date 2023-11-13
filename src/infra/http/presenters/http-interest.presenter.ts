import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { HttpAnimalPresenter } from './http-animal.presenter';

export class HttpInterestPresenter {
  static toHttp(interest: Interest) {
    return {
      id: interest.id.value,
      animalId: interest.animalId.value,
      userId: interest.userId.value,
      animal: HttpAnimalPresenter.toHttp(interest.animal as any),
      expressedAt: interest.expressedAt,
    };
  }
}
