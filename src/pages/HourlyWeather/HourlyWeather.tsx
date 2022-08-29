import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Spinner from '../../components/Spinner/Spinner'

import { RootState, useAppDispatch } from '../../store'
import { fetchHourly } from '../../store/hourly/slice'
import { changePage } from '../../store/active/slice'
import { HourlyDataType } from '../../models/hourlyModels'
import { PageStatus } from '../../models/activeModels'

import { getModifyHourlyData, getModifyTemp } from '../../utils/getModify'
import { getMonthForHourly } from '../../utils/getMonthForHourly'

import backIcon from '../../assets/png/back.png'
import clear from '../../assets/png/weatherIcons/clear.png'
import clouds from '../../assets/png/weatherIcons/clouds.png'
import partly_clouds from '../../assets/png/weatherIcons/partly_clouds.png'
import rain from '../../assets/png/weatherIcons/rain.png'
import thunderstorm from '../../assets/png/weatherIcons/thunderstorm.png'

import cl from './HourlyWeather.module.scss'


const HourlyWeather: React.FC = () => {
    const coords = useSelector ((state: RootState) => state.coords)
    const { hourlyData, status } = useSelector ((state: RootState) => state.hourly)
    const dispatch = useAppDispatch ()
    const [modifyHourlyData, setModifyHourlyData] = React.useState <HourlyDataType [] [] | []> ([])

    const icons = [
        {icon: 'Rain', path: rain},
        {icon: 'Clear', path: clear},
        {icon: 'Clouds', path: clouds},
        {icon: 'Partly_clouds', path: partly_clouds},
        {icon: 'Thunderstorm', path: thunderstorm}
    ]

    React.useEffect (() => {
        if (hourlyData.length) {
            setModifyHourlyData (getModifyHourlyData (hourlyData).slice (0, getModifyHourlyData (hourlyData).length - 1))
            dispatch (changePage (PageStatus._HOURLY))
            return 
        }
        if (coords.lat, coords.lon) {
            dispatch (fetchHourly (coords))
            return
        }

        return () => {
            window.location.replace ('http://localhost:3000/')
        }

    }, [coords, hourlyData])

    return (
        <>
            {status !== 'success' 
                ? <Spinner /> 
                : <>
                    <div className={cl.root}>
                        <Link to="/">
                            <img className={cl.backIcon} src={backIcon} alt="Назад" />
                        </Link>
                        {modifyHourlyData.map ((day, i) =>
                            <div key={i}>
                                <h3 style={{fontWeight: '800', marginTop: '25px', textAlign: 'center'}}>
                                    {day[0].dt.slice (8, 10)} {getMonthForHourly (day[0].dt.slice (5, 7))}
                                </h3>
                                <div className={cl.oneDay}>
                                    {day.map ((item, i) => {
                                        const currentIcon = () => {
                                            if (!item.main) return
                                            for (let elem of icons) {
                                                if (elem.icon === item.main) {
                                                    return elem.path
                                                }
                                            }
                                        }
                                        return <div key={i} className={cl.partOfDay}>
                                                    <img src={currentIcon ()} alt="weather" />
                                                    <div>
                                                        <div style={{
                                                            fontWeight: '600',
                                                            fontSize: '10px', 
                                                            marginBottom: '6px'}}>{item.dt.slice (10, 16)}</div>
                                                        {item.temp && getModifyTemp (item.temp)}&deg;C <br />
                                                        {item.wind} м/с<br />
                                                    </div>
                                                </div>
                                    })}
                                </div>
                            </div>
                        )}
                </div>
            </>}
        </>
    )
}

export default HourlyWeather