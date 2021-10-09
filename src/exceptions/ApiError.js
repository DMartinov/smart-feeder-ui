export const errorType = {
  /**
   * Server validation errors
   *  */
  validation: 'validation',
  /**
   * Network error
   *  */
  network: 'network',
  /**
   * Server responded with 4xx or 5xx
   *  */
  server: 'server',
  unknown: 'unknown',
};

export default class ApiError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.errors = errors;
  }
}
