import { get, post } from 'utils/apiClient';

export async function add(params) {
  return post('documents', {
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export async function getAll() {
  return get('documents');
}
