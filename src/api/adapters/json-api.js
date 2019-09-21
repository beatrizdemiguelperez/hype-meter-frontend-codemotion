import { HttpError, NetworkError } from '../errors';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new HttpError(response, data);
  }

  return data;
};

const fetch = async (request) => {
  let response;

  try {
    response = await window.fetch(request);
  } catch (e) {
    throw new NetworkError(e, request.url);
  }

  const data = await handleResponse(response);

  return data;
};

const request = (url, options) => {
  const init = options;
  const objectHeaders = options.headers;
  const headers = new Headers({ ...objectHeaders });
  const contentType = 'application/json';

  headers.append('Content-Type', contentType);
  headers.append('Accept', contentType);

  init.headers = headers;
  if (options.body) {
    init.body = options.body && JSON.stringify(options.body);
  }

  return new Request(url, init);
};

export {
  request,
  fetch,
  handleResponse
};
