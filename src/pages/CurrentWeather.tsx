import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store/index'

import Spinner from '../components/Spinner/Spinner'
import ErrorComp from '../components/Error/ErrorComp'
import CurrentView from '../components/CurrentView/CurrentView'

import { useGetCurrentQuery } from '../api/apiSlice'
import { changePage } from '../store/active/slice'
import { TempModifyType, CoordsModifyType, SunModifyType } from '../models/currentModels'
import { PageStatus } from '../models/activeModels'

import { getModifyCoords, getModifyTemp, getModifySunData, getModifyWindDegs } from '../utils/getModify'


const CurrentWeather: React.FC = () => {
    const dispatch = useAppDispatch ()
    const coords = useSelector ((state: RootState) => state.coords)
    const { data, isLoading, isError, isSuccess } = useGetCurrentQuery ({lat: coords.lat, lon: coords.lon})

    const [coordsModify, setCoordsModify] = React.useState <CoordsModifyType> ({lat: [], lon: []})
    const [tempModify, setTempModify] = React.useState <TempModifyType> ({temp: null, feelsLike: null})
    const delayUTC = 3600 * 3
    const [sunModify, setSunModify] = React.useState <SunModifyType> ({sunrise: '', sunset: ''})
    const [windDegsModify, setWindDegsModify] = React.useState ('')

    React.useEffect (() => {
        if (isSuccess) {
            setTempModify ({
                ...tempModify,
                temp: getModifyTemp (data.main.temp),
                feelsLike: getModifyTemp (data.main.feels_like)
            })
            setSunModify ({
                ...sunModify,
                sunrise: getModifySunData (data.sys.sunrise + delayUTC),
                sunset: getModifySunData (data.sys.sunset + delayUTC)
            })
            setCoordsModify ({
                ...coordsModify, 
                lat: getModifyCoords (coords.lat),
                lon: getModifyCoords (coords.lon)
            })
            setWindDegsModify (getModifyWindDegs (data.wind.deg))
            dispatch (changePage (PageStatus._CURRENT))
        }
    }, [isSuccess])

    return (
        <React.Fragment>
        {isLoading && <Spinner />}
        {isError && <ErrorComp />}
        {isSuccess && 
            <CurrentView 
                data={data} 
                coordsModify={coordsModify}
                tempModify={tempModify} 
                sunModify={sunModify} 
                windDegsModify={windDegsModify} />}
        </React.Fragment>
    )
}

export default CurrentWeather