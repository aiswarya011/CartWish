import React from 'react'
import './ProductCard.css'

import basket from '../../assets/basket.png';
import star from '../../assets/white-star.png';
import EachLink from '../Navbar/Link';
import { NavLink } from 'react-router-dom';


const ProductCard = ({ id, product }) => {
    return (
        <article className='product_card'>
            <div className="product_image">
                <NavLink to={`/products/${id}`}>
                    <img src={`https://cartwish-backend-dl15.onrender.com/products/${product?.images[0]}`} alt="" />
                </NavLink>
            </div>

            <div className="product_details">
                <h3 className="product_price">${product?.price}</h3>
                <p className="product_title">{product?.title}</p>

                <footer className="align_center footer">
                    <div className="align_center">
                        <p className='align_center rating'>
                            <img src={star} alt="" />{product?.reviews?.rate}
                        </p>
                        <p className='review_count'>{product?.reviews?.counts}</p>
                    </div>

                    {/* add to cart button */}
                    {
                        product?.stock > 0 &&
                        <NavLink to={`/products/${id}`}>
                            <button className='hero_link'>
                                View
                            </button>
                        </NavLink>

                    }
                    {
                        product?.stock <= 0 &&
                        <em className='stock'>
                            Product out of stock..
                        </em>
                    }

                </footer>

            </div>
        </article>
    )
}

export default ProductCard
