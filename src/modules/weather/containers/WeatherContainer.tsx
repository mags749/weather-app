import React, { Component, ReactElement } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { DropDown } from '@/modules/common/input';
import { RootState } from '@/store/reducer';
import { getCityDetails } from '../actions';

import '../styles/weather.scss';

const CityWeather = React.lazy(() => import('../components/CityWeather'));

const mapStateToProps = (state: RootState) => {
  const { city, cityWeather } = state.weather;

  return {
    city: city.title,
    locationType: city.location_type,
    latLong: city.latt_long,
    cityWeather
  };
};

const mapDispatchToProps = {
  getCityDetails
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type iWeatherProps = ConnectedProps<typeof connector>;

type WeatherState = {
  currentCity: string;
};

const cities = ['Gothenburg', 'Stockholm', 'Mountain View', 'London', 'New York', 'Berlin'];

class WeatherContainer extends Component<iWeatherProps, WeatherState> {
  constructor(props: iWeatherProps) {
    super(props);
    this.state = {
      currentCity: 'Gothenburg'
    };
  }

  componentDidMount(): void {
    this.props.getCityDetails(this.state.currentCity);
  }

  async onSelectChange(e: any) {
    e.preventDefault();
    await this.setState({
      currentCity: e.target.value
    });
    this.props.getCityDetails(this.state.currentCity);
  }

  render(): ReactElement {
    const { cityWeather } = this.props;
    return (
      <div className="weather-container">
        <h1>Weather App</h1>
        <div className="weather-form">
          <DropDown
            label="City"
            name="cities"
            options={cities}
            onChange={e => this.onSelectChange(e)}
            defaultValue={this.state.currentCity}
          />
        </div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CityWeather cityWeather={cityWeather} />
        </React.Suspense>
      </div>
    );
  }
}

export default connector(WeatherContainer);
