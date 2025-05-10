import React, { useState } from 'react'
import './ProductsPage.css'
import SideBar from './SideBar'
import ProductsList from './ProductsList'
import UseData from '../../Hooks/UseData'

const ProductsPage = () => {
    const { data: category, error } = UseData('/category');
  
    return (
        <section className='products_page'>
            <SideBar category={category} error={error}></SideBar>


            <ProductsList></ProductsList>
        </section>
    )
}

export default ProductsPage
