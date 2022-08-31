import React from 'react'
import { useSelector } from 'react-redux'

import Spinner from '../components/Spinner/Spinner'
import ErrorComp from '../components/Error/ErrorComp'
import HourlyView from '../components/HourlyView/HourlyView'

import { RootState, useAppDispatch } from '../store'
import { useGetHourlyQuery } from '../api/apiSlice'
import { changePage } from '../store/active/slice'
import { HourlyDataType } from '../models/hourlyModels'
import { PageStatus } from '../models/activeModels'

import { getModifyHourlyData } from '../utils/getModify'


const HourlyWeather: React.FC = () => {
    const coords = useSelector ((state: RootState) => state.coords)
    const { data, isLoading, isError, isSuccess } = useGetHourlyQuery (coords)

    const dispatch = useAppDispatch ()
    const [modifyHourlyData, setModifyHourlyData] = React.useState <HourlyDataType [] [] | []> ([])

    React.useEffect (() => {
        if (isSuccess) {
            setModifyHourlyData (getModifyHourlyData (data.list).slice (0, getModifyHourlyData (data.list).length - 1))
            dispatch (changePage (PageStatus._HOURLY))
        }
    }, [isSuccess])

    return (
        <>
            {isLoading && <Spinner />}
            {isError && <ErrorComp />}
            {isSuccess && 
                <HourlyView data={modifyHourlyData} />}
        </>
    )
}

export default HourlyWeather