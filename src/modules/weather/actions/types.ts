import { ICityState, ICityWeather } from '../models';

export const UPDATE_CITY = 'UPDATE_CITY';
export const UPDATE_CITY_DETAILS = 'UPDATE_CITY_DETAILS';

interface UpdateCityAction {
  type: typeof UPDATE_CITY;
  payload: ICityState;
}

interface UpdateCityDetailsAction {
  type: typeof UPDATE_CITY_DETAILS;
  payload: ICityWeather[];
}

export type WeatherActions = UpdateCityAction | UpdateCityDetailsAction;
