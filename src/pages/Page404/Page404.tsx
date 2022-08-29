import React from 'react'
import { Link } from 'react-router-dom'

import notFound from '../../assets/png/notFound.png'
import back from '../../assets/png/back.png'

import cl from './Page404.module.scss'

const Page404 = () => {
    return (
        <div className={cl.root}>
            <Link to="/" className={cl.toMain}>
                <div>
                    <img src={back} alt="Back" />
                </div>
            </Link>
            <img 
                className={cl.notFoundIcon}
                src={notFound} 
                alt="Page not found"
                />
            <h3>Страница не найдена</h3>
        </div>
    )
}

export default Page404