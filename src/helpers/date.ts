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
  const date = new Date(seconds * 1000);

  const month = date.getMonth() + 1;
  const day = date.getDate() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedTime;
}
