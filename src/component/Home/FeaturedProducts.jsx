import React from 'react'
import './FeaturedProducts.css'
import ProductCard from '../Products/ProductCard'
import UseData from '../../Hooks/UseData'


const FeaturedProducts = () => {
    const { data: products} = UseData('/products/featured')
  
    return (
        <section className='featured_products'>
            <h2>
                Featured Products
            </h2>

            <div className="align_center featured_products_list">
                {
                    products?.map(p => (
                        <ProductCard key={p._id} product={p} id={p._id}></ProductCard>
                    ))
                }
            </div>
        </section>
    )
}

export default FeaturedProducts
