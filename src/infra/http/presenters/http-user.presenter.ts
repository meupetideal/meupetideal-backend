import { User } from '@domain/accounts/enterprise/entities/user';

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
      avatarUrl: user.avatarUrl ?? null,
      address: {
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        country: address.country.format(),
      },
    };
  }
}
