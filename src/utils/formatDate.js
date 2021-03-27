function padNumber(number) {
  return `${number}`.padStart(2, '0');
}

export default function formatDate(isoString) {
  const date = new Date(isoString);
  const day = padNumber(date.getDate());
  const month = padNumber(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
