
import { request as jsonApiRequest, fetch as jsonApiFetch } from './json-api';

const BASE_URL = 'https://codemotion-bea.herokuapp.com/api';

const concatPath = endpoint => realtivePath => `${endpoint}/${realtivePath}`;

const fetch = async (request) => jsonApiFetch(request);

const request = (url, options) => {
  const req = jsonApiRequest(url, options);
  return req;
};


export default {
  getPath: concatPath(BASE_URL),
  request,
  fetch
};
