interface ApiErrorDetails {
  field?: string;
  message: string;
  value?: any;
}

class ApiError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly errors: ApiErrorDetails[] | string[];
  public readonly data: null;
  public readonly success: false;

  constructor(
    statusCode: number,
    message: string = "Something went wrong!",
    errors: ApiErrorDetails[] | string[] = [],
    stack: string = ""
  ) {
    super(message);

    Object.setPrototypeOf(this, ApiError.prototype);

    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;