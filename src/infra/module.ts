import { container } from 'tsyringe';

import { UsersService } from '@domain/accounts/application/services/users.service';
import { PasswordRecoveryTokensService } from '@domain/accounts/application/services/password-recovery-tokens.service';
import { OnUserCreated } from '@domain/emails/application/subscribers/on-user-created';
import { AnimalsService } from '@domain/adoption/application/services/animals.service';
import { InterestsService } from '@domain/adoption/application/services/interests.service';
import { PrismaUsersRepository } from './database/prisma/repositories/prisma-users.repository';
import { PrismaService } from './database/prisma/prisma.service';
import { BcryptHasher } from './gateways/bcrypt-hasher';
import { JwtEncrypter } from './gateways/jwt-encrypter';
import { PrismaPasswordRecoveryTokensRepository } from './database/prisma/repositories/prisma-password-recovery-tokens.repository';
import { HandlebarsMailTemplate } from './gateways/handlebars-mail-template';
import { MailtrapMail } from './gateways/mailtrap-mail';
import { DiskStorage } from './gateways/disk-storage';
import { PrismaAnimalsRepository } from './database/prisma/repositories/prisma-animals.repository';
import { PrismaInterestsRepository } from './database/prisma/repositories/prisma-interests.repository';

// Repositories
container.registerSingleton('PrismaService', PrismaService);
container.registerSingleton('UsersRepository', PrismaUsersRepository);
container.registerSingleton(
  'PasswordRecoveryTokensRepository',
  PrismaPasswordRecoveryTokensRepository,
);
container.registerSingleton('AnimalsRepository', PrismaAnimalsRepository);
container.registerSingleton('InterestsRepository', PrismaInterestsRepository);

// Gateways
container.registerSingleton('HasherGateway', BcryptHasher);
container.registerSingleton('EncrypterGateway', JwtEncrypter);
container.registerSingleton('MailGateway', MailtrapMail);
container.registerSingleton('MailTemplateGateway', HandlebarsMailTemplate);
container.registerSingleton('StorageGateway', DiskStorage);

// Services
container.registerSingleton('UsersService', UsersService);
container.registerSingleton(
  'PasswordRecoveryTokensService',
  PasswordRecoveryTokensService,
);
container.registerSingleton('AnimalsService', AnimalsService);
container.registerSingleton('InterestsService', InterestsService);

// Events
container.registerSingleton('OnUserCreated', OnUserCreated);
