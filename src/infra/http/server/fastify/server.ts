import fastify, { FastifyInstance } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { AppServer } from '..';
import { FastifyRegisterUserController } from './controllers/fastify-register-user.controller';
import { FastifyAuthenticateUserController } from './controllers/fastify-authenticate-user.controller';
import { FastifyRecoverPasswordWithEmailController } from './controllers/fastify-recover-password-with-email.controller';

import { fastifyVerifyAuthorization } from './middlewares/fastify-verify-authorization.middleware';
import { FastifyResetPasswordWithTokenController } from './controllers/fastify-reset-password-with-token.controller';
import { FastifyShowProfileController } from './controllers/fastify-show-profile.controller';
import { FastifyUpdateProfileController } from './controllers/fastify-update-user.controller';
import { FastifyUpdateUserAvatarController } from './controllers/fastify-update-user-avatar.controller';
import { FastifyResetPasswordWithCurrentPasswordController } from './controllers/fastify-reset-password-with-current-password.controller';
import { FastifyRegisterAnimalForAdoptionController } from './controllers/fastify-register-animal-for-adoption.controller';
import { FastifyShowAnimalDetailsController } from './controllers/fastify-show-animal-details.controller';
import { FastifyMarkAnimalAsAdoptedController } from './controllers/fastify-mark-animal-as-adopted.controller';
import { FastifyUpdateAnimalDetailsController } from './controllers/fastify-update-animal-details.controller';
import { FastifyFetchOwnerAnimalsController } from './controllers/fastify-fetch-owner-animals.controller';
import { FastifyFetchAvailableAnimalsController } from './controllers/fastify-fetch-available-animals.controller';
import { FastifyReportIrregularAnimalController } from './controllers/fastify-report-irregular-animal.controller';
import { FastifyDemonstrateInterestInAnimalController } from './controllers/fastify-demonstrate-interest-in-animal.controller';
import { FastifyFetchInterestsFromUserController } from './controllers/fastify-fetch-interests-from-user.controller';
import { FastifyFetchInterestsInAnimalController } from './controllers/fastify-fetch-interests-in-animal.controller';
import { FastifyFetchNotificationsController } from './controllers/fastify-fetch-notifications.controller';

export class FastifyServer implements AppServer {
  private _server: FastifyInstance;

  private constructor() {
    this._server = fastify();
  }

  static create(): FastifyServer {
    return new FastifyServer();
  }

  public async listen(port: number): Promise<void> {
    await this.registerHandlers();
    await this.registerRoutes();

    try {
      await this._server.listen({ port });
      console.log(`Server running on port ${port}`);
    } catch (error) {
      this._server.log.error(error);
      process.exit(1);
    }
  }

  private async registerHandlers(): Promise<void> {
    this._server.register(fastifyMultipart);
  }

  private async registerRoutes(): Promise<void> {
    await this.publicRoutes();
    await this.privateRoutes();
  }

  private async publicRoutes(): Promise<void> {
    const controllers = [
      {
        controller: new FastifyRegisterUserController(),
        method: 'post',
        path: '/accounts',
      },
      {
        controller: new FastifyAuthenticateUserController(),
        method: 'post',
        path: '/accounts/auth',
      },
      {
        controller: new FastifyRecoverPasswordWithEmailController(),
        method: 'post',
        path: '/accounts/forgot-password',
      },
      {
        controller: new FastifyResetPasswordWithTokenController(),
        method: 'post',
        path: '/accounts/reset-password',
      },
      {
        controller: new FastifyFetchAvailableAnimalsController(),
        method: 'get',
        path: '/animals',
      },
    ];

    controllers.forEach(({ controller, method, path }) => {
      this._server[method](path, controller.handle);
    });
  }

  private async privateRoutes(): Promise<void> {
    this._server.register((instance, _, done) => {
      instance.addHook('preHandler', fastifyVerifyAuthorization);

      const controllers = [
        {
          controller: new FastifyShowProfileController(),
          method: 'get',
          path: '/profile',
        },
        {
          controller: new FastifyUpdateProfileController(),
          method: 'put',
          path: '/profile',
        },
        {
          controller: new FastifyUpdateUserAvatarController(),
          method: 'patch',
          path: '/profile/avatar',
        },
        {
          controller: new FastifyResetPasswordWithCurrentPasswordController(),
          method: 'patch',
          path: '/profile/password',
        },
        {
          controller: new FastifyFetchOwnerAnimalsController(),
          method: 'get',
          path: '/profile/animals',
        },
        {
          controller: new FastifyFetchInterestsFromUserController(),
          method: 'get',
          path: '/profile/interests',
        },
        {
          controller: new FastifyRegisterAnimalForAdoptionController(),
          method: 'post',
          path: '/animals',
        },
        {
          controller: new FastifyShowAnimalDetailsController(),
          method: 'get',
          path: '/animals/:animalId',
        },
        {
          controller: new FastifyUpdateAnimalDetailsController(),
          method: 'put',
          path: '/animals/:animalId',
        },
        {
          controller: new FastifyMarkAnimalAsAdoptedController(),
          method: 'patch',
          path: '/animals/:animalId/adopt',
        },
        {
          controller: new FastifyReportIrregularAnimalController(),
          method: 'post',
          path: '/animals/:animalId/report',
        },
        {
          controller: new FastifyFetchInterestsInAnimalController(),
          method: 'patch',
          path: '/animals/:animalId/interests',
        },
        {
          controller: new FastifyDemonstrateInterestInAnimalController(),
          method: 'post',
          path: '/animals/:animalId/demonstrate-interest',
        },
        {
          controller: new FastifyFetchNotificationsController(),
          method: 'get',
          path: '/notifications',
        },
      ];

      controllers.forEach(({ controller, method, path }) => {
        instance[method](path, controller.handle);
      });

      done();
    });
  }

  get server(): FastifyInstance {
    return this._server;
  }
}
