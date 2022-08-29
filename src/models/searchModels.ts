
export type SearchDataType = {
    coords: {lat: string, lon: string},
    city: string
    country: string
    temp: number | null
    main: string
    descr: string
    pressure: number | null
    humidity: number | null
    windSpeed: number | null
    windDeg: number | null
    cloudsNum: number | null
    visibility: number | null
    sunrise: number | null
    sunset: number | null
}

export enum SearchStatus {
    _IDLE = 'idle',
    _LOADING = 'loading',
    _SUCCESS = 'success',
    _ERROR = 'error'
}

export interface ISearch {
    searchData: SearchDataType,
    status: SearchStatus,
    query: string
}

