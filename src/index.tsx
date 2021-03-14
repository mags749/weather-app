import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '@/store';
import '@/styles/index.scss';

const WeatherContainer = React.lazy(() => import('@/modules/weather/containers/WeatherContainer'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <WeatherContainer />
      </React.Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
