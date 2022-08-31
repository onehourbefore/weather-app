import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AxiosCurrentDataType } from '../models/currentModels'
import { AxiosHourlyDataType } from '../models/hourlyModels'
import { AxiosSearchDataType } from '../models/searchModels'
import { apiBase, apiLang, apiKey } from './apiData'



export const apiSlice = createApi ({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery ({baseUrl: `${apiBase}`}),
    tagTypes: ['Current', 'Hourly', 'Search'],
    endpoints: (builder) => ({

        getCurrent: builder.query <AxiosCurrentDataType, {lat: string, lon: string}> ({
            query: ({lat, lon}) => `/weather?lat=${lat}&lon=${lon}&${apiLang}&${apiKey}`,
            providesTags: ['Current']
        }),

        getHourly: builder.query <AxiosHourlyDataType, {lat: string, lon: string}>({
            query: ({lat, lon}) => `/forecast?lat=${lat}&lon=${lon}&${apiLang}&${apiKey}`,
            providesTags: ['Hourly']
        }),

        getSearch: builder.query <AxiosSearchDataType, string> ({
            query: (city) => `/weather?q=${city}&${apiLang}&${apiKey}`,
            providesTags: ['Search']
        })
    })
})

export const { useGetCurrentQuery, useGetHourlyQuery, useGetSearchQuery } = apiSlice