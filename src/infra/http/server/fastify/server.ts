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
    const registerUser = new FastifyRegisterUserController();
    this._server.post('/accounts', registerUser.handle);

    const authenticateUser = new FastifyAuthenticateUserController();
    this._server.post('/accounts/auth', authenticateUser.handle);

    const recoverPasswordWithEmail =
      new FastifyRecoverPasswordWithEmailController();
    this._server.post(
      '/accounts/forgot-password',
      recoverPasswordWithEmail.handle,
    );

    const resetPasswordWithToken =
      new FastifyResetPasswordWithTokenController();
    this._server.post(
      '/accounts/reset-password',
      resetPasswordWithToken.handle,
    );

    const fetchAvailableAnimals = new FastifyFetchAvailableAnimalsController();
    this._server.get('/animals', fetchAvailableAnimals.handle);
  }

  private async privateRoutes(): Promise<void> {
    this._server.register((instance, _, done) => {
      instance.addHook('preHandler', fastifyVerifyAuthorization);

      const showProfile = new FastifyShowProfileController();
      instance.get('/profile', showProfile.handle);

      const updateProfile = new FastifyUpdateProfileController();
      instance.put('/profile', updateProfile.handle);

      const updateUserAvatar = new FastifyUpdateUserAvatarController();
      instance.patch('/profile/avatar', updateUserAvatar.handle);

      const resetPasswordWithCurrentPassword =
        new FastifyResetPasswordWithCurrentPasswordController();
      instance.patch(
        '/profile/password',
        resetPasswordWithCurrentPassword.handle,
      );

      const fetchOwnerAnimals = new FastifyFetchOwnerAnimalsController();
      instance.get('/profile/animals', fetchOwnerAnimals.handle);

      const fetchInterestsFromUser =
        new FastifyFetchInterestsFromUserController();
      instance.get('/profile/interests', fetchInterestsFromUser.handle);

      const registerAnimalForAdoption =
        new FastifyRegisterAnimalForAdoptionController();
      instance.post('/animals', registerAnimalForAdoption.handle);

      const showAnimalDetails = new FastifyShowAnimalDetailsController();
      instance.get('/animals/:animalId', showAnimalDetails.handle);

      const updateAnimalDetails = new FastifyUpdateAnimalDetailsController();
      instance.put('/animals/:animalId', updateAnimalDetails.handle);

      const markAnimalAsAdopted = new FastifyMarkAnimalAsAdoptedController();
      instance.patch('/animals/:animalId/adopt', markAnimalAsAdopted.handle);

      const reportIrregularAnimal =
        new FastifyReportIrregularAnimalController();
      instance.post('/animals/:animalId/report', reportIrregularAnimal.handle);

      const fetchInterestsInAnimal =
        new FastifyFetchInterestsInAnimalController();
      instance.get(
        '/animals/:animalId/interests',
        fetchInterestsInAnimal.handle,
      );

      const demonstrateInterestInAnimal =
        new FastifyDemonstrateInterestInAnimalController();
      instance.post(
        '/animals/:animalId/demonstrate-interest',
        demonstrateInterestInAnimal.handle,
      );

      const fetchNotifications = new FastifyFetchNotificationsController();
      instance.get('/notifications', fetchNotifications.handle);

      done();
    });
  }

  get server(): FastifyInstance {
    return this._server;
  }
}
