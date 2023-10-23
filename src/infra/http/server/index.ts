import { FastifyServer } from './fastify/server';

export abstract class AppServer {
  public abstract listen(port: number): Promise<void>;
}

export class ServerFactory {
  public static async create(): Promise<AppServer> {
    return FastifyServer.create();
  }
}
