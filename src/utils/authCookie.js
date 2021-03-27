export const TOKEN_KEY = '__hold_acc_token__';

export function getAuthorization() {
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAuthorization(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthorization() {
  return window.localStorage.removeItem(TOKEN_KEY);
}
