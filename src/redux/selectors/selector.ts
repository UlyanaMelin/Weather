import { IState } from '../types';

export const cityNameSelector = (state : IState) => state.city
export const AutoComplSelector = (state : IState) => state.cityAll.list

export const dayInfoSelector = (state : IState) => state.dayTemp.data
export const dayLoadSelector = (state : IState) => state.dayTemp.loading
export const dayErrorSelector = (state : IState) => state.dayTemp.error

export const weekInfoSelector = (state : IState) => state.weekTemp.list?.map(el => ({
  dt: new Date(el.dt * 1000).toLocaleDateString(), maxTemp: el.main.temp_max, minTemp: el.main.temp_min,
}))
export const weekLoadSelector = (state : IState) => state.weekTemp.loading
export const weekErrorSelector = (state : IState) => state.weekTemp.error
