import { get, post } from 'utils/apiClient';

export function getMyExperiences() {
  return get('experiences');
}

export function createExperience(params) {
  return post('experiences', { body: params });
}

export function getExperience(userId) {
  return get(`users/${userId}/experiences`);
}
