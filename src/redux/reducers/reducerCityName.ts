import { TypeNameCityActions, ICityName } from '../types/types';
import { EActionsTypes } from '../actions';

const initialNameState : ICityName = {
  name: '',
  icon: '',
  temp: 0,
};

const reducerCityName = (state = initialNameState, action:TypeNameCityActions = { type: EActionsTypes.SUCCESS_GEO_CITY_NAME, data: null }) => {
  switch (action.type) {
    case EActionsTypes.SUCCESS_GEO_CITY_NAME:
      return {
        name: action.data.name,
        icon: action.data.icon,
        temp: action.data.temp,
      };
    default:
      return state;
  }
}

export { reducerCityName }
