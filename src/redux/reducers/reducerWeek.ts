import { IWeekTemp } from '../types/types';

import {
  EActionsTypes,
} from '../actions'

const initialWeekState : IWeekTemp = {
  loading: false,
  error: false,
  list: [],
}

const reducerWeek = (state = initialWeekState, action = { type: `${EActionsTypes}`, data: null }) => {
  switch (action.type) {
    case EActionsTypes.LOAD_WEEK_TEMP:
      return {
        loading: true,
        error: false,
      };
    case EActionsTypes.REQUESTED_WEEK_SUCCEEDED:
      return {
        loading: false,
        error: false,
        list: action.data,

      };
    case EActionsTypes.REQUESTED_WEEK_FAILED:
      return {
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export { reducerWeek }
