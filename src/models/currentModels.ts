
export type CurrentDataType = {
    city: string
    country: string
    temp: number | null
    main: string
    descr: string
    feelsLike: number | null
    pressure: number | null
    humidity: number | null
    wind: number | null
    sunrise: number | null
    sunset: number | null
    windDegs: number | null
    cloudsNum: number | null
    visibility: number | null
}

export enum CurrentStatus {
    _IDLE = 'idle',
    _LOADING = 'loading',
    _ERROR = 'error',
    _SUCCESS = 'success'
}

export interface ICurrent {
    currentData: CurrentDataType
    status: CurrentStatus
}

export type AxiosCurrentDataType = {
    "coord": {
      "lon": number,
      "lat": number
    },
    "weather": [
      {
        "id": number,
        "main": string,
        "description": string,
        "icon": string
      }
    ],
    "base": string,
    "main": {
      "temp": number,
      "feels_like": number,
      "temp_min": number,
      "temp_max": number,
      "pressure": number,
      "humidity": number
    },
    "visibility": number,
    "wind": {
      "speed": number,
      "deg": number,
      "gust": number
    },
    "clouds": {
      "all": number
    },
    "dt": number,
    "sys": {
      "type": number,
      "id": number,
      "country": string,
      "sunrise": number,
      "sunset": number
    },
    "timezone": number,
    "id": number,
    "name": string,
    "cod": number
  }

export type TempModifyType = {
  temp: number | null, 
  feelsLike: number | null
}

export type CoordsModifyType = {
  lat: string [], 
  lon: string []
}

export type SunModifyType = {
  sunrise: string, 
  sunset: string
}