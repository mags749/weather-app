import { RootState } from '@/store/reducer';
import React, { Component, ReactElement } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { getCityDetails } from '../actions';

const mapStateToProps = (state: RootState) => {
  const { city } = state.weather;
  return {
    city: city.title,
    locationType: city.location_type,
    latLong: city.latt_long
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
      currentCity: 'london'
    };
  }

  componentDidMount(): void {
    this.props.getCityDetails(this.state.currentCity);
  }

  render(): ReactElement {
    return <span>{this.props.city}</span>;
  }
}

export default connector(WeatherContainer);
