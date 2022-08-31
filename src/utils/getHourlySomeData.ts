import { AxiosHourlyOneItemType, HourlyDataType } from "../models/hourlyModels"

export const getHourlySomeData = (list: AxiosHourlyOneItemType []) => {
    let data: any [] = []
    list.map (item => {
        const obj = {
            temp: item.main.temp,
            main: item.weather[0].main,
            wind: item.wind.speed,
            dt: String (item.dt_txt)
        }
        data.push (obj)
    })
    return data
}