import { AppError } from './app.error';

class StubError extends AppError {}

describe('AppError', () => {
  test('constructor', () => {
    const message = 'Test error';
    const statusCode = 404;
    const error = new StubError(message, statusCode);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
  });

  test('format()', () => {
    const message = 'Test error';
    const statusCode = 404;

    const error = new StubError(message, statusCode);

    const formattedError = error.format();

    expect(formattedError.error.type).toBe('StubError');
    expect(formattedError.error.message).toBe(message);
    expect(formattedError.error.code).toBe('Not Found');
    expect(formattedError.error.statusCode).toBe(statusCode);
    expect(formattedError.error.timestamp).toBeInstanceOf(Date);
  });
});
