import { get, post, patch } from 'utils/apiClient';

export async function getAll() {
  return get('enterprises');
}

export async function add(params) {
  return post('enterprises', { body: params });
}

export async function show(id) {
  return get(`enterprises/${id}`);
}

export async function resetPassword(params) {
  return patch(`enterprises/${params.id}/generate_credentials`);
}

export async function search(params) {
  return get('enterprises/search', { params: { ...params } });
}
