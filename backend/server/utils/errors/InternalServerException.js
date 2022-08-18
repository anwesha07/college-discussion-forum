class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.body = {
      status: 'failure',
      message: message || 'Internal Server Error',
    };
  }
}

module.exports = NotFoundException;
