import React, { useEffect, useState } from 'react'
import './CartPage.css'
import Table from '../common/Table'
import Quantity from '../common/Quantity'
import remove from '../../assets/remove.png'
import apiClient from '../../utils/api-client'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
    const [cart, setCart] = useState(null)
    const [outOfStockMessage, setoutOfStockMessage] = useState('')
    const [eachPrice, setEachPrice] = useState(0)
    const [total, setTotal] = useState(0)
    const [grandTotal, setgrandTotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        apiClient.get('/cart')
            .then(res => {
                setCart(res.data)
            })
    }

    const removeItem = (id) => {
        apiClient.patch(`/cart/remove/${id}`)
            .then(res => {
                fetchData()
            })
            .catch(err => console.error('Error removing item:', err));
    };

    // Function to calculate total for each item
    const calculateTotal = (price, qty) => {
        if (!price || !qty) return 0; // Handle undefined or null cases
        return price * qty;
    };

    // Function to calculate the grand total
    const calculateGrandTotal = () => {
        // fetchData()
        const total = cart?.reduce((acc, item) => acc + calculateTotal(item.product.price, item.quantity), 0);
        setTotal(total);
        setgrandTotal(total + 5) // Set the grand total
    };

    // Recalculate the grand total when the cart changes
    useEffect(() => {
        calculateGrandTotal();
    }, [cart]); // This runs whenever the cart changes

    const checkout = () => {
    
    }


    return (
        <section className='align_center cart_page'>
            <h2>My Cart</h2>

            {/* table */}
            <Table headings={["Item", "Price", "Qty", "Total", "Delete"]}>
                {
                    cart?.length === 0 &&
                    <em className='align_center'>You have not yet added any item..</em>
                }
                {
                    cart?.map((cart, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{cart?.product?.title}</td>
                                <td>${cart?.product?.price}</td>
                                <td className='align_center out-of-stock-message'>
                                    <Quantity
                                        id={cart?.product?._id}
                                        fetchCart={fetchData}
                                        quantity={cart?.quantity}
                                    >
                                    </Quantity>
    
                                </td>
                                <td>
                                    {calculateTotal(cart?.product?.price, cart?.quantity)}
                                </td>
                                <td>
                                    <img onClick={() => removeItem(cart?.product?._id)} src={remove} alt="" className='remove' />
                                </td>
                            </tr>
                        </tbody>
                    ))
                }

            </Table>

            {/* bill */}
            {
                cart?.length > 0 &&
                <>
                    <table className="cart_bill">
                        <tbody>
                            <tr>
                                <td>SubTotal</td>
                                <td>${total}</td>
                            </tr>
                            <tr>
                                <td>Shipping Charge</td>
                                <td>$5</td>
                            </tr>
                            <tr className='cart_bill_final'>
                                <td>Final Total</td>
                                <td>${grandTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={(() => checkout())} className='search_button checkout_button ' >
                        Order
                    </button>
                </>

            }

        </section>
    )
}

export default CartPage
