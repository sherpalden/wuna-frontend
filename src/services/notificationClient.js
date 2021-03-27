import { get, patch } from 'utils/apiClient';

export async function getAll() {
  return get('notifications');
}

export async function updateNotification(id) {
  return patch(`notifications/${id}`);
}
