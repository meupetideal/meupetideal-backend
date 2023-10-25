import Handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs';

import { MailTemplateGateway } from '@domain/emails/application/gateways/mail-template';
import { injectable } from 'tsyringe';

@injectable()
export class HandlebarsMailTemplate implements MailTemplateGateway {
  constructor() {
    this.registerPartials();
    this.registerHelpers();
  }

  public async render(
    template: string,
    variables: Record<string, unknown>,
  ): Promise<string> {
    const parseTemplate = Handlebars.compile(template);

    return parseTemplate(variables);
  }

  private async registerPartials(): Promise<void> {
    const templatesPaths = [
      __dirname,
      '..',
      '..',
      'domain',
      'emails',
      'application',
      'gateways',
      'templates',
    ];

    const partials = [
      {
        name: 'includes',
        path: path.resolve(...templatesPaths, 'includes'),
      },
      {
        name: 'layouts',
        path: path.resolve(...templatesPaths, 'layouts'),
      },
      {
        name: 'components',
        path: path.resolve(...templatesPaths, 'inclucomponentsdes'),
      },
    ];

    await Promise.all(
      partials.map(async (partial) => {
        const partialPathFiles = await fs.promises.readdir(partial.path);

        partialPathFiles.forEach(async (filename) => {
          const file = path.resolve(partial.path, filename);
          const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
          });
          const partialName = filename.split('.')[0];

          Handlebars.registerPartial(
            `${partial.name}/${partialName}`,
            templateFileContent,
          );
        });
      }),
    );
  }

  private async registerHelpers(): Promise<void> {
    Handlebars.registerHelper(
      'isBigger',
      (arg1, arg2) => Number(arg1) > Number(arg2),
    );
    Handlebars.registerHelper('isEqual', (arg1, arg2) => arg1 === arg2);
  }
}
