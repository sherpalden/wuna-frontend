export const ThirdPartyUserStatus = Object.freeze({
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  all() {
    return [this.REQUESTED, this.ACCEPTED, this.REJECTED];
  },
});
