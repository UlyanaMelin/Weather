import React, { useCallback, useEffect, useState } from 'react';
import '../Home.css';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplitte, LoadGeoNameCity } from '../redux/actions';
import { AutoComplSelector, cityNameSelector } from '../redux/selectors';

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const cityName = useSelector(cityNameSelector)
  const cityList = useSelector(AutoComplSelector)
  const [ isOpen, setIsOpen ] = useState(false)
  const [ value, setValue ] = useState('')
  const [ isErorImp, setIsErorImp ] = useState(false)

  const inputClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const itemClickHandler = (name: string) => {
    setValue(name);
    setIsOpen(!isOpen);
  }

  const updateCity = (value: string) => {
    dispatch(AutoComplitte(value))
  }

  const debounceOnChange = useCallback(
    debounce(updateCity, 300),
    [],
  )

  const changeCityValue = (value: string) => {
    setValue(value)
    if (value.length > 3) {
      debounceOnChange(value)
      setIsErorImp(false)
    }
  }

  const getGeoCityName = () => {
    dispatch(LoadGeoNameCity())
    setValue(cityName?.name)
  }

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
      <div className="wrapper_home">
        <div className="wrapper_input">
          <input
            value={ value }
            onClick={ inputClickHandler }
            onChange={ e => changeCityValue(e.target.value) }
            type="input"
            className="city_imput"
            placeholder="Entering a city"
          />
          <ul className="autocomplete">
            {
                 (value.length > 3) && isOpen && cityList[0]?.name
                   ? cityList.map(el => (
                     <li
                       key={ el.key }
                       className="autocomplete_item"
                       onClick={ () => itemClickHandler(el.name) }
                     >
                       {el.name}
                     </li>
                   ))
                   : null
            }

          </ul>
          { isErorImp
          && <p className="eror_imp">To search for a city, enter at least 4 characters</p>}
        </div>
        {
        value.length > 3 ? (
          <Link className="link_none" to={ `/${value.split(',')[0]}` }>
            <button className="btn_entry_sity">Search</button>
          </Link>
        ) : (
          <button onClick={ () => setIsErorImp(true) } className="btn_entry_sity">Search</button>
        )
      }
        <button onClick={ () => getGeoCityName() } className="btn_geoposition" />
      </div>
    </div>
  )
}

export { Home }
