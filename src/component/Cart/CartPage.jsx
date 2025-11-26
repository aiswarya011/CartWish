import React, { useEffect, useState } from 'react'
import './CartPage.css'
import Table from '../common/Table'
import Quantity from '../common/Quantity'
import remove from '../../assets/remove.png'
import apiClient from '../../utils/api-client'
import 'react-toastify/dist/ReactToastify.css';
import { CircleLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { checkoutApi } from '../../utils/OrderServices'
import { toast } from 'react-toastify'

const CartPage = () => {
    const [cart, setCart] = useState(null)
    const [total, setTotal] = useState(0)
    const [grandTotal, setgrandTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => { //api to get all products in cart
        setIsLoading(true)
        apiClient.get('/cart')
            .then(res => {
                setIsLoading(false)
                setCart(res.data)
            })
    }

    const removeItem = (id) => { //delete item in cart
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]); // This runs whenever the cart changes

    const checkout = () => {
        const oldCart = [...cart]
        checkoutApi()
        .then(()=>{
            toast.success("Order PlacedSuccessfully!")
            setCart([])
            navigate('/orderPlaced');
        })
        .catch(()=>{
            toast.error("Error")
            setCart(oldCart)
        })
    }

    return (
        <>
            {/* Cart */}
            <section className="align_center cart_page cart_section">
                <h2>My Cart</h2>

                {cart?.length === 0 && <em className="align_center">You have not yet added any item..</em>}

                {/* loader overlay */}
                {isLoading && (
                    <div className="loader_overlay">
                        <CircleLoader />
                    </div>
                )}

                {cart?.length > 0 && (
                    <>
                        <Table headings={["Item", "Price", "Qty", "Total", "Delete"]}>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.product?._id ?? item.id}>
                                        <td>{item.product?.title}</td>
                                        <td>${item.product?.price}</td>
                                        <td className="align_center out-of-stock-message">
                                            <Quantity
                                                id={item.product?._id}
                                                fetchCart={fetchData}
                                                quantity={item.quantity}
                                            />
                                        </td>
                                        <td>{calculateTotal(item.product?.price, item.quantity)}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.product?._id)}
                                                className="icon_button"
                                            >
                                                <img src={remove} alt="" className="remove" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <table className="cart_bill">
                            <tbody>
                                <tr><td>SubTotal</td><td>${total}</td></tr>
                                <tr><td>Shipping Charge</td><td>$5</td></tr>
                                <tr className="cart_bill_final"><td>Final Total</td><td>${grandTotal}</td></tr>
                            </tbody>
                        </table>

                        <button onClick={checkout} className="search_button checkout_button" disabled={isLoading}>
                            Place Order
                        </button>
                    </>
                )}
            </section>


            {/* Order Placed */}
        </>

    )
}

export default CartPage
