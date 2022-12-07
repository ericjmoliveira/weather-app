import { IoIosArrowBack } from 'react-icons/io';

import { UserPreferences, Screen } from '../interfaces';

interface PreferencesProps {
  preferences: UserPreferences;
  handlePreferences(unit: '°C' | '°F'): void;
  handleScreen(screen: Screen): void;
}

export function Preferences({ preferences, handlePreferences, handleScreen }: PreferencesProps) {
  return (
    <section className="text-white">
      <nav className="flex items-center mb-8">
        <div className="mr-2 p-2 rounded-full active:bg-neutral-900 transition">
          <IoIosArrowBack
            className="text-2xl cursor-pointer"
            onClick={() => handleScreen({ current: 'WEATHER' })}
          />
        </div>
        <h1 className="text-lg font-medium">Preferences</h1>
      </nav>
      <section className="flex flex-col p-6 rounded-3xl bg-neutral-900">
        <div>
          <h2 className="mb-2">Unit</h2>
          <div className="flex justify-around mb-6 pb-6 border-b border-b-gray-700">
            <div
              className={`flex items-center justify-center px-4 py-2.5 border border-none rounded-lg text-xl ${
                preferences.unit === '°C' && 'bg-blue-500'
              } font-medium cursor-pointer transition`}
              onClick={() => handlePreferences('°C')}
            >
              °C
            </div>
            <div
              className={`flex items-center justify-center px-4 py-2.5 border border-none rounded-lg text-xl ${
                preferences.unit === '°F' && 'bg-blue-500'
              } font-medium cursor-pointer transition`}
              onClick={() => handlePreferences('°F')}
            >
              °F
            </div>
          </div>
        </div>
        <div
          className="flex flex-col justify-around rounded-3xl cursor-pointer"
          onClick={() => handleScreen({ current: 'INTRO' })}
        >
          <h2 className="mb-2">Location</h2>
          <span className="font-medium">{preferences.location?.city!}</span>
        </div>
      </section>
    </section>
  );
}
