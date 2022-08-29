import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import coords from './coords/slice'
import current from './current/slice'
import hourly from './hourly/slice'
import active from './active/slice'
import search from './search/slice'


export const store = configureStore ({
    reducer: { coords, current, hourly, active, search },
    middleware: getDefaultMiddleware => getDefaultMiddleware (),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store

export type RootState = ReturnType <typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
