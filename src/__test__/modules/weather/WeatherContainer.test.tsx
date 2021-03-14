import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherContainer from '@/modules/weather/containers/WeatherContainer';

import configureStore from '@/store';
import { Provider } from 'react-redux';

test('Renders correctly', () => {
  render(
    <Provider store={configureStore()}>
      <WeatherContainer />
    </Provider>
  );
  expect(screen.getByText('Weather App')).toBeTruthy();
});
