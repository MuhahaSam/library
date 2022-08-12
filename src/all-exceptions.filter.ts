import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger} from '@nestjs/common';

import _ from 'lodash';
import {capitalize} from 'nestjs-api-tools';
// import {fileReplacer} from '@/utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  private readonly logger = new Logger(AllExceptionsFilter.name);

  private static resolveError(statusCode: number): string {
    switch (true) {
      case statusCode === HttpStatus.BAD_REQUEST:
        return 'Bad Request';
      case statusCode === HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case statusCode === HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case statusCode === HttpStatus.NOT_FOUND:
        return 'Not Found';
      case statusCode === HttpStatus.NOT_ACCEPTABLE:
        return 'Not Acceptable';
      case statusCode === HttpStatus.CONFLICT:
        return 'Conflict';
      case statusCode === HttpStatus.PAYLOAD_TOO_LARGE:
        return 'Payload too large';
      case statusCode === HttpStatus.METHOD_NOT_ALLOWED:
        return 'Method Not Allowed';
      case statusCode === HttpStatus.UNSUPPORTED_MEDIA_TYPE:
        return 'Unsupported Media Type';
      case statusCode === HttpStatus.UNPROCESSABLE_ENTITY:
        return 'Unprocessable Entity';
      case statusCode === HttpStatus.BAD_GATEWAY:
        return 'Bad Gateway';
      case statusCode === HttpStatus.GATEWAY_TIMEOUT:
        return 'Gateway Timeout';
      default:
        return 'Internal Server Error';
    }
  }

  private static resolveStatusCode(exception: any): number {
    if (_.isObject(exception) && 'getStatus' in exception) {
      return (exception as any).getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  public async catch(exception: Error | any, host: ArgumentsHost): Promise<any> {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const statusCode = AllExceptionsFilter.resolveStatusCode(exception);
    const error = AllExceptionsFilter.resolveError(statusCode);

    const message = await this.resolveMessage(exception);

    this.logger.error(
      `${req.connection.remoteAddress}, ${req.method}, ${req.path}
      HEADERS: ${JSON.stringify(req.headers, undefined, 2)}
      USER: ${JSON.stringify(req.user, undefined, 2)}
      BODY: ${JSON.stringify(req.body, undefined, 2)}
      ${exception?.constructor?.name}
      ${exception?.stack}`,
    );

    const body = {
      statusCode,
      error,
      message,
    };

    return res.status(statusCode).json(body as any);
  }

  private async resolveMessage(exception: any): Promise<string | string[]> {
    if (Array.isArray(exception?.response?.message)) {
      return exception.response.message;
    }

    let message = (typeof exception.message === 'string' || exception.message instanceof String) ? exception.message : exception.message.message;

    /**
     * Кейс, когда сам @nestjs/passport кидает исключение в случае отсутствия токена.
     */
    if (message === 'Unauthorized') {
      message = 'Пользователь не авторизован';
    }

    return capitalize(message);
  }
}
