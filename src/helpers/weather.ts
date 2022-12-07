const API_KEY = import.meta.env.VITE_API_KEY;
const GEOCODING_API = import.meta.env.VITE_GEOCODING_API;
const WEATHER_API = import.meta.env.VITE_WEATHER_API;

export async function searchCity(city: string) {
  const url = `${GEOCODING_API}?q=${city}&limit=5&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function getCityWeather(lat: number, lon: number) {
  const url = `${WEATHER_API}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export function convertCelsiusToFahrenheit(temp: number) {
  return Math.round(temp * 1.8 + 32);
}
