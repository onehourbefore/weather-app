import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IActive, PageStatus } from '../../models/activeModels'

const initialState: IActive = {
    page: PageStatus._NONE
}

export const activeSlice = createSlice ({
    name: 'active',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction <PageStatus>) => {
            state.page = action.payload
        }
    }
})

const { actions, reducer } = activeSlice

export default reducer
export const { changePage } = actions