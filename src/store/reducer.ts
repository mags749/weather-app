import { combineReducers } from "redux";
import weatherReducer from "@/modules/weather/reducers";

const reducerContainer = {
  weather: weatherReducer
};

const rootReducer = combineReducers({ ...reducerContainer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
