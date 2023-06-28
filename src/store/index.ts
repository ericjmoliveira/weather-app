import create from 'zustand';

import { Store } from '../interfaces';
import { getPreferences, storagePreferences } from '../helpers/storage';
import { getCityWeather, searchCity } from '../helpers/weather';

export const useStore = create<Store>((set, get) => ({
  weather: null,
  search: {
    state: false
  },
  page: 'HOME',
  userPreferences: {
    unit: '°C'
  },
  loading: true,
  async retrieveWeatherData() {
    const preferences = getPreferences();

    if (!preferences || !preferences.location) {
      return set(() => ({ loading: false, page: 'HOME' }));
    }

    const data = await getCityWeather(preferences.location.lat, preferences.location.lon);

    set(() => ({
      weather: { name: preferences.location.city, data },
      userPreferences: preferences,
      loading: false,
      page: 'WEATHER'
    }));
  },
  async showWeatherData(city: string, lat: number, lon: number) {
    set(() => ({ loading: true }));

    const data = await getCityWeather(lat, lon);
    const userPreferences = get().userPreferences;
    userPreferences.location = { city, lat, lon };

    set(() => ({
      weather: { name: city, data },
      page: 'WEATHER',
      userPreferences,
      search: { state: false, results: undefined },
      loading: false
    }));
    storagePreferences(userPreferences);
  },
  async searchCity(name: string) {
    const data = await searchCity(name);

    set(() => ({ search: { state: true, results: data } }));
  },
  updateUserPreferences(preferences) {
    storagePreferences(preferences);
    set(() => ({ userPreferences: preferences }));
  },
  handlePage(current: 'HOME' | 'WEATHER' | 'PREFERENCES') {
    set(() => ({ page: current }));
  }
}));
