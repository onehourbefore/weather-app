import React from 'react'
import { Link } from 'react-router-dom'

import { getMonthForHourly } from '../../utils/getMonthForHourly'
import { getModifyTemp } from '../../utils/getModify'
import { HourlyDataType } from '../../models/hourlyModels'

import backIcon from '../../assets/png/back.png'
import clear from '../../assets/png/weatherIcons/clear.png'
import clouds from '../../assets/png/weatherIcons/clouds.png'
import partly_clouds from '../../assets/png/weatherIcons/partly_clouds.png'
import rain from '../../assets/png/weatherIcons/rain.png'
import thunderstorm from '../../assets/png/weatherIcons/thunderstorm.png'

import cl from './HourlyView.module.scss'

type HourlyViewProps = {
    data: HourlyDataType [] []
}

const HourlyView: React.FC <HourlyViewProps> = ({data}) => {
    const icons = [
        {icon: 'Rain', path: rain},
        {icon: 'Clear', path: clear},
        {icon: 'Clouds', path: clouds},
        {icon: 'Partly_clouds', path: partly_clouds},
        {icon: 'Thunderstorm', path: thunderstorm}
    ]

    return (
        <>
            <div className={cl.root}>
                <Link to="/">
                    <img className={cl.backIcon} src={backIcon} alt="Назад" />
                </Link>
                {data.map ((day, i) =>
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
        </>
    )
}

export default HourlyView