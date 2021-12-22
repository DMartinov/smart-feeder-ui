export default class ApiError extends Error {
  constructor(message, errors = [], status = null) {
    super(message);
    this.errors = errors;
    this.status = status;
  }

  static UnauthorizedError() {
    return new ApiError('User not authorized', null, 401);
  }
}
