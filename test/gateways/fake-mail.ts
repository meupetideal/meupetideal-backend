import {
  MailGateway,
  SendMailInput,
} from '@domain/emails/application/gateways/mail';

export class FakeMailGateway implements MailGateway {
  public async send(data: SendMailInput): Promise<void> {
    console.log(
      `Mail with subject "${data.subject}" sent to "${data.to.email}"`,
    );
  }
}
