import React from 'react'
import cl from './Spinner.module.scss'


const Spinner: React.FC = () => {
    return (
        <div>
            <svg className={cl.root} viewBox="0 0 50 50">
                <circle className={cl.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        </div>
    )
}

export default Spinner