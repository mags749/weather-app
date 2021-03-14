import React, { FC } from 'react';
import { DropDown } from '@/modules/common/input';

interface IWeatherForm {
  currentCity: string;
  onSelectChange(e: any): void;
}

const WeatherForm: FC<IWeatherForm> = ({ currentCity, onSelectChange }) => {
  const cities = ['Gothenburg', 'Stockholm', 'Mountain View', 'London', 'New York', 'Berlin'];

  return (
    <div className="weather-form">
      <DropDown
        label="City"
        name="cities"
        options={cities}
        onChange={onSelectChange}
        defaultValue={currentCity}
      />
    </div>
  );
};

export default WeatherForm;
