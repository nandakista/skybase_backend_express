export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly error: string
  ) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends AppError {
  constructor(code = "NOT_FOUND", message = "Resource not found") {
    super(404, code, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(code = "UNAUTHORIZED", message = "Unauthorized") {
    super(401, code, message);
  }
}

export class BadRequestError extends AppError {
  constructor(code = "BAD_REQUEST", message = "Bad request") {
    super(400, code, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(code = "FORBIDDEN", message = "Forbidden") {
    super(403, code, message);
  }
}

export class ConflictError extends AppError {
  constructor(code = "CONFLICT", message = "Resource already exists") {
    super(409, code, message);
  }
}

export class ValidationError extends AppError {
  constructor(code = "VALIDATION_ERROR", message = "Validation failed") {
    super(422, code, message);
  }
}

export class PayloadTooLargeError extends AppError {
  constructor(message = "Payload too large") {
    super(413, "PAYLOAD_TOO_LARGE", message);
  }
}

export class TimeoutError extends AppError {
  constructor(message = "Request timeout") {
    super(408, "REQUEST_TIMEOUT", message);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = "Service unavailable") {
    super(503, "SERVICE_UNAVAILABLE", message);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(500, "INTERNAL_SERVER_ERROR", message);
  }
}
