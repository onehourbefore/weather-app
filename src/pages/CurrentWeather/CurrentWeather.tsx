import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/index'

import Spinner from '../../components/Spinner/Spinner'
import ErrorComp from '../../components/Error/ErrorComp'
import Navbar from '../../components/Navbar/Navbar'

import { fetchCurrent } from '../../store/current/slice'
import { changePage } from '../../store/active/slice'
import { CurrentStatus, TempModifyType, CoordsModifyType, SunModifyType } from '../../models/currentModels'
import { PageStatus } from '../../models/activeModels'

import { getModifyCoords, getModifyTemp, getModifySunData, getModifyWindDegs } from '../../utils/getModify'
import { getDateNow } from '../../utils/getDateNow'

import geo from '../../assets/png/geo.png'

import clear from '../../assets/png/weatherIcons/clear.png'
import clouds from '../../assets/png/weatherIcons/clouds.png'
import partly_clouds from '../../assets/png/weatherIcons/partly_clouds.png'
import rain from '../../assets/png/weatherIcons/rain.png'
import thunderstorm from '../../assets/png/weatherIcons/thunderstorm.png'

import cl from './CurrentWeather.module.scss'


const CurrentWeather: React.FC = () => {
    const coords = useSelector ((state: RootState) => state.coords)
    const { currentData, status } = useSelector ((state: RootState) => state.current)
    const { city, country, temp, feelsLike, 
        main, descr, pressure, humidity, 
        wind, sunrise, sunset, windDegs, cloudsNum, visibility } = currentData
    const dispatch = useAppDispatch ()

    const dateNow = getDateNow ()
    const [coordsModify, setCoordsModify] = React.useState <CoordsModifyType> ({lat: [], lon: []})
    const [tempModify, setTempModify] = React.useState <TempModifyType> ({temp: null, feelsLike: null})
    const delayUTC = 3600 * 3
    const [sunModify, setSunModify] = React.useState <SunModifyType> ({sunrise: '', sunset: ''})
    const [windDegsModify, setWindDegsModify] = React.useState ('')

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
        if (coords.lat && coords.lon && temp && feelsLike && sunrise && sunset && windDegs) {
            setTempModify ({
                ...tempModify,
                temp: getModifyTemp (temp),
                feelsLike: getModifyTemp (feelsLike)
            })
            setSunModify ({
                ...sunModify,
                sunrise: getModifySunData (sunrise + delayUTC),
                sunset: getModifySunData (sunset + delayUTC)
            })
            setCoordsModify ({
                ...coordsModify, 
                lat: getModifyCoords (coords.lat),
                lon: getModifyCoords (coords.lon)
            })
            setWindDegsModify (getModifyWindDegs (windDegs))
            dispatch (changePage (PageStatus._CURRENT))
        }
        if (coords.lat && coords.lon && !currentData.city) {
            dispatch (fetchCurrent (coords))
        }
    }, [coords, temp])

    return (
        <React.Fragment>
        {status === CurrentStatus._LOADING && <Spinner />}
        {status === CurrentStatus._ERROR && <ErrorComp />}
        {status === CurrentStatus._SUCCESS && 
            <>
                <Navbar />
                <div className={cl.root}>
                    <div className={cl.root_title}>
                        <div className={cl.root_title_city}>
                            <img src={geo} alt="geolocation" />
                            <h3>{city} ({country})</h3>
                        </div>
                        <div className={cl.root_title_coords}>
                            {coordsModify.lat[0]}&deg;{coordsModify.lat[1]}&prime;
                            : {coordsModify.lon[0]}&deg;{coordsModify.lon[1]}&prime;
                        </div>
                        <div className={cl.root_title_temp}>
                            <div>{dateNow.day} {dateNow.month} {dateNow.year}</div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h1>
                                    {tempModify.temp} <span className={cl.degs}>&deg;C</span>
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
                                Восход
                                <div>{sunModify.sunrise}</div>
                            </div>
                            <div className={cl.root_other_item}>
                                Ощущается как 
                                <div>{tempModify.feelsLike}&deg;C</div>
                            </div>
                            <div className={cl.root_other_item}>
                                Ветер 
                                <div>{wind}м/c ({windDegsModify})</div>
                            </div>
                            <div className={cl.root_other_item}>
                                Видимость
                                <div>{visibility}м</div>
                            </div>
                        </div>
                        <div>
                            <div className={cl.root_other_item}>
                                Закат
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

export default CurrentWeather