import { EActionsTypes } from '../actions'

export type ActionRequestCity = {// описание типов для ответа с бека по запросу на день
  coord: {
    lon: number,
    lat: number
},
weather: {
      id: number,
      main: string,
      description: string,
      icon: string
}[],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
},
  visibility: number,
  wind: {
    speed: number,
    deg: number
},
  clouds: {
    all: number
},
  dt: number,
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
},
  timezone: number,
  id: number,
  name: string,
  cod: number

}

export type ActionRequestWeek = {// описание типов для ответа с бека по запросу на неделю
list: {
  dt: number,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number
},
  weather: {
      id: number,
      main: string,
      description: string,
      icon: string

}[],
  clouds: {
   all: number
},
  wind: {
    speed: number,
    deg: number,
    gust: number
},
  visibility: number,
  pop: number,
  sys: {
    pod: string
},
 dt_txt: string
}[],
}

export type RequestedAutoCompl = {
  type: EActionsTypes.REQUESTED_AUTO_COMPLITTE
  data: IAutoCompl
}
export interface IAutoCompl {
  list:{
    name: string,
    key: string
  }[],
}

type RequestedCity= {// описание типов для редьюсера REQUESTED_CITY_SUCCEEDED
  type: EActionsTypes.REQUESTED_CITY_SUCCEEDED
  data: ListItem
}

type LoadCity= {// описание типов для редьюсера LOAD_TEMP_CITY
  type: EActionsTypes.LOAD_TEMP_CITY
}
type RequestedCityFaled= {// описание типов для редьюсера REQUESTED_CITY_FAILED
  type: EActionsTypes.REQUESTED_CITY_FAILED
}

export type TypeCityActions = RequestedCity | LoadCity | RequestedCityFaled// все три типа в одном

export type TypeAutoCompl = {// описание типов для редьюсера
  type: EActionsTypes.REQUESTED_AUTO_COMPLITTE
  data:IAutoCompl,

}

export type TypeNameCityActions = {// описание типов для редьюсера SUCCESS_GEO_CITY_NAME
  type: EActionsTypes.SUCCESS_GEO_CITY_NAME
  data: ICityName
}

export interface IState {// описание типов для стейта
  city: ICityName,
  cityAll: IAutoCompl,
  dayTemp: IDayTemp,
  weekTemp: IWeekTemp,
}

export interface ICityName {// описание типов для CityName который пойдёт в стор
   name: string,
   icon: string,
   temp: number,
}

export type RequestCityName = {// описание типов для ответа с бека названия города по координатам
  address: {
    ['ISO3166-2-lvl4']: string,
    city: string,
    city_district: string,
    address: string,
    country: string,
    country_code: string,
    county: string,
    postcode: string,
    region: string,
    road: string,
    state: string,
    suburb: string,
    tourism: string,
  }
}

export interface IDayTemp extends IcommonReducer {// описание типов для IDayTemp который пойдёт в стор
   data: {
     icon: string,
     temp: number,
     pressure: number,
     humidity: number,
     speed: number,
   }
}

export type ListItem = {// описание типов для IWeekTemp который пойдёт в стор
  dt: number,
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      sea_level: number,
      grnd_level: number,
      humidity: number,
      temp_kf: number
  },
    weather: {
      id: number,
      main: string,
      description: string,
      icon: string

    }[],
    clouds: {
     all: number
  },
    wind: {
      speed: number,
      deg: number,
      gust: number
  },
    visibility: number,
    pop: number,
    sys: {
      pod: string
  },
   dt_txt: string
}

export interface IWeekTemp extends IcommonReducer {// описание типов для IWeekTemp который пойдёт в стор
  list: ListItem[],
}

interface IcommonReducer {
  loading: boolean,
  error: boolean,
}
