export function fullName({ firstName, middleName, lastName } = {}) {
  if (!firstName && !lastName) return 'N/A';

  const middleNameString = middleName ? middleName : '';
  return `${firstName} ${middleNameString} ${lastName}`;
}
