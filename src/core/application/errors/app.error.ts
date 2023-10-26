import { STATUS_CODES } from 'node:http';

export abstract class AppError extends Error {
  private _type: string;

  private _code: string | null;

  private _statusCode: number;

  private _timestamp: Date = new Date();

  constructor(message: string, statusCode: number) {
    super(message);

    this._type = this.constructor.name;
    this._code = STATUS_CODES[statusCode] ?? null;
    this._statusCode = statusCode;
  }

  get statusCode() {
    return this._statusCode;
  }

  public format() {
    return {
      error: {
        type: this._type,
        message: this.message,
        code: this._code,
        statusCode: this.statusCode,
        timestamp: this._timestamp,
      },
    };
  }
}
