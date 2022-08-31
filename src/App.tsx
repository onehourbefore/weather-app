import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAppDispatch } from './store'
import { getLat, getLon } from './store/coords/slice'

import CurrentWeather from './pages/CurrentWeather'
import Spinner from './components/Spinner/Spinner'
import cl from './styles/App.module.scss'

const HourlyWeather = React.lazy (() => import ('./pages/HourlyWeather'))
const SearchWeather = React.lazy (() => import ('./pages/SearchWeather'))
const Page404 = React.lazy (() => import ('./pages/Page404/Page404'))


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
          <Route path="/hourly" element={
            <Suspense fallback={<Spinner />}>
              <HourlyWeather />
            </Suspense>} />
          <Route path="/search" element={
            <Suspense fallback={<Spinner />}>
              <SearchWeather />
            </Suspense>} />
          <Route path="*" element={
            <Suspense fallback={<Spinner />}>
              <Page404 />
            </Suspense>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App
