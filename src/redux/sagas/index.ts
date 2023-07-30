import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects'
import { ICityName, IAutoCompl } from '../types/types';
import {
  requestAutoComplitte,
  requestWeekSuccess, requestWeekError,
  requestCitySuccess, requestCityError, EActionsTypes, SuccessGeoNameCity,
} from '../actions';
import { ActionRequestCity, ActionRequestWeek, RequestCityName } from '../types';
import { getBrowserLocation } from '../../utils/geo';

export function* workerGeoCityName() {
  const res = yield call(() => getBrowserLocation()
    .then((curLoc: {lat: number, lng: number}) => axios
      .get<RequestCityName>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=en&lat=${curLoc.lat}&lon=${curLoc.lng}`)))

  const { data } = yield call(
    () => axios.get<ActionRequestCity>(
      `https://api.openweathermap.org/data/2.5/weather?q=${res.data.address.city}&units=metric&appid=9439f0720498ed4423e600ecf8c8bc9c`,
      {},
    ),

  )
  const geoTemp:ICityName = { name: '', icon: '', temp: 0 }
  geoTemp.name = `${res.data.address.city}, ${res.data.address.country}`
  geoTemp.icon = data.weather[0].icon
  geoTemp.temp = data.main.temp

  yield put(SuccessGeoNameCity(geoTemp))
}

export function* workerAutoCompl(payload:{value:string, type: EActionsTypes.AUTO_COMPLITTE}) {
  const data = yield call(() => axios.get(`https://api.teleport.org/api/cities/?search=${payload.value}`, {
  }))

  const cityAll:IAutoCompl = data.data._embedded['city:search-results'].map((item: any) => {
    const containers = { name: '', key: '' };
    containers.name = item.matching_full_name;
    containers.key = item._links['city:item'].href;

    return containers;
  });

  yield put(requestAutoComplitte(cityAll))
}

export function* workerCitySaga(payload:{city:string, type: EActionsTypes.LOAD_TEMP_CITY}) {
  try {
    const { data } = yield call(
      () => axios.get<ActionRequestCity>(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload.city}&units=metric&appid=9439f0720498ed4423e600ecf8c8bc9c`,
        {},
      ),

    )
    yield put(requestCitySuccess(data))
  } catch (error) {
    yield put(requestCityError());
  }
}
export function* workerWeekSaga(payload:{city:string, type: EActionsTypes.LOAD_WEEK_TEMP}) {
  try {
    const { data } = yield call(
      () => axios.get<ActionRequestWeek>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${payload.city}&units=metric&appid=9439f0720498ed4423e600ecf8c8bc9c`,
        {},
      ),

    )

    yield put(requestWeekSuccess(data.list))
  } catch (error) {
    yield put(requestWeekError());
  }
}

export function* watchCitySaga() {
  yield takeEvery(EActionsTypes.LOAD_GEO_CITY_NAME, workerGeoCityName)
  yield takeEvery(EActionsTypes.AUTO_COMPLITTE, workerAutoCompl)
  yield takeEvery(EActionsTypes.LOAD_TEMP_CITY, workerCitySaga)
  yield takeEvery(EActionsTypes.LOAD_WEEK_TEMP, workerWeekSaga)
}

export default function* rootSaga() {
  yield watchCitySaga();
}
