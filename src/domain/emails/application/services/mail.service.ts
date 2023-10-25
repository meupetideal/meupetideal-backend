import { Service } from '@core/application/service';
import { inject, injectable } from 'tsyringe';
import { MailGateway } from '../gateways/mail';
import { MailTemplateGateway } from '../gateways/mail-template';

interface SendWithTemplateInput {
  to: {
    name: string;
    email: string;
  };
  from?: {
    name: string;
    email: string;
  };
  subject: string;
  template: string;
  variables: Record<string, unknown>;
}

@injectable()
export class MailService implements Service {
  constructor(
    @inject('MailGateway')
    private mailGateway: MailGateway,
    @inject('MailTemplateGateway')
    private mailTemplateGateway: MailTemplateGateway,
  ) {}

  public async sendWithTemplate({
    to,
    from,
    subject,
    template,
    variables,
  }: SendWithTemplateInput): Promise<void> {
    const body = await this.mailTemplateGateway.render(template, variables);

    await this.mailGateway.send({
      to,
      from,
      subject,
      body,
    });
  }
}
