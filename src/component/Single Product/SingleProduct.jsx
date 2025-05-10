import React, { Children, useEffect, useState } from 'react'
import './SingleProduct.css'
import { useParams } from 'react-router-dom';
import apiClient from '../../utils/api-client';
import UseData from '../../Hooks/UseData';
import Quantity from '../common/Quantity';

const SingleProduct = ({ isAuthenticated, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    const { data: singleProduct, error } = UseData(`/products/${id}`) //api call

    //select image
    const [index, setIndex] = useState(0);
    const handleImageClick = (index) => {
        setIndex(index)
    }

    return (
        <section className='align_center single_product'>
            <div className="align_center">
                <div className="single_product_array">
                    {
                        singleProduct?.images.map((img, index) => (
                            <img src={`http://localhost:5000/products/${img}`} key={index} onClick={() => handleImageClick(index)} />
                        ))
                    }
                </div>
                <img src={`http://localhost:5000/products/${singleProduct?.images[index]}`} alt="" className='single_product_display' />

            </div>


            <div className="details">
                <h1 className="title">{singleProduct?.title}</h1>
                <p className="des">{singleProduct?.description}</p>
                <p className="price">${singleProduct?.price.toFixed(2)}</p>
             
                <button disabled={!isAuthenticated} className="addToCart" onClick={() => addToCart(singleProduct, quantity)}>
                    Add to Cart
                </button>
            </div>

            <div>
                {error &&
                    <em>{error}</em>
                }
            </div>
        </section>
    )
}

export default SingleProduct
