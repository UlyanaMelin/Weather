import { ICityName, IAutoCompl, RequestedAutoCompl } from '../types/types';
import { ActionRequestCity, ActionRequestWeek } from '../types';

export enum EActionsTypes {
  LOAD_GEO_CITY_NAME = 'LOAD_GEO_CITY_NAME',
  SUCCESS_GEO_CITY_NAME = 'SUCCESS_GEO_CITY_NAME',
  AUTO_COMPLITTE= 'AUTO_COMPLITTE',
  REQUESTED_AUTO_COMPLITTE='REQUESTED_AUTO_COMPLITTE',
  LOAD_TEMP_CITY = 'LOAD_TEMP_CITY',
  REQUESTED_CITY_SUCCEEDED = 'REQUESTED_CITY_SUCCEEDED',
  REQUESTED_CITY_FAILED = 'REQUESTED_CITY_FAILED',
  LOAD_WEEK_TEMP ='LOAD_WEEK_TEMP',
  REQUESTED_WEEK_SUCCEEDED = 'REQUESTED_WEEK_SUCCEEDED',
  REQUESTED_WEEK_FAILED = 'REQUESTED_WEEK_FAILED',
}

/// /////////GEO_CITY_NAME

export const LoadGeoNameCity = () => ({ type: EActionsTypes.LOAD_GEO_CITY_NAME })
export const SuccessGeoNameCity = (data: ICityName) => ({ type: EActionsTypes.SUCCESS_GEO_CITY_NAME, data })

/// /////////AUTO_COMPLITTE

export const AutoComplitte = (value:string) => ({ type: EActionsTypes.AUTO_COMPLITTE, value })
export const requestAutoComplitte = (data:IAutoCompl) => ({ type: EActionsTypes.REQUESTED_AUTO_COMPLITTE, data })

/// /////////TEMP_DAY

export const LoadTempCity = (city : string) => ({ type: EActionsTypes.LOAD_TEMP_CITY, city })
export const requestCitySuccess = (data :ActionRequestCity) => ({ type: EActionsTypes.REQUESTED_CITY_SUCCEEDED, data })
export const requestCityError = () => ({ type: EActionsTypes.REQUESTED_CITY_FAILED })

/// ///////TEMP_WEEK

export const LoadWeekTemp = (city : string) => ({ type: EActionsTypes.LOAD_WEEK_TEMP, city })
export const requestWeekSuccess = (data : ActionRequestWeek) => ({ type: EActionsTypes.REQUESTED_WEEK_SUCCEEDED, data })
export const requestWeekError = () => ({ type: EActionsTypes.REQUESTED_WEEK_FAILED })
