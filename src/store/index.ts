import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import coords from './coords/slice'
import active from './active/slice'
import { apiSlice } from '../api/apiSlice'


export const store = configureStore ({
    reducer: { coords, active, [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware ().concat (apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store

export type RootState = ReturnType <typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
