import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Get, uriName } from '@/utilities/apiUtitlity';
import { getTommorowsDate } from '@/utilities/genericUtility';
import { ICityState, ICityWeather } from '../models';
import { RootState } from '@/store/reducer';
import { UPDATE_CITY, UPDATE_CITY_DETAILS, WeatherActions } from './types';

export const getCityDetails = (
  cityName: string
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const cityDetailsResp = await Get(uriName, `/search/?query=${cityName}`);
    await dispatch(loadCityDetails(cityDetailsResp[0]));
    await dispatch(loadCityWeatherDetails({}));

    const cityWeatherDetailsResp = await Get(
      uriName,
      `/${cityDetailsResp[0].woeid}/${getTommorowsDate()}/`
    );
    const cityWeatherDetails = cityWeatherDetailsResp.sort(
      (a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime()
    )[0];
    await dispatch(loadCityWeatherDetails(cityWeatherDetails));
  } catch (error) {
    console.error(error);
  }
};

const loadCityDetails = (payload: ICityState): WeatherActions => ({
  type: UPDATE_CITY,
  payload
});

const loadCityWeatherDetails = (payload: ICityWeather): WeatherActions => ({
  type: UPDATE_CITY_DETAILS,
  payload
});
