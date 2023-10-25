import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { verify } from 'jsonwebtoken';

export const fastifyVerifyAuthorization = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return reply.status(401).send({ error: 'token-invalid' });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return reply.status(401).send({ error: 'token-invalid' });
  }

  try {
    const secretKey = process.env.APP_SECRET ?? '';

    const decoded = verify(token, secretKey);

    const { sub: id } = decoded;

    (request as any).user = { id };

    return done();
  } catch {
    return reply.status(401).send({ error: 'token-expired' });
  }
};
