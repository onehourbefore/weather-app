import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import SearchComp from '../SearchComp/SearchComp'

import { RootState } from '../../store'

import cl from './Navbar.module.scss'


const Navbar: React.FC = () => {
    const { page } = useSelector ((state: RootState) => state.active)
    const classesCurrent = page === 'current' ? [cl.link, cl.active].join (' ') : cl.link
    const classesHourly = page === 'hourly' ? [cl.link, cl.active].join (' ') : cl.link

    return (
        <div className={cl.root}>
            <Link 
                className={classesCurrent} 
                to="/" >
                В данный<br />момент
            </Link>
            <Link 
                className={classesHourly} 
                to="/hourly" >
                Прогноз на<br />5 дней
            </Link>

            <SearchComp />
        </div>
    )
}

export default Navbar