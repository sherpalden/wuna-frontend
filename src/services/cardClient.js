import { get, post, patch } from 'utils/apiClient';

export async function getAllCards() {
  return get('cards');
}

export async function addCard(params) {
  return post('cards', { body: params });
}

export async function updateCard(id, body) {
  return patch(`cards/${id}`, { body });
}
export async function getCard(id) {
  return get(`cards/${id}`);
}

export async function getMyCard() {
  return get('card');
}
