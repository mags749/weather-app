import React from 'react';
import { render, screen } from '@testing-library/react';
import { ICityWeather } from '@/modules/weather/models';
import CityWeather from '@/modules/weather/components/CityWeather';

test('City name gets displayed', () => {
  const cityWeather: ICityWeather = {
    air_pressure: 1000,
    created: new Date('2021-03-12'),
    humidity: 123,
    id: 1,
    max_temp: 10,
    min_temp: 1,
    predictability: 88,
    the_temp: 8,
    visibility: 1.08,
    weather_state_abbr: 'c',
    weather_state_name: 'Clear',
    wind_direction_compass: 'N',
    wind_direction: 180,
    wind_speed: 124
  };
  render(<CityWeather city="Mumbai" cityWeather={cityWeather} latLong="lat-long" />);
  const text = screen.getByText('Mumbai');
  expect(text).toBeInTheDocument();
});
