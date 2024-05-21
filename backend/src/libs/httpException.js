export class HttpError extends Error {
  constructor({ type, status, message }) {
    super();
    this.type = type;
    this.status = status;
    this.message = message;
  }
}

/**
 * 클라이언트가 잘못된 요청을 했을 때
 */
export class BadRequestException extends HttpError {
  constructor(message) {
    super({ type: 'BadRequest', status: 400, message: message });
  }
}

/**
 * 인증토큰 만료 등 접근이 불가할 때
 */
export class UnauthorizedException extends HttpError {
  constructor(message) {
    super({ type: 'Unauthorized', status: 401, message: message });
  }
}

/**
 * 리소스 접근 권한이 없을 때
 */
export class ForbiddenException extends HttpError {
  constructor(message) {
    super({ type: 'Forbidden', status: 403, message: message });
  }
}

/**
 * 리소스가 존재하지 않을 때
 */
export class NotFoundException extends HttpError {
  constructor(message) {
    super({ type: 'NotFound', status: 404, message: message });
  }
}

/**
 * 리소스 중복이 발생할 때
 */
export class ConflictException extends HttpError {
  constructor(message) {
    super({ type: 'Conflict', status: 409, message: message });
  }
}

/**
 * 서버 구현이 잘못 됐음
 */
export class InternalServerException extends HttpError {
  constructor(message) {
    super({ type: 'InternalServerError', status: 500, message: message });
  }
}

/**
 * 서버 구현이 아직 덜 됐음
 */
export class NotImplementedException extends HttpError {
  constructor(message) {
    super({ type: 'NotImplemented', status: 501, message: message });
  }
}

// TODO: 필요한 에러 확장해서 사용 가능
