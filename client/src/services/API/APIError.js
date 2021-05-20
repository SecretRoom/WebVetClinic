export class APIError extends Error {
  constructor(data) {
    super();
    this.status = data.status;
    this.name = 'APIError';
    this.message = data.message;
    this.data = data;
  }
}
