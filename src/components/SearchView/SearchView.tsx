import React from 'react'
import { Link } from 'react-router-dom'

import { AxiosSearchDataType } from '../../models/searchModels'
import { getDateNow } from '../../utils/getDateNow'

import backIcon from '../../assets/png/back.png'
import clear from '../../assets/png/weatherIcons/clear.png'
import clouds from '../../assets/png/weatherIcons/clouds.png'
import partly_clouds from '../../assets/png/weatherIcons/partly_clouds.png'
import rain from '../../assets/png/weatherIcons/rain.png'
import thunderstorm from '../../assets/png/weatherIcons/thunderstorm.png'


import cl from './SearchView.module.scss'


type SearchViewProps = {
    data: AxiosSearchDataType,
    coords: {lat: string [], lon: string []},
    temp: number | null,
    sun: {sunrise: string, sunset: string},
    windDeg: string
}

const SearchView: React.FC <SearchViewProps> = ({data, coords, temp, sun, windDeg}) => {
    const dateNow = getDateNow ()
    const icons = [
        {icon: 'Rain', path: rain},
        {icon: 'Clear', path: clear},
        {icon: 'Clouds', path: clouds},
        {icon: 'Partly_clouds', path: partly_clouds},
        {icon: 'Thunderstorm', path: thunderstorm}
    ]
    const currentIcon = React.useCallback (() => {
        if (data) {
            for (let elem of icons) {
                if (elem.icon === data.weather[0].main) {
                    return elem.path
                }
            }
            return icons[0].path
        }
    }, [data])

    return (
        <>
            <div className={cl.root}>
                <div className={cl.root_title}>
                    <Link to="/">
                        <button>
                            <img src={backIcon} alt="back" />
                        </button>
                    </Link>
                    <h3>{data.name.slice (0, 1).toUpperCase () + data.name.slice (1)} ({data.sys.country})</h3>
                    <div className={cl.root_title_coords}>
                        {coords.lat[0]}&deg;{coords.lat[1]}&prime;
                        : {coords.lon[0]}&deg;{coords.lon[1]}&prime;
                    </div>
                    <div className={cl.root_title_temp}>
                        <div>{dateNow.day} {dateNow.month} {dateNow.year}</div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <h1>
                                {temp} <span className={cl.degs}>&deg;C</span>
                            </h1>
                            <img src={currentIcon ()} alt="current weather" />
                        </div>
                        <div className={cl.descr}>
                            {data.weather[0].description.slice (0, 1).toUpperCase () + data.weather[0].description.slice (1)}
                        </div>
                    </div>
                </div>

                <div className={cl.root_other}>
                    <div>
                        <div className={cl.root_other_item}>
                            Восход (UTC)
                            <div>{sun.sunrise}</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Скорость ветра
                            <div>{data.wind.speed}м/c</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Направление
                            <div>{windDeg}</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Видимость
                            <div>{data.visibility}м</div>
                        </div>
                    </div>
                    <div>
                        <div className={cl.root_other_item}>
                            Закат (UTC)
                            <div>{sun.sunset}</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Давление 
                            <div>{data.main.pressure}mbar</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Влажность 
                            <div>{data.main.humidity}%</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Облачность 
                            <div>{data.clouds.all}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchView