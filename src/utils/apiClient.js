import axios from 'axios';
import { getAuthorization } from 'utils/authCookie';
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

async function request(path, method, { body, ...customConfig } = {}) {
  const token = getAuthorization();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    url: BASE_URL + path,
  };

  if (body) {
    config.data = body;
  }

  let response;
  try {
    response = await axios.request(config);
  } catch (e) {
    console.error(e);
    response = e.response;
  }

  return response;
}

export async function get(path, config) {
  return request(path, 'GET', config);
}

export async function post(path, config) {
  return request(path, 'POST', config);
}

export async function put(path, config) {
  return request(path, 'PUT', config);
}

export async function patch(path, config) {
  return request(path, 'PATCH', config);
}

export async function del(path, config) {
  return request(path, 'DELETE', config);
}
