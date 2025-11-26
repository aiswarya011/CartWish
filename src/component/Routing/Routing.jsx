import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Home/HomePage';
import ProductsPage from '../Products/ProductsPage';
import SingleProduct from '../Single Product/SingleProduct';
import LoginPage from '../Authentication/LoginPage';
import SignUp from '../Authentication/SignUp';
import PageNotFound from '../PageNotFound';
import CartPage from '../Cart/CartPage';
import Logout from '../Authentication/Logout';
import ProtectedRouting from './ProtectedRouting';
import OrderPlaced from '../Order Placed/OrderPlaced';

const Routing = ({ addToCart, isAuthenticated }) => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/products' element={<ProductsPage />}></Route>
            <Route path='/products/:id' element={<SingleProduct isAuthenticated={isAuthenticated} addToCart={addToCart} />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>


            {/* protected routes */}
            <Route path='/cart'
                element={<ProtectedRouting isAuthenticated={isAuthenticated} htmlElement={<CartPage />}
                />}>

            </Route>
            <Route path='/orderPlaced'
                element={<ProtectedRouting isAuthenticated={isAuthenticated} htmlElement={<OrderPlaced />}
                />}>

            </Route>
            
            <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
    )
}

export default Routing
