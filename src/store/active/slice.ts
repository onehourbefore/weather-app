import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IActive, PageStatus } from '../../models/activeModels'

const initialState: IActive = {
    page: PageStatus._NONE,
    query: ''
}

export const activeSlice = createSlice ({
    name: 'active',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction <PageStatus>) => {
            state.page = action.payload
        },
        changeQuery: (state, action: PayloadAction <string>) => {
            state.query = action.payload
        }
    }
})

const { actions, reducer } = activeSlice

export default reducer
export const { changePage, changeQuery } = actions