import React, { FC } from 'react';
import classNames from 'classnames';
import { ICityWeather } from '../models';
import { roundDecTwo, checkForMany } from '@/utilities/genericUtility';

interface ICityWeatherProps {
  city: string | undefined;
  latLong: string | undefined;
  cityWeather: ICityWeather;
}

const CityWeather: FC<ICityWeatherProps> = ({ city, cityWeather, latLong }) => {
  const {
    air_pressure,
    applicable_date,
    humidity,
    max_temp,
    min_temp,
    predictability,
    the_temp,
    weather_state_abbr,
    weather_state_name,
    wind_direction_compass,
    wind_direction,
    wind_speed
  } = cityWeather;
  if (!weather_state_abbr) return null;
  const classes = classNames(
    'weather-condition',
    {
      rainy: checkForMany(weather_state_abbr, ['t', 'hr', 'lr', 's'])
    },
    {
      snowy: checkForMany(weather_state_abbr, ['sn', 'sl', 'h'])
    },
    {
      cloudy: checkForMany(weather_state_abbr, ['hc', 'lc'])
    },
    {
      clear: weather_state_abbr === 'c'
    }
  );
  return (
    <div className={classes}>
      <div className="weather-condition-city">
        <span>{city}</span>({latLong})
      </div>
      <label>{weather_state_name}</label>
      <img
        src={`https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`}
        alt="Image"
      />
      <div className="weather-condition-temp">
        {the_temp ? roundDecTwo(the_temp) : roundDecTwo(max_temp)}&#176;C
        <div className="weather-condition-temp-min-max">
          min : <strong>{min_temp && roundDecTwo(min_temp)}&#176;</strong> / max :{' '}
          <strong>{roundDecTwo(max_temp)}&#176;</strong>
        </div>
      </div>
      <div className="weather-condition-info">
        <label>Air Pressure</label>
        <strong>{roundDecTwo(air_pressure)} atm</strong>
      </div>
      <div className="weather-condition-info">
        <label>Humidity</label>
        <strong>{roundDecTwo(humidity)}%</strong>
      </div>
      <div className="weather-condition-info">
        <label>Predictability</label>
        <strong>{roundDecTwo(predictability)}%</strong>
      </div>
      <div className="weather-condition-info">
        <label>Wind Direction</label>
        <strong>
          {roundDecTwo(wind_direction)}&#176; {wind_direction_compass}, {roundDecTwo(wind_speed)}{' '}
          km/hr
        </strong>
      </div>
      <div className="weather-condition-timestamp">{applicable_date}</div>
    </div>
  );
};

export default CityWeather;
