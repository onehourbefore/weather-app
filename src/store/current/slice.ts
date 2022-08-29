import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { ICurrent, CurrentStatus, CurrentDataType } from '../../models/currentModels'
import { apiBase, apiKey, apiLang } from "../../utils/apiData"

const initialState: ICurrent = {
    currentData: {
        city: '',
        country: '',
        temp: null,
        main: '',
        descr: '',
        feelsLike: null,
        pressure: null,
        humidity: null,
        wind: null,
        sunrise: null,
        sunset: null,
        windDegs: null,
        cloudsNum: null,
        visibility: null
    },
    status: CurrentStatus._IDLE
}


type fetchCurrentArgs = {
    lat: string
    lon: string
}

export const fetchCurrent = createAsyncThunk (
    'current/fetchCurrent', async (coords: fetchCurrentArgs) => {
        const { data } = await axios.get (
            `${apiBase}/weather?lat=${coords.lat}&lon=${coords.lon}&${apiLang}&${apiKey}`
            )
        const someData: CurrentDataType = {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            main: data.weather[0].main,
            descr: data.weather[0].description,
            feelsLike: data.main.feels_like,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            windDegs: data.wind.deg,
            cloudsNum: data.clouds.all,
            visibility: data.visibility
        }
        return someData
    }
)


export const currentSlice = createSlice ({
    name: 'current',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase (fetchCurrent.pending, state => {
                state.status = CurrentStatus._LOADING
            })
            .addCase (fetchCurrent.fulfilled, (state, action: PayloadAction <CurrentDataType>) => {
                state.currentData = action.payload
                state.status = CurrentStatus._SUCCESS
            })
            .addCase (fetchCurrent.rejected, state => {
                state.status = CurrentStatus._ERROR
            })
            .addDefaultCase (() => {})
    }
})

const { reducer } = currentSlice
export default reducer