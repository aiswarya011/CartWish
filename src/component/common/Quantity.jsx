import React, { useEffect, useState } from 'react'
import apiClient from '../../utils/api-client'

const Quantity = ({ id, quantity, fetchCart }) => {
    const [qty, setQty] = useState(quantity)
    const [outOfStock, setOutOfStock] = useState(false)

    useEffect(() => {
        setQty(quantity);
    }, [quantity]);

    const increment = () => {
        apiClient.patch(`/cart/increase/${id}`)
            .then(() =>
                fetchCart(),
                setOutOfStock(false))
            .catch(err => {
                handleOutOfStock(err.response.data.message)
            }) // fetch new data
    };

    const decrement = () => {
        if (qty > 1) {
            apiClient.patch(`/cart/decrease/${id}`)
                .then(() =>
                    fetchCart(),
                    handleOutOfStock(null)
                ) // fetch new data
        }
    };

    const handleOutOfStock = (message) => {
        message === 'Product out of stock' ? setOutOfStock(true) : setOutOfStock(false)
    }

    return (
        <div className='qty_container'>
            <div className="align_center qty_input">
                <button className="qty_button" onClick={() => decrement()} disabled={qty <= 1}> - </button>
                <p className="qty_input_count">{qty}</p>
                <button disabled={outOfStock} className="qty_button" onClick={() => increment()} > + </button>
            </div>

            {outOfStock && (
                <span className="out-of-stock-message" style={{ color: 'red' }}>
                    Out of Stock..
                </span>
            )}
        </div>
    )
}

export default Quantity
