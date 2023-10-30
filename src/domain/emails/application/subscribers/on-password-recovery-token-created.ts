import { EventHandler } from '@core/application/event-handler';
import { DomainEvents } from '@core/enterprise/domain-events';
import { UsersRepository } from '@domain/accounts/application/repositories/users.repository';
import { PasswordRecoveryTokenCreatedEvent } from '@domain/accounts/enterprise/events/password-recovery-token-created.event';
import { inject, injectable } from 'tsyringe';
import { MailService } from '../services/mail.service';

@injectable()
export class OnPasswordRecoveryTokenCreated implements EventHandler {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('MailService')
    private mailService: MailService,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendPasswordRecoveryTokenEmail.bind(this),
      PasswordRecoveryTokenCreatedEvent.name,
    );
  }

  private async sendPasswordRecoveryTokenEmail({
    passwordRecoveryToken,
  }: PasswordRecoveryTokenCreatedEvent) {
    const user = await this.usersRepository.findById(
      passwordRecoveryToken.userId.value,
    );

    if (user) {
      await this.mailService.sendWithTemplate({
        to: {
          name: user.name,
          email: user.email.value,
        },
        subject: 'Recuperação de senha',
        template: 'password-recovery',
        variables: {
          name: user.name,
          link: `${process.env.APP_URL}/reset-password?token=${passwordRecoveryToken.token.value}`,
        },
      });
    }
  }
}
