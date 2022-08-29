import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/index'

import Spinner from '../../components/Spinner/Spinner'
import ErrorComp from '../../components/Error/ErrorComp'

import { fetchNewCity } from '../../store/search/slice'
import { changePage } from '../../store/active/slice'
import { SearchStatus } from '../../models/searchModels'
import { PageStatus } from '../../models/activeModels'

import { getModifyCoords, getModifyTemp, getModifySunData, getModifyWindDegs } from '../../utils/getModify'
import { getDateNow } from '../../utils/getDateNow'

import backIcon from '../../assets/png/back.png'
import clear from '../../assets/png/weatherIcons/clear.png'
import clouds from '../../assets/png/weatherIcons/clouds.png'
import partly_clouds from '../../assets/png/weatherIcons/partly_clouds.png'
import rain from '../../assets/png/weatherIcons/rain.png'
import thunderstorm from '../../assets/png/weatherIcons/thunderstorm.png'

import cl from './SearchWeather.module.scss'


const SearchWeather = () => {
    const dispatch = useAppDispatch ()
    const { searchData, status, query } = useSelector ((state: RootState) => state.search)
    const { coords, city, country, temp, main, 
        descr, pressure, humidity, windSpeed, windDeg, 
        cloudsNum, visibility, sunrise, sunset} = searchData
    const dateNow = getDateNow ()
    const [coordsModify, setCoordsModify] = React.useState <{lat: string [], lon: string []}> ({lat: [], lon: []})
    const [tempModify, setTempModify] = React.useState <number | null> (null)
    const [sunModify, setSunModify] = React.useState <{sunrise: string, sunset: string}> ({sunrise: '', sunset: ''})
    const [windDegModify, setWindDegModify] = React.useState ('')
    const icons = [
        {icon: 'Rain', path: rain},
        {icon: 'Clear', path: clear},
        {icon: 'Clouds', path: clouds},
        {icon: 'Partly_clouds', path: partly_clouds},
        {icon: 'Thunderstorm', path: thunderstorm}
    ]
    const currentIcon = React.useCallback (() => {
        if (!main) return
        for (let elem of icons) {
            if (elem.icon === main) {
                return elem.path
            }
        }
        return icons[0].path
    }, [main])
    
    React.useEffect (() => {
        if (coords.lat && coords.lon && temp && sunrise && sunset && windDeg) {
            setCoordsModify ({lat: getModifyCoords (coords.lat), lon: getModifyCoords (coords.lon)})
            setTempModify (getModifyTemp (temp))
            setSunModify ({sunrise: getModifySunData (sunrise), sunset: getModifySunData (sunset)})
            setWindDegModify (getModifyWindDegs (windDeg))
            return 
        }
        dispatch (fetchNewCity (query))
        dispatch (changePage (PageStatus._SEARCH))
    }, [searchData])

    return (
        <React.Fragment>
        {status === SearchStatus._LOADING && <Spinner />}
        {status === SearchStatus._ERROR && <ErrorComp />}
        {status === SearchStatus._SUCCESS &&
        <>
            <div className={cl.root}>
                <div className={cl.root_title}>
                    <Link to="/">
                        <button>
                            <img src={backIcon} alt="back" />
                        </button>
                    </Link>
                    <h3>{city.slice (0, 1).toUpperCase () + city.slice (1)} ({country})</h3>
                    <div className={cl.root_title_coords}>
                        {coordsModify.lat[0]}&deg;{coordsModify.lat[1]}&prime;
                        : {coordsModify.lon[0]}&deg;{coordsModify.lon[1]}&prime;
                    </div>
                    <div className={cl.root_title_temp}>
                        <div>{dateNow.day} {dateNow.month} {dateNow.year}</div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <h1>
                                {tempModify} <span className={cl.degs}>&deg;C</span>
                            </h1>
                            <img src={currentIcon ()} alt="current weather" />
                        </div>
                        <div className={cl.descr}>
                            {descr.slice (0, 1).toUpperCase () + descr.slice (1)}
                        </div>
                    </div>
                </div>

                <div className={cl.root_other}>
                    <div>
                        <div className={cl.root_other_item}>
                            Восход (UTC)
                            <div>{sunModify.sunrise}</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Скорость ветра
                            <div>{windSpeed}м/c</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Направление
                            <div>{windDegModify}</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Видимость
                            <div>{visibility}м</div>
                        </div>
                    </div>
                    <div>
                        <div className={cl.root_other_item}>
                            Закат (UTC)
                            <div>{sunModify.sunset}</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Давление 
                            <div>{pressure}mbar</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Влажность 
                            <div>{humidity}%</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Облачность 
                            <div>{cloudsNum}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </>}
        </React.Fragment>
    )
}

export default SearchWeather