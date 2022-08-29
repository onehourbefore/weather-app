import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICoords } from "../../models/coordsModels"


const initialState: ICoords = {
    lat: '',
    lon: ''
}

export const coordsSlice = createSlice ({
    name: 'coords',
    initialState,
    reducers: {
        getLat: (state, action: PayloadAction <string>) => {
            state.lat = action.payload
        },
        getLon: (state, action: PayloadAction <string>) => {
            state.lon = action.payload
        }
    }
})

const { actions, reducer } = coordsSlice

export default reducer
export const {getLat, getLon} = actions