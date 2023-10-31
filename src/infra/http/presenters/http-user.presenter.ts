import { User } from '@domain/accounts/enterprise/entities/user';
import { HttpStoragePresenter } from './http-storage.presenter';

export class HttpUserPresenter {
  static toHttp(user: User) {
    const address = user.address.value;

    return {
      id: user.id.value,
      name: user.name,
      cpf: user.cpf.format(),
      email: user.email.value,
      birthday: user.birthday.value,
      phoneNumber: user.phoneNumber.format(),
      avatarUrl: HttpStoragePresenter.toHttp(user.avatarUrl),
      address: {
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        country: address.country.format(),
      },
    };
  }
}
