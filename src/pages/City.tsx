import '../City.css';
import '../Home.css';
import groupBy from 'lodash.groupby';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RotateSpinner } from 'react-spinners-kit';
import _ from 'lodash';
import { LoadTempCity, LoadWeekTemp } from '../redux/actions'
import {
  dayInfoSelector, dayLoadSelector, dayErrorSelector, weekInfoSelector, weekLoadSelector, weekErrorSelector, cityNameSelector, AutoComplSelector,
} from '../redux/selectors'

type Props = {}

export const City: React.FC<Props> = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [ isFlag, setIsFlag ] = useState<boolean>(true)

  const weatherDay = useSelector(dayInfoSelector)
  const loadDay = useSelector(dayLoadSelector)
  const errorDay = useSelector(dayErrorSelector)
  const cityName = useSelector(cityNameSelector)
  const cityList = useSelector(AutoComplSelector)

  const weatherWeek = useSelector(weekInfoSelector)
  const loadWeek = useSelector(weekLoadSelector)
  const errorWeek = useSelector(weekErrorSelector)

  const weatherWeekGroup = groupBy(weatherWeek, el => el.dt)

  const lol = Object.entries(weatherWeekGroup).reduce((acc, [ key, item ]: any) => {
    const maximus = _.maxBy(item, 'maxTemp')
    const minimus = _.minBy(item, 'minTemp')

    return { ...acc, [key]: { max: maximus, min: minimus } }
  }, {})

  useEffect(() => {
    dispatch(LoadTempCity(params.city))
    dispatch(LoadWeekTemp(params.city))
  }, [ params ])

  if (errorDay && errorWeek) {
    return (
      <div className="wrapper_error">
        <div className="imageCloud" />
        <strong>Oops, 404</strong>
        <strong>Look out the window</strong>
      </div>
    )
  }
  if (loadDay && loadWeek) {
    return (
      <div className="wrapper_spinner">
        <RotateSpinner
          size={ 45 }
          color="#fff"
        />
      </div>
    )
  }

  const color = temp => {
    if (temp > 0) {
      return `rgba(255,0,0, ${0.02 * temp})`
    }
    return `rgba(0,0,255, ${0.02 * Math.abs(temp)})`
  }

  const renderFirstColumn = array => (
    <tr>
      {array.map(el => (
        <th key={ el.max.maxTemp } style={{ backgroundColor: color(el.max.maxTemp) }}>
          {Math.round(el.max.maxTemp)}
          &deg;
        </th>
      ))}
    </tr>

  )

  const renderSecondColumn = array => (
    <tr className="ths">
      {array.map(el => (
        <th key={ el.min.minTemp } style={{ backgroundColor: color(el.min.minTemp) }}>
          {Math.round(el.min.minTemp)}
          &deg;
        </th>
      ))}
    </tr>

  )

  const renderHeaderTable = keys => (
    <tr>
      {keys.map(el => (<th key={ el }>{el.slice(0, -5)}</th>))}
    </tr>
  )
  return (
    <div>
      { (cityName.name !== '')
        ? (
          <div className="wrapper_top_geo_temp">
            <div className="icon_top_geo_temp" />
            <p className="text_top_geo_temp">{cityName?.name.split(',')[0]}</p>
            {cityName?.icon && (
            <img
              alt="icon"
              src={ `http://openweathermap.org/img/wn/${cityName?.icon}@2x.png` }
              style={{
                width: '5vh', height: '5vh', marginTop: '10px', marginLeft: '10px',
              }}
            />
            )}
            <p className="text_top_geo_temp">
              {Math.round(Number(cityName?.temp))}
              {' '}
              &deg;

            </p>
          </div>
        ) : <div className="wrapper_top_geo_temp" />}
      <div className="wrapper_weather">
        <h1 className="lable_sity">
          {params?.city.charAt(0).toUpperCase()}
          {params?.city.slice(1).toLowerCase()}
        </h1>
        <div className="iconTemp">
          {weatherDay?.icon && <img alt="icon" src={ `http://openweathermap.org/img/wn/${weatherDay?.icon}@2x.png` } />}
          <p className="temp">
            {Math.round(Number(weatherDay?.temp))}
            &deg;
          </p>
        </div>
        <div className="details">
          <p>
            Pressure:
            <span className="details_value">{weatherDay?.pressure}</span>
          </p>
          <p>
            Humidity:
            <span className="details_value">
              {weatherDay?.humidity}
              {' '}
              %
            </span>
          </p>
          <p>
            Wind speed:
            <span className="details_value">
              {weatherDay?.speed}
              {' '}
              m/s
            </span>
          </p>
        </div>
        <button onClick={ () => setIsFlag(!isFlag) } className="btn_week_temp">Week temp</button>
        {
      !isFlag
        ? (
          <table className="table_wraper">
            <thead>
              {renderHeaderTable(Object.keys(lol))}
            </thead>
            <tbody>
              {renderFirstColumn(Object.values(lol))}
              {renderSecondColumn(Object.values(lol))}
            </tbody>
          </table>
        ) : null
    }
      </div>
    </div>
  )
}
