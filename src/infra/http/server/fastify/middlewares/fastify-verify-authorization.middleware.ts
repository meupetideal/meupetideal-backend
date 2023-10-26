import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { verify } from 'jsonwebtoken';
import { AuthenticationTokenExpiredError } from 'src/infra/http/errors/authentication-token-expired.error';

export const fastifyVerifyAuthorization = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AuthenticationTokenExpiredError();
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new AuthenticationTokenExpiredError();
  }

  try {
    const secretKey = process.env.APP_SECRET ?? '';

    const decoded = verify(token, secretKey);

    const { sub: id } = decoded;

    (request as any).user = { id };

    return done();
  } catch {
    throw new AuthenticationTokenExpiredError();
  }
};
