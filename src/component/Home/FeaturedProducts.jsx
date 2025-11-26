import React from 'react'
import './FeaturedProducts.css'
import ProductCard from '../Products/ProductCard'
import UseData from '../../Hooks/UseData'
import { CircleLoader } from 'react-spinners'


const FeaturedProducts = () => {
    const { data: products, isLoading } = UseData('/products/featured')

    return (
        <section className='featured_products'>
            {isLoading ? (
                <div className="loader_center">
                    <CircleLoader />
                </div>
            ) : (
                <>
                    <h2>Featured Products</h2>

                    <div className="align_center featured_products_list">
                        {products?.map(p => (
                            <ProductCard key={p._id} product={p} id={p._id} />
                        ))}
                    </div>
                </>
            )}
        </section>

    )
}

export default FeaturedProducts
