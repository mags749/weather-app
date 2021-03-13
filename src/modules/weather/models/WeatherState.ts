import ICityState from './ICityState';
import ICityWeather from './ICityWeather';

type WeatherState = {
  city: ICityState;
  cityWeather: ICityWeather;
};

export default WeatherState;
