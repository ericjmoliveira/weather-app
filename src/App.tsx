import { useEffect, useState } from 'react';

import { searchCity, getCityWeather } from './helpers/weather';
import { Weather, Search, Screen, UserPreferences } from './interfaces';
import { Intro } from './components/Intro';
import { WeatherData } from './components/WeatherData';
import { Preferences } from './components/Preferences';
import { Loading } from './components/Loading';

export default function App() {
  const [weather, setWeather] = useState<Weather>();
  const [search, setSearch] = useState<Search>({ state: false });
  const [preferences, setPreferences] = useState<UserPreferences>();
  const [screen, setScreen] = useState<Screen>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem('preferences')!);

    if (prefs) {
      showWeatherData(prefs.location.city, prefs.location.lat, prefs.location.lon);
      setPreferences(prefs);
    } else {
      setScreen({ current: 'INTRO' });
    }

    setLoading(false);
  }, []);

  const handlePreferences = (unit: '°C' | '°F') => {
    localStorage.setItem('preferences', JSON.stringify({ ...preferences, unit }));
    setPreferences({ ...preferences, unit });
  };

  const handleScreen = (screen: Screen) => {
    setScreen(screen);
  };

  const handleForm = async (data: { city: string }) => {
    const results = await searchCity(data.city);

    setSearch({ state: true, results });
  };

  const showWeatherData = async (city: string, lat: number, lon: number) => {
    if (!localStorage.getItem('preferences')) {
      localStorage.setItem(
        'preferences',
        JSON.stringify({ ...preferences!, unit: '°C', location: { city, lat, lon } })
      );
    }

    setPreferences({ ...preferences!, location: { city, lat, lon } });

    const weather = await getCityWeather(lat, lon);

    setWeather({ name: city, data: weather });
    setScreen({ current: 'WEATHER' });
    setSearch({ state: false, results: undefined });
  };

  if (loading) return <Loading />;

  return (
    <main className="mx-auto p-6 md:w-1/2">
      {screen?.current === 'INTRO' && (
        <Intro
          search={search}
          preferences={preferences!}
          handleForm={handleForm}
          handleScreen={handleScreen}
          showWeatherData={showWeatherData}
        />
      )}
      {screen?.current === 'WEATHER' && (
        <WeatherData info={weather} preferences={preferences!} handleScreen={handleScreen} />
      )}
      {screen?.current === 'PREFERENCES' && (
        <Preferences
          preferences={preferences!}
          handlePreferences={handlePreferences}
          handleScreen={handleScreen}
        />
      )}
    </main>
  );
}
