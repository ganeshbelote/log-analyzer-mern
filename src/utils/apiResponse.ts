class ApiResponse<T = any> {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: T | null;
  public readonly success: boolean;

  constructor(
    statusCode: number,
    message: string = "Success",
    data: T | null = null
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;