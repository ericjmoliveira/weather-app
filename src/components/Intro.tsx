import { useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';

import { Search, Screen, UserPreferences } from '../interfaces';
import { getCountryName } from '../helpers/country';

interface Form {
  city: string;
}

interface IntroProps {
  search: Search;
  preferences: UserPreferences;
  handleForm(data: Form): void;
  handleScreen(screen: Screen): void;
  showWeatherData(city: string, lat: number, lon: number): void;
}

export function Intro({
  search,
  preferences,
  handleForm,
  handleScreen,
  showWeatherData
}: IntroProps) {
  const { register, handleSubmit } = useForm<Form>();

  return (
    <section>
      <section>
        <form onSubmit={handleSubmit((data: Form) => handleForm(data))}>
          <section className="flex items-center">
            {preferences.location && (
              <div className="p-2 rounded-full active:bg-neutral-900 transition">
                <IoIosArrowBack
                  className="text-2xl text-white cursor-pointer 
                  "
                  onClick={() => handleScreen({ current: 'PREFERENCES' })}
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
                  key={result.lat}
                  className="flex flex-col py-2.5 text-white border-b border-b-gray-700 last-of-type:border-none cursor-pointer"
                  onClick={() => showWeatherData(result.name, result.lat, result.lon)}
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