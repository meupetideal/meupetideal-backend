import { container } from 'tsyringe';

import { UsersService } from '@domain/accounts/application/services/users.service';
import { PasswordRecoveryTokensService } from '@domain/accounts/application/services/password-recovery-tokens.service';
import { OnUserCreated } from '@domain/emails/application/subscribers/on-user-created';
import { AnimalsService } from '@domain/adoption/application/services/animals.service';
import { InterestsService } from '@domain/adoption/application/services/interests.service';
import { MailService } from '@domain/emails/application/services/mail.service';
import { OnPasswordRecoveryTokenCreated } from '@domain/emails/application/subscribers/on-password-recovery-token-created';
import { OnAnimalInterestDemonstrated } from '@domain/notifications/application/subscribers/on-animal-interest-demonstrated';
import { SendNotificationUseCase } from '@domain/notifications/application/use-cases/send-notification.use-case';
import { PrismaUsersRepository } from './database/prisma/repositories/prisma-users.repository';
import { PrismaService } from './database/prisma/prisma.service';
import { BcryptHasher } from './gateways/bcrypt-hasher';
import { JwtEncrypter } from './gateways/jwt-encrypter';
import { PrismaPasswordRecoveryTokensRepository } from './database/prisma/repositories/prisma-password-recovery-tokens.repository';
import { HandlebarsMailTemplate } from './gateways/handlebars-mail-template';
import { PrismaAnimalsRepository } from './database/prisma/repositories/prisma-animals.repository';
import { PrismaInterestsRepository } from './database/prisma/repositories/prisma-interests.repository';
import { PrismaNotificationsRepository } from './database/prisma/repositories/prisma-notifications.repository';
import { PrismaAnimalPhotosRepository } from './database/prisma/repositories/prisma-animal-photos.repository';
import { ZohoMail } from './gateways/zoho-mail';
import { PrismaRefreshTokensRepository } from './database/prisma/repositories/prisma-refresh-tokens.repository';
import { FirebaseStorage } from './gateways/firebase-storage';
import { MailtrapMail } from './gateways/mailtrap-mail';

// Events
container.registerSingleton('OnUserCreated', OnUserCreated);
container.registerSingleton(
  'OnPasswordRecoveryTokenCreated',
  OnPasswordRecoveryTokenCreated,
);
container.registerSingleton(
  'OnAnimalInterestDemonstrated',
  OnAnimalInterestDemonstrated,
);

// Repositories
container.registerSingleton('PrismaService', PrismaService);
container.registerSingleton('UsersRepository', PrismaUsersRepository);
container.registerSingleton(
  'PasswordRecoveryTokensRepository',
  PrismaPasswordRecoveryTokensRepository,
);
container.registerSingleton(
  'RefreshTokensRepository',
  PrismaRefreshTokensRepository,
);
container.registerSingleton(
  'AnimalPhotosRepository',
  PrismaAnimalPhotosRepository,
);
container.registerSingleton('AnimalsRepository', PrismaAnimalsRepository);
container.registerSingleton('InterestsRepository', PrismaInterestsRepository);
container.registerSingleton(
  'NotificationsRepository',
  PrismaNotificationsRepository,
);

// Gateways
const mailGateways = { zoho: ZohoMail, mailtrap: MailtrapMail };
const mailGateway = mailGateways[process.env.MAIL_GATEWAY ?? 'mailtrap'];
container.registerSingleton('MailGateway', mailGateway);

container.registerSingleton('HasherGateway', BcryptHasher);
container.registerSingleton('EncrypterGateway', JwtEncrypter);
container.registerSingleton('MailTemplateGateway', HandlebarsMailTemplate);
container.registerSingleton('StorageGateway', FirebaseStorage);

// Services
container.registerSingleton('MailService', MailService);
container.registerSingleton('UsersService', UsersService);
container.registerSingleton(
  'PasswordRecoveryTokensService',
  PasswordRecoveryTokensService,
);
container.registerSingleton('AnimalsService', AnimalsService);
container.registerSingleton('InterestsService', InterestsService);

// UseCases
container.registerSingleton('SendNotificationUseCase', SendNotificationUseCase);

// Subscribers
container.resolve(OnUserCreated);
container.resolve(OnPasswordRecoveryTokenCreated);
container.resolve(OnAnimalInterestDemonstrated);
