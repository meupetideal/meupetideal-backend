export abstract class Controller {
  abstract handle(request: unknown, response: unknown): Promise<unknown>;
}
