import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import WeatherContainer from '@/modules/weather/containers/WeatherContainer';
import configureStore from '@/store';
import './index.scss';

const App = (): ReactElement => <WeatherContainer />;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
