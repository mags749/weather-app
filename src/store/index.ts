import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';

import rootReducer, { RootState } from './reducer';

const configureStore = (initialState?: RootState): Store<RootState> =>
  createStore(rootReducer, initialState, applyMiddleware(thunk)) as Store<RootState>;

export default configureStore;
