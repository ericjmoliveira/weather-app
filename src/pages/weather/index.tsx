import {
  BsFillGearFill,
  BsSunriseFill,
  BsSunsetFill,
  BsFillDropletFill,
  BsWind
} from 'react-icons/bs';

import { formatLocalTime, getCityCurrentTime, getCityLocalTime } from '../../helpers/date';
import { convertCelsiusToFahrenheit } from '../../helpers/weather';
import { useStore } from '../../store';

export default function Weather() {
  const weather = useStore((state) => state.weather);
  const userPreferences = useStore((state) => state.userPreferences);
  const handlePage = useStore((state) => state.handlePage);

  return (
    <section className="text-white">
      <nav className="w-fit p-2 rounded-full mb-8 text-xl text-white cursor-pointer active:bg-neutral-900 transition">
        <BsFillGearFill onClick={() => handlePage('PREFERENCES')} />
      </nav>
      <section className="flex justify-between mb-8">
        <div className="flex flex-col justify-between">
          {userPreferences.unit === '°C' ? (
            <span className="font-thin text-7xl">{Math.round(weather?.data.main.temp!)}°</span>
          ) : (
            <span className="font-thin text-7xl">
              {convertCelsiusToFahrenheit(weather?.data.main.temp!)}°
            </span>
          )}
          <span className="mt-8 font-medium text-xl">{weather?.name}</span>
        </div>
        <div>
          <img
            className="-mt-2 animate-pulse"
            src={`http://openweathermap.org/img/wn/${weather?.data.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      </section>
      <section className="flex flex-col justify-between mb-8">
        {userPreferences.unit === '°C' ? (
          <span className="font-medium">
            {`${Math.round(weather?.data.main.temp_max!)}° / ${Math.round(
              weather?.data.main.temp_min!
            )}° Feels like ${Math.round(weather?.data.main.feels_like!)}°`}
          </span>
        ) : (
          <span className="font-medium">
            {`${convertCelsiusToFahrenheit(weather?.data.main.temp_max!)}° / ${Math.round(
              convertCelsiusToFahrenheit(weather?.data.main.temp_min!)
            )}° Feels like ${convertCelsiusToFahrenheit(weather?.data.main.feels_like!)}°`}
          </span>
        )}
        <span>{getCityCurrentTime(weather?.data.timezone!)}</span>
      </section>
      <section className="flex flex-col justify-around mb-6 p-6 rounded-3xl bg-neutral-900">
        <div className="flex flex-col items-center justify-between">
          <span>Status</span>
          <span className="text-xl font-medium">
            {weather?.data.weather[0].description.toUpperCase()}
          </span>
        </div>
      </section>
      <section className="flex justify-around mb-6 p-8 rounded-3xl bg-neutral-900">
        <div className="flex flex-col items-center justify-center">
          <BsFillDropletFill className="mb-4 text-5xl text-blue-500" />
          <span>Humidity</span>
          <span className="font-medium">{weather?.data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <BsWind className="mb-4 text-5xl text-white" />
          <span>Wind</span>
          <span className="font-medium">{Math.round(weather?.data.wind.speed! * 3.6)} km/h</span>
        </div>
      </section>
      <section className="flex justify-around mb-6 p-8 rounded-3xl bg-neutral-900">
        <div className="flex flex-col items-center justify-center">
          <span>Sunrise</span>
          <span className="font-medium">
            {getCityLocalTime(weather?.data.timezone!, weather?.data.sys.sunrise!)}
          </span>
          <BsSunriseFill className="mt-4 text-5xl text-yellow-500" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span>Sunset</span>
          <span className="font-medium">
            {getCityLocalTime(weather?.data.timezone!, weather?.data.sys.sunset!)}
          </span>
          <BsSunsetFill className="mt-4 text-5xl text-orange-500" />
        </div>
      </section>
      <div className="text-right">
        <span>{formatLocalTime(weather?.data.dt!)} Updated</span>
      </div>
    </section>
  );
}
