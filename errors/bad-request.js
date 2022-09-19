import pkg from 'http-status-codes'

import CustomAPIError from './custom-api.js'

class BadRequestError extends CustomAPIError {

  constructor(message) {
    super(message)
    this.statusCode = pkg.StatusCodes.BAD_REQUEST
  }
}

export default BadRequestError
