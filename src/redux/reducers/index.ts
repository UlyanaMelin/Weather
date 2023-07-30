import { combineReducers } from 'redux'
import { reducerDayInfo } from './reducerDayInfo'
import { reducerWeek } from './reducerWeek'
import { reducerCityName } from './reducerCityName'
import { reducerAutoCompl } from './reducerAutoCompl'

const rootReducer = combineReducers({
  city: reducerCityName,
  cityAll: reducerAutoCompl,
  dayTemp: reducerDayInfo,
  weekTemp: reducerWeek,
})

export default rootReducer
