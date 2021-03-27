import {
  TOKEN_KEY,
  getAuthorization,
  setAuthorization,
  removeAuthorization,
} from 'utils/authCookie';
import { get, post } from 'utils/apiClient';

export async function login({ email, password }) {
  const response = await post('users/login', { body: { email, password } });
  if (response.status < 400) setAuthorization(response.data.token.token);
  return response;
}

export async function logout() {
  // const { response } = await del('logout');
  removeAuthorization();
  return { status: 'success' };
}

export async function getUser() {
  const token = getAuthorization();
  if (!token) return process.env.TOKEN;

  const response = await get('user');

  if (response.status >= 400) {
    removeAuthorization(TOKEN_KEY);
    return null;
  }

  const {
    data: { user },
  } = response;
  return user;
}
