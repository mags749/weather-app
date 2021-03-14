import React, { Component, ReactElement } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '@/store/reducer';
import { getCityDetails } from '../actions';

import '../styles/weather.scss';
import WeatherForm from '../components/WeatherForm';

const CityWeather = React.lazy(() => import('../components/CityWeather'));

const mapStateToProps = (state: RootState) => {
  const { city, cityWeather } = state.weather;

  return {
    city: city.title,
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
    return (
      <div className="weather-container">
        <h1>Weather App</h1>
        <WeatherForm
          currentCity={this.state.currentCity}
          onSelectChange={e => this.onSelectChange(e)}
        />
        <React.Suspense fallback={<h1>Loading...</h1>}>
          <CityWeather {...this.props} />
        </React.Suspense>
      </div>
    );
  }
}

export default connector(WeatherContainer);
