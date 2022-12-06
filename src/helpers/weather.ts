const API_KEY = import.meta.env.VITE_API_KEY;
const GEOCODING_API = import.meta.env.VITE_GEOCODING_API;
const WEATHER_API = import.meta.env.VITE_WEATHER_API;

export async function searchCity(city: string) {
  const response = await fetch(`${GEOCODING_API}?q=${city}&limit=5&appid=${API_KEY}`);
  const data = await response.json();

  return data;
}

export async function getCityWeather(lat: number, lon: number) {
  const response = await fetch(`${WEATHER_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  const data = await response.json();

  return data;
}
