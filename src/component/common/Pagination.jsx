import React from 'react'
import './Pagination.css'

const Pagination = ({ totalPost, postPerPage, onClick ,currentPage}) => {
    let pages = []
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pages.push(i)
    }
    return (
        <ul className='pagination'>
            {
                pages.map(p => (
                    <li key={p}>
                        <button
                            className={parseInt(currentPage) === p?'p_button active':'p_button'}
                            onClick={() => onClick(p)}>
                            {p}
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}

export default Pagination
