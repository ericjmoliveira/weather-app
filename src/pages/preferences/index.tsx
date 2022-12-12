import { IoIosArrowBack } from 'react-icons/io';

import { useStore } from '../../store';

export default function Preferences() {
  const userPreferences = useStore((state) => state.userPreferences);
  const updateUserPreferences = useStore((state) => state.updateUserPreferences);
  const handlePage = useStore((state) => state.handlePage);

  return (
    <section className="text-white">
      <nav className="flex items-center mb-8">
        <div className="mr-2 p-2 rounded-full active:bg-neutral-900 transition">
          <IoIosArrowBack
            className="text-2xl cursor-pointer"
            onClick={() => handlePage('WEATHER')}
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
                userPreferences.unit === '°C' && 'bg-blue-500'
              } font-medium cursor-pointer transition`}
              onClick={() => updateUserPreferences({ ...userPreferences, unit: '°C' })}
            >
              °C
            </div>
            <div
              className={`flex items-center justify-center px-4 py-2.5 border border-none rounded-lg text-xl ${
                userPreferences.unit === '°F' && 'bg-blue-500'
              } font-medium cursor-pointer transition`}
              onClick={() => updateUserPreferences({ ...userPreferences, unit: '°F' })}
            >
              °F
            </div>
          </div>
        </div>
        <div
          className="flex flex-col justify-around rounded-3xl cursor-pointer"
          onClick={() => handlePage('HOME')}
        >
          <h2 className="mb-2">Location</h2>
          <span className="font-medium">{userPreferences.location?.city}</span>
        </div>
      </section>
    </section>
  );
}
