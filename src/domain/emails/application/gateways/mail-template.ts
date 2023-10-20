export abstract class MailTemplateGateway {
  abstract render(
    template: string,
    variables: Record<string, unknown>,
  ): Promise<string>;
}
