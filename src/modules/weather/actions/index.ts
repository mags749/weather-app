import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Get, uriName } from '@/utilities/apiUtitlity';
import { RootState } from '@/store/reducer';
import { UPDATE_CITY, WeatherActions } from './types';
import ICityState from '../models/ICityState';

export const getCityDetails = (
  cityName: string
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const response = await Get(uriName, `/search/?query=${cityName}`);
    dispatch(loadCityDetails(response[0]));
  } catch (error) {
    console.error(error);
  }
};

const loadCityDetails = (payload: ICityState): WeatherActions => ({
  type: UPDATE_CITY,
  payload
});
