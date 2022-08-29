import React from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { setQuery } from '../../store/search/slice'
import search from '../../assets/png/search.png'
import cl from './SearchComp.module.scss'



const SearchComp: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState ('')
    const dispatch = useAppDispatch ()

    const toSearch = (e: React.ChangeEvent <HTMLInputElement>) => {
        setSearchValue (e.target.value)
    }

    const toSubmit = () => {
        if (!searchValue) return
        dispatch (setQuery (searchValue))
        setSearchValue ('')
    }

    return (
        <div className={cl.root}>
            <input type="text" value={searchValue} onChange={toSearch} placeholder="Город..." />
            <Link to="/search">
                <button onClick={toSubmit}>
                    <img src={search} alt="search"/>
                </button>
            </Link>
        </div>
    )
}

export default SearchComp