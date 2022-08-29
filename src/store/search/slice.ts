import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { ISearch, SearchDataType, SearchStatus } from "../../models/searchModels"
import { apiBase, apiLang, apiKey } from "../../utils/apiData"


const initialState: ISearch = {
    searchData: {
        coords: {lat: '', lon: ''},
        city: '',
        country: '',
        temp: null,
        main: '',
        descr: '',
        pressure: null,
        humidity: null,
        windSpeed: null,
        windDeg: null,
        cloudsNum: null,
        visibility: null,
        sunrise: null,
        sunset: null
    },
    status: SearchStatus._IDLE,
    query: ''
}

export const fetchNewCity = createAsyncThunk <SearchDataType, string> (
    'search/fetchNewCity', async (city: string) => {
        const { data } = await axios.get (`${apiBase}/weather?q=${city}&${apiLang}&${apiKey}`)
        return {
            coords: {lat: String (data.coord.lat), lon: String (data.coord.lon)},
            city: city,
            country: data.sys.country,
            temp: data.main.temp,
            main: data.weather[0].main,
            descr: data.weather[0].description,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            windDeg: data.wind.deg,
            cloudsNum: data.clouds.all,
            visibility: data.visibility,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
        }
    }
)

export const searchSlice = createSlice ({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction <string>) => {
            state.searchData = {
                coords: {lat: '', lon: ''},
                city: '',
                country: '',
                temp: null,
                main: '',
                descr: '',
                pressure: null,
                humidity: null,
                windSpeed: null,
                windDeg: null,
                cloudsNum: null,
                visibility: null,
                sunrise: null,
                sunset: null
            }
            state.query = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase (fetchNewCity.pending, (state) => {
                state.status = SearchStatus._LOADING
            })
            .addCase (fetchNewCity.fulfilled, (state, action: PayloadAction <SearchDataType>) => {
                state.searchData = action.payload
                state.status = SearchStatus._SUCCESS
            })
            .addCase (fetchNewCity.rejected, (state) => {
                state.status = SearchStatus._ERROR
            })
            .addDefaultCase (() => {})
    }
})

const { actions, reducer } = searchSlice

export default reducer
export const { setQuery } = actions