import React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store/index'

import Spinner from '../components/Spinner/Spinner'
import ErrorComp from '../components/Error/ErrorComp'
import SearchView from '../components/SearchView/SearchView'

import { useGetSearchQuery } from '../api/apiSlice'
import { changePage } from '../store/active/slice'
import { PageStatus } from '../models/activeModels'

import { getModifyCoords, getModifyTemp, getModifySunData, getModifyWindDegs } from '../utils/getModify'



const SearchWeather = () => {
    const dispatch = useAppDispatch ()
    const { query } = useSelector ((state: RootState) => state.active)
    const { data, isLoading, isError, isSuccess } = useGetSearchQuery (query)

    const [coordsModify, setCoordsModify] = React.useState <{lat: string [], lon: string []}> ({lat: [], lon: []})
    const [tempModify, setTempModify] = React.useState <number | null> (null)
    const [sunModify, setSunModify] = React.useState <{sunrise: string, sunset: string}> ({sunrise: '', sunset: ''})
    const [windDegModify, setWindDegModify] = React.useState ('')
    
    React.useEffect (() => {
        if (isSuccess) {
            setCoordsModify ({lat: getModifyCoords (String (data.coord.lat)), lon: getModifyCoords (String (data.coord.lon))})
            setTempModify (getModifyTemp (data.main.temp))
            setSunModify ({sunrise: getModifySunData (data.sys.sunrise), sunset: getModifySunData (data.sys.sunset)})
            setWindDegModify (getModifyWindDegs (data.wind.deg))
            return 
        }
        dispatch (changePage (PageStatus._SEARCH))
    }, [isSuccess])

    return (
        <React.Fragment>
        {isLoading && <Spinner />}
        {isError && <ErrorComp />}
        {isSuccess && 
            <SearchView data={data} coords={coordsModify} temp={tempModify} sun={sunModify} windDeg={windDegModify}/>}
        </React.Fragment>
    )
}

export default SearchWeather