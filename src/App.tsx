import { useEffect } from 'react';

import Home from './pages/home';
import Weather from './pages/weather';
import Preferences from './pages/preferences';
import Loading from './components/Loading';
import { useStore } from './store';

export default function App() {
  const loading = useStore((state) => state.loading);
  const retrieveWeatherData = useStore((state) => state.retrieveWeatherData);
  const page = useStore((state) => state.page);

  useEffect(() => {
    retrieveWeatherData();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="mx-auto p-6 md:w-1/2">
      {page === 'HOME' && <Home />}
      {page === 'WEATHER' && <Weather />}
      {page === 'PREFERENCES' && <Preferences />}
    </main>
  );
}
