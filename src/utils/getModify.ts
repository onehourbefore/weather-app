import { HourlyDataType } from "../models/hourlyModels"
import { getHourlySomeData } from "./getHourlySomeData"


export const getModifyCoords = (str: string) => {
    let arr = str.split ('.')
    arr[1] = arr[1].slice (0, 2)
    return arr
}

export const getModifyTemp = (temp: number) => {
    return Math.round (temp - 273.15)
}


export const getModifySunData = (s: number) => {
    const t = s * 1000
    const years = Math.floor (t / (1000 * 60 * 60 * 24 * 30 * 12))
    const months = Math.floor (t / (1000 * 60 * 60 * 24 * 30) % 12)
    const days = Math.floor (t / (1000 * 60 * 60 * 24) % 30)
    let hours = Math.floor ((t / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor ((t / (1000 * 60)) % 60)
    const seconds = Math.floor ((t / 1000) % 60)

    const hoursModify = String (hours).length === 1 ? '0' + String (hours) : String (hours)
    const minutesModify = String (minutes).length === 1 ? '0' + String (minutes) : String (minutes)

    return `${hoursModify}:${minutesModify}`
}

export const getModifyHourlyData = (arr: any) => {
    const arrSomeData: HourlyDataType [] = getHourlySomeData (arr)

    let day = arrSomeData[0].dt.slice (8, 10)
    let counter = 0
    let modifyHourlyData: any = [[]]

    for (let i = 0; i < arrSomeData.length; i++) {
        if (day === arrSomeData[i].dt.slice (8, 10)) {
            modifyHourlyData[counter].push (arrSomeData[i])
            continue
        }
        day = arrSomeData[i].dt.slice (8, 10)
        modifyHourlyData.push ([])
        modifyHourlyData[counter + 1].push (arrSomeData[i])
        counter ++
    }

    return modifyHourlyData
}

export const getModifyWindDegs = (degs: number): string => {
    if (degs === 0) return 'С'
    if (degs > 0 && degs < 90) return 'С/В'
    if (degs === 90) return 'В'
    if (degs > 90 && degs < 180) return 'Ю/В'
    if (degs === 180) return 'Ю'
    if (degs > 180 && degs < 270) return 'Ю/З'
    if (degs === 270) return 'З'
    if (degs > 270 && degs < 360) return 'С/З'
    return ''
}