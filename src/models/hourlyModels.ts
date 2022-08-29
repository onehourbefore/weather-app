
export type HourlyDataType = {
    temp: number | null
    main: string
    wind: number | null
    dt: string
}

export enum HourlyStatus {
    _IDLE = 'idle',
    _LOADING = 'loading',
    _ERROR = 'error',
    _SUCCESS = 'success'
}

export interface IHourly {
    hourlyData: HourlyDataType [] | []
    status: HourlyStatus
}

export type AxiosHourlyDataType = {
  "dt": number,
  "main": {
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "sea_level": number,
    "grnd_level": number,
    "humidity": number,
    "temp_kf": number
  },
  "weather": [
    {
      "id": number,
      "main": string,
      "description": string,
      "icon": string
    }
  ],
  "clouds": {
    "all": number
  },
  "wind": {
    "speed": number,
    "deg": number,
    "gust": number
  },
  "visibility": number,
  "pop": number,
  "sys": {
    "pod": string
  },
  "dt_txt": number
}