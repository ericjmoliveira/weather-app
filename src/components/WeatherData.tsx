import {
  BsFillGearFill,
  BsSunriseFill,
  BsSunsetFill,
  BsFillDropletFill,
  BsWind
} from 'react-icons/bs';

import { Weather, Screen, UserPreferences } from '../interfaces';
import { formatLocalTime, getCityCurrentTime, getCityLocalTime } from '../helpers/date';

interface WeatherDataProps {
  info: Weather | undefined;
  preferences: UserPreferences;
  handleScreen(screen: Screen): void;
}

export function WeatherData({ info, preferences, handleScreen }: WeatherDataProps) {
  return (
    <section className="text-white">
      <nav className="w-fit p-2 rounded-full mb-8 text-xl text-white cursor-pointer active:bg-neutral-900 transition">
        <BsFillGearFill onClick={() => handleScreen({ current: 'PREFERENCES' })} />
      </nav>
      <section className="flex justify-between mb-8">
        <div className="flex flex-col justify-between">
          {preferences.unit === '°C' ? (
            <span className="font-thin text-7xl">
              {Math.round(info?.data.main.temp! - 273.15)}°
            </span>
          ) : (
            <span className="font-thin text-7xl">
              {Math.round(1.8 * (info?.data.main.temp_max! - 273.15) + 32)}°
            </span>
          )}
          <span className="mt-8 font-medium text-xl">{info?.name}</span>
        </div>
        <div>
          <img
            className="animate-pulse"
            src={`http://openweathermap.org/img/wn/${info?.data.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      </section>
      <section className="flex flex-col justify-between mb-8">
        {preferences.unit === '°C' ? (
          <span className="font-medium">
            {`${Math.round(info?.data.main.temp_max! - 273.15)}° / ${Math.round(
              info?.data.main.temp_min! - 273.15
            )}° Feels like ${Math.round(info?.data.main.feels_like! - 273.15)}°`}
          </span>
        ) : (
          <span className="font-medium">
            {`${Math.round(1.8 * (info?.data.main.temp_max! - 273.15) + 32)}° / ${Math.round(
              1.8 * (info?.data.main.temp_min! - 273.15) + 32
            )}° Feels like ${Math.round(1.8 * (info?.data.main.feels_like! - 273.15) + 32)}°`}
          </span>
        )}
        <span>{getCityCurrentTime(info?.data.timezone!)}</span>
      </section>
      <section className="flex flex-col justify-around mb-6 p-6 rounded-3xl bg-neutral-900">
        <div className="flex flex-col items-center justify-between">
          <span>Status</span>
          <span className="text-xl font-medium">
            {info?.data.weather[0].description.toUpperCase()}
          </span>
        </div>
      </section>
      <section className="flex justify-around mb-6 p-8 rounded-3xl bg-neutral-900">
        <div className="flex flex-col items-center justify-center">
          <BsFillDropletFill className="mb-4 text-5xl text-blue-500" />
          <span>Humidity</span>
          <span className="font-medium">{info?.data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <BsWind className="mb-4 text-5xl text-white" />
          <span>Wind</span>
          <span className="font-medium">{Math.round(info?.data.wind.speed! * 3.6)} km/h</span>
        </div>
      </section>
      <section className="flex justify-around mb-6 p-8 rounded-3xl bg-neutral-900">
        <div className="flex flex-col items-center justify-center">
          <span>Sunrise</span>
          <span className="font-medium">
            {getCityLocalTime(info?.data.timezone!, info?.data.sys.sunrise!)}
          </span>
          <BsSunriseFill className="mt-4 text-5xl text-yellow-500" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span>Sunset</span>
          <span className="font-medium">
            {getCityLocalTime(info?.data.timezone!, info?.data.sys.sunset!)}
          </span>
          <BsSunsetFill className="mt-4 text-5xl text-orange-500" />
        </div>
      </section>
      <div className="text-right">
        <span>{formatLocalTime()} Updated</span>
      </div>
    </section>
  );
}
