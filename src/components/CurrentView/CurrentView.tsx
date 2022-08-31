import React from 'react'

import Navbar from '../Navbar/Navbar'
import { getDateNow } from '../../utils/getDateNow'
import { AxiosCurrentDataType, CoordsModifyType, SunModifyType, TempModifyType } from '../../models/currentModels'

import geo from '../../assets/png/geo.png'

import clear from '../../assets/png/weatherIcons/clear.png'
import clouds from '../../assets/png/weatherIcons/clouds.png'
import partly_clouds from '../../assets/png/weatherIcons/partly_clouds.png'
import rain from '../../assets/png/weatherIcons/rain.png'
import thunderstorm from '../../assets/png/weatherIcons/thunderstorm.png'

import cl from './CurrentView.module.scss'


type CurrentViewProps = {
    data: AxiosCurrentDataType,
    coordsModify: CoordsModifyType,
    tempModify: TempModifyType,
    sunModify: SunModifyType,
    windDegsModify: string
}

const CurrentView: React.FC <CurrentViewProps> = ({data, coordsModify, tempModify, sunModify, windDegsModify}) => {
    const dateNow = getDateNow ()
    const icons = [
        {icon: 'Rain', path: rain},
        {icon: 'Clear', path: clear},
        {icon: 'Clouds', path: clouds},
        {icon: 'Partly_clouds', path: partly_clouds},
        {icon: 'Thunderstorm', path: thunderstorm}
    ]
    const currentIcon = React.useCallback (() => {
        if (!data.weather[0].main) return
        for (let elem of icons) {
            if (elem.icon === data.weather[0].main) {
                return elem.path
            }
        }
        return icons[0].path
    }, [data.weather[0].main])

    return (
        <>
            <Navbar />
            <div className={cl.root}>
                <div className={cl.root_title}>
                    <div className={cl.root_title_city}>
                        <img src={geo} alt="geolocation" />
                        <h3>{data.name} ({data.sys.country})</h3>
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
                            {data.weather[0].description.slice (0, 1).toUpperCase () + 
                            data.weather[0].description.slice (1)}
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
                            <div>{data.wind.speed}м/c ({windDegsModify})</div>
                        </div>
                        <div className={cl.root_other_item}>
                            Видимость
                            <div>{data.visibility}м</div>
                        </div>
                    </div>
                    <div>
                        <div className={cl.root_other_item}>
                            Закат
                            <div>{sunModify.sunset}</div>
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

export default CurrentView