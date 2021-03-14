import React from 'react';
import { render } from '@testing-library/react';
import WeatherForm from '@/modules/weather/components/WeatherForm';

test('Renders correctly', () => {
  const { queryByDisplayValue } = render(
    <WeatherForm currentCity="London" onSelectChange={e => console.info('Calling')} />
  );
  expect(queryByDisplayValue('London')).toBeTruthy();
});
