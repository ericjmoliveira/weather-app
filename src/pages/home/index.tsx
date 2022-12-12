import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowBack } from 'react-icons/io';

import { getCountryName } from '../../helpers/country';
import { useStore } from '../../store';

interface Form {
  city: string;
}

export default function Home() {
  const search = useStore((state) => state.search);
  const userPreferences = useStore((state) => state.userPreferences);
  const updateUserPreferences = useStore((state) => state.updateUserPreferences);
  const searchCity = useStore((state) => state.searchCity);
  const showWeatherData = useStore((state) => state.showWeatherData);
  const handlePage = useStore((state) => state.handlePage);

  const { register, setFocus, handleSubmit } = useForm<Form>();

  const handleForm = (data: Form) => {
    searchCity(data.city);
  };

  useEffect(() => {
    setFocus('city');
  }, []);

  return (
    <section>
      <section>
        <form onSubmit={handleSubmit((data: Form) => handleForm(data))}>
          <section className="flex items-center">
            {userPreferences.location && (
              <div className="p-2 rounded-full active:bg-neutral-900 transition">
                <IoIosArrowBack
                  className="text-2xl text-white cursor-pointer 
                  "
                  onClick={() => handlePage('PREFERENCES')}
                />
              </div>
            )}
            <input
              className="px-4 py-2.5 bg-transparent text-white caret-white outline-none placeholder:text-white font-medium"
              type="text"
              {...register('city')}
              placeholder="Search"
              autoComplete="off"
            />
          </section>
        </form>
      </section>
      <section className="mt-6 flex flex-col">
        {search.state ? (
          search.results?.length! > 0 ? (
            <ul className="px-6 py-2.5 list-none rounded-3xl bg-neutral-900">
              {search.results?.map((result) => (
                <li
                  key={uuidv4()}
                  className="flex flex-col py-2.5 text-white border-b border-b-gray-700 last-of-type:border-none cursor-pointer"
                  onClick={() => {
                    updateUserPreferences({
                      ...userPreferences,
                      location: { city: result.name, lat: result.lat, lon: result.lon }
                    });
                    showWeatherData(result.name, result.lat, result.lon);
                  }}
                >
                  <span className="file:font-medium">{result.name}</span>
                  <span className="text-gray-300 text-xs">
                    {result.state && result.country
                      ? `${result.state}, ${getCountryName(result.country)}`
                      : `${getCountryName(result.country)}`}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 self-center text-white">
              No results found.
            </p>
          )
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 self-center text-white">
            Enter a location name.
          </p>
        )}
      </section>
    </section>
  );
}
