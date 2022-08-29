import React from 'react'
import { Link } from 'react-router-dom'

import backIcon from '../../assets/png/back.png'
import errorIcon from '../../assets/png/comp404.png'

import cl from './ErrorComp.module.scss'


const ErrorComp: React.FC = () => {
    return (
        <div className={cl.root}>
            <Link to="/">
                <img className={cl.backIcon} src={backIcon} alt="Назад"/>
            </Link>
            <div>
                <img className={cl.errorIcon} src={errorIcon} alt="Город не найден" />
            </div>
            <h2>Город не найден :(</h2>
        </div>
    )
}

export default ErrorComp