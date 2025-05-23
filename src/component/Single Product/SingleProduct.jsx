import React, {  useState } from 'react'
import './SingleProduct.css'
import { useParams } from 'react-router-dom';

import UseData from '../../Hooks/UseData';


const SingleProduct = ({ isAuthenticated, addToCart }) => {
    const [quantity] = useState(1);
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
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img src={`https://cartwish-backend-dl15.onrender.com/products/${img}`} key={index} onClick={() => handleImageClick(index)} />
                        ))
                    }
                </div>
                <img src={`https://cartwish-backend-dl15.onrender.com/products/${singleProduct?.images[index]}`} alt="" className='single_product_display' />

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
