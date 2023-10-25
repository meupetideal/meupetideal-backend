import { Interest } from '@domain/adoption/enterprise/entities/interest';

export class HttpInterestPresenter {
  static toHttp(interest: Interest) {
    return {
      id: interest.id.value,
      animalId: interest.animalId.value,
      userId: interest.userId.value,
      expressedAt: interest.expressedAt,
    };
  }
}
