import React, { useState } from 'react'
import './Navbar.css'
import EachLink from './Link'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user }) => {
    console.log(user)
    return (
        <div>
            <nav className='align_center navbar'>
                <div className='align_center'>
                    <h1 className='navbar_heading'>
                        CartWish
                    </h1>
                </div>

                <div className='align_center navbar_links'>
                    {
                        user &&
                        <em>Welcome {user?.name}</em>
                    }
                    <EachLink title='Home' link='/'></EachLink>
                    <EachLink title='Products' link='/products'></EachLink>
                    {
                        !user &&
                        <>
                            <EachLink title='LogIn' link='/login'></EachLink>
                            <EachLink title='SignUp' link='/signup'></EachLink>
                        </>

                    }

                    {
                        user &&
                        <>
                            <EachLink title='Cart' link='/cart' className='align_center'></EachLink>
                            <EachLink title='Logout' link='/logout'></EachLink>
                        </>
                    }
                </div>
            </nav >
        </div >



    )
}

export default Navbar
