import { WeatherActions, UPDATE_CITY, UPDATE_CITY_DETAILS } from '../actions/types';
import { WeatherState } from '../models';

const initialState: WeatherState = {
  city: {},
  cityWeather: {}
};

const weatherReducer = (
  state: WeatherState = initialState,
  action: WeatherActions
): WeatherState => {
  switch (action.type) {
    case UPDATE_CITY:
      return {
        ...state,
        city: action.payload
      };
    case UPDATE_CITY_DETAILS:
      return {
        ...state,
        cityWeather: action.payload
      };
    default:
      return state;
  }
};

export default weatherReducer;
