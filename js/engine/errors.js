export class ValidationError extends Error {
  /**
   *
   * @param {String} message
   */
  constructor(message) {
    this.message = message
    this.name = 'ValidationError'
  }
}

export class NotImplementedError extends Error {
  /**
   *
   * @param {string} message
   */
  constructor(message) {
    this.message = message
    this.name = 'NotImplementedError'
  }
}

export class InternalError extends Error {
  /**
   *
   * @param {string} message
   */
  constructor(message) {
    this.message = message
    this.name = 'InternalError'
  }
}
