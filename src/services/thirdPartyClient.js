import { get, post, patch } from 'utils/apiClient';

export async function getAll() {
  return get('third_parties');
}

export async function add(params) {
  return post('third_parties', { body: params });
}

export async function show(id) {
  return get(`third_parties/${id}`);
}

export async function resetPassword(params) {
  return patch(`third_parties/${params.id}/generate_credentials`);
}
