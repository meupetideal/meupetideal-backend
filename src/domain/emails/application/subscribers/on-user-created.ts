import { EventHandler } from '@core/application/event-handler';
import { DomainEvents } from '@core/enterprise/domain-events';
import { UserCreatedEvent } from '@domain/accounts/enterprise/events/user-created.event';
import { inject, singleton } from 'tsyringe';
import { MailService } from '../services/mail.service';

@singleton()
export class OnUserCreated implements EventHandler {
  constructor(
    @inject('MailService')
    private mailService: MailService,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewUserEmail.bind(this),
      UserCreatedEvent.name,
    );
  }

  private async sendNewUserEmail({ user }: UserCreatedEvent) {
    await this.mailService.sendWithTemplate({
      to: {
        name: user.name,
        email: user.email.value,
      },
      subject: 'Boas vindas ao MeuPetIdeal!',
      template: 'new-user',
      variables: {
        name: user.name,
      },
    });
  }
}
