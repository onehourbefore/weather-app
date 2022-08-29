import React from 'react'
import { Routes, Route } from 'react-router-dom'

import CurrentWeather from './pages/CurrentWeather/CurrentWeather'
import HourlyWeather from './pages/HourlyWeather/HourlyWeather'
import SearchWeather from './pages/SearchWeather/SearchWeather'
import Page404 from './pages/Page404/Page404'

import { useAppDispatch } from './store'
import { getLat, getLon } from './store/coords/slice'

import cl from './styles/App.module.scss'


const App: React.FC = () => {
  const dispatch = useAppDispatch ()

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition ((res) => {
        try {
          dispatch (getLat (String (res.coords.latitude)))
          dispatch (getLon (String (res.coords.longitude)))
        } catch (e) {
        alert (e)
        }
    })
}

  React.useEffect (() => {
    getCoords ()
  }, [])

  return (
    <div className={cl.root}>
      <div className={cl.root_container}>
        <Routes>
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/hourly" element={<HourlyWeather />} />
          <Route path="/search" element={<SearchWeather />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
