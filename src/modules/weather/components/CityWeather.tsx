import React, { FC } from 'react';
import classNames from 'classnames';
import { ICityWeather } from '../models';

interface ICityWeatherProps {
  cityWeather: ICityWeather;
}

const CityWeather: FC<ICityWeatherProps> = ({ cityWeather }) => {
  if (!cityWeather.weather_state_abbr) return null;
  const classes = classNames('weather-condition', 'rainy');
  return (
    <div className={classes}>
      <label>{cityWeather.weather_state_name}</label>
      <img
        src={`https://www.metaweather.com/static/img/weather/${cityWeather.weather_state_abbr}.svg`}
        alt="Image"
        height="50px"
      />
      <div className="weather-condition-temp">
        {cityWeather.the_temp ? cityWeather.the_temp : cityWeather.max_temp}
        <div className="weather-condition-temp-min-max">
          min : {cityWeather.min_temp && Math.floor(cityWeather.min_temp * 100) / 100} / max :{' '}
          {cityWeather.max_temp}
        </div>
      </div>
      <div className="weather-condition-timestamp">{cityWeather.applicable_date}</div>
    </div>
  );
};
export default CityWeather;
