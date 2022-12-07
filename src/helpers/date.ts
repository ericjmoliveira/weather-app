export function getCityCurrentTime(timezone: number) {
  const date = new Date(new Date().getTime() + timezone * 1000);
  const day = date.toDateString().slice(0, 3);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  return `${day}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function getCityLocalTime(timezone: number, seconds: number) {
  const date = new Date(new Date(seconds * 1000).getTime() + timezone * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function formatLocalTime(seconds: number) {
  const date = new Date(seconds * 1000).toLocaleString();

  return `${date.slice(0, 5)} ${date.slice(10, 16)}`;
}
