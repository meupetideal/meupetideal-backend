import { Routes } from './express/routes';
import { ExpressServer } from './express/server';

export abstract class AppServer {
  public abstract listen(port: number): Promise<void>;
}

export class ServerFactory {
  public static async create(): Promise<AppServer> {
    const { router } = Routes.create();
    const app = ExpressServer.create(router);

    return app;
  }
}
