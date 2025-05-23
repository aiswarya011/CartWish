import React from 'react'
import './Link.css'
import { NavLink,  } from 'react-router-dom'

const EachLink = ({ title, link }) => {
    return (
        <NavLink
            to={link}
            className={({ isActive }) =>
                isActive ? 'align_center links active' : 'align_center links'
            }
        >
            {title}
        </NavLink>
    )
}

export default EachLink
