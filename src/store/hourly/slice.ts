import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { IHourly, HourlyStatus, HourlyDataType, AxiosHourlyDataType } from "../../models/hourlyModels"
import { apiBase, apiKey, apiLang } from "../../utils/apiData"
import { getHourlySomeData } from "../../utils/getHourlySomeData"


const initialState: IHourly = {
    hourlyData: [],
    status: HourlyStatus._IDLE
}

type fetchHourlyArgs = {
    lat: string
    lon: string
}

export const fetchHourly = createAsyncThunk (
    'hourly/fetchHourly', async (coords: fetchHourlyArgs) => {
        const { data } = await axios.get  (
            `${apiBase}/forecast?lat=${coords.lat}&lon=${coords.lon}&${apiLang}&${apiKey}`
        )
        const someData: HourlyDataType [] = getHourlySomeData (data.list)
        return someData
    }
)

export const hourlySlice = createSlice ({
    name: 'hourly',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase (fetchHourly.pending, state => {
                state.status = HourlyStatus._LOADING
            })
            .addCase (fetchHourly.fulfilled, (state, action: PayloadAction <HourlyDataType []>) => {
                state.hourlyData = action.payload
                state.status = HourlyStatus._SUCCESS
            })
            .addCase (fetchHourly.rejected, state => {
                state.status = HourlyStatus._ERROR
            })
            .addDefaultCase (() => {})
    }
})

const { actions, reducer } = hourlySlice

export default reducer