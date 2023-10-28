import { User } from '@domain/accounts/enterprise/entities/user';

export class HttpUserPresenter {
  static toHttp(user: User) {
    return {
      id: user.id.value,
      name: user.name,
      cpf: user.cpf.format(),
      email: user.email.value,
      birthday: user.birthday.value,
      phoneNumber: user.phoneNumber.format(),
      avatarUrl: user.avatarUrl ?? null,
    };
  }
}
