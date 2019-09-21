import ExtendableError from 'extendable-error-class';

class HttpError extends ExtendableError {
  constructor(response, data) {
    super(`${response.status} ${response.statusText} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
    this.data = data;
  }
}

class NetworkError extends ExtendableError {
  constructor(error, url) {
    super(`${error.message}`);
    this.name = 'NetworkError';
    this.message = error.message;
    this.url = url;
  }
}

export {
  HttpError,
  NetworkError
};
