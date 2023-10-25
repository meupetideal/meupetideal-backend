import { User } from '@domain/accounts/enterprise/entities/user';

export class HttpUserPresenter {
  static toHttp(user: User) {
    return {
      id: user.id.value,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl ?? null,
    };
  }
}
