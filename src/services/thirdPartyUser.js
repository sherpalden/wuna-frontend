import { get, post, put } from 'utils/apiClient';

export async function getAll() {
  return get('third-party-users');
}

export async function createThirdPartyUser(params) {
  return post('third-party-users', { body: params });
}

export async function updateThirdPartyUser(id, params) {
  return put(`third-party-users/${id}`, { body: params });
}
