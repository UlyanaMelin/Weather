import {
  TypeCityActions, IDayTemp,
} from '../types';
import {
  EActionsTypes,
} from '../actions'

const initialDayState : IDayTemp = {
  loading: false,
  error: false,
  data: {
    icon: '',
    temp: 0,
    pressure: 0,
    humidity: 0,
    speed: 0,
  },
};

const reducerDayInfo = (state = initialDayState, action:TypeCityActions = { type: EActionsTypes.LOAD_TEMP_CITY }) => {
  switch (action.type) {
    case EActionsTypes.LOAD_TEMP_CITY:
      return {
        loading: true,
        error: false,
      };
    case EActionsTypes.REQUESTED_CITY_SUCCEEDED:
      return {
        loading: false,
        error: false,
        data: {
          icon: action.data.weather[0].icon,
          temp: action.data.main.temp,
          pressure: action.data.main.pressure,
          humidity: action.data.main.humidity,
          speed: action.data.wind.speed,
        },
      };
    case EActionsTypes.REQUESTED_CITY_FAILED:
      return {
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export { reducerDayInfo }
