import { get, post, put } from 'utils/apiClient';

export async function getUser(id) {
  return get(`users/${id}`);
}

export async function getAll(params = null) {
  return get('users', { params });
}

export async function listAllUser(params) {
  return get('users/list-all', { params });
}

export async function associateUser(params) {
  return post('enterprise/associate-user', { body: params });
}

export async function addUser(params) {
  return post('users', { body: params });
}

export async function getUserDetails() {
  return get('users/details');
}

export async function getUserDetailsById(id) {
  return get(`users/${id}/details`);
}

export async function updateUserDetails(data) {
  return put('users/details', { body: data });
}

export async function getUserDetailsExcel(userId) {
  return get(`users/${userId}/download-details`, { responseType: 'blob' });
}
export async function getUserResume(userId) {
  return post(`users/${userId}/resume`, { responseType: 'blob' });
}

export async function getUserCredentials(userId) {
  return get(`users/${userId}/generate_credentials`);
}

export async function saveIdentificationImage(data) {
  return post('users/identification_image', {
    body: data,
  });
}
