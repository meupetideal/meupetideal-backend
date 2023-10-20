import { MailTemplateGateway } from '@domain/emails/application/gateways/mail-template';

export class FakeMailTemplateGateway implements MailTemplateGateway {
  public async render(
    template: string,
    variables: Record<string, unknown>,
  ): Promise<string> {
    return JSON.stringify({ template, variables });
  }
}
