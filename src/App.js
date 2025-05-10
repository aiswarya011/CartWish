import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Routing from './component/Routing/Routing';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import apiClient from './utils/api-client';

setAuthToken(sessionStorage.getItem('token'))

function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  const addToCart = (product, quantity) => {
    console.log(product._id)
    const updatedCart = [...cart]

    const productIndex = updatedCart.findIndex(item => item.product._id === product._id)

    if (productIndex === -1) {
      updatedCart.push({
        product: product,
        quantity: quantity
      })
    }
    else {
      updatedCart[productIndex].quantity += quantity
    }

    setCart(updatedCart)

    apiClient.post(`/cart/${product?._id}`, { quantity: quantity })//api
      .then(res => {
        toast.success(`Item has been added to your cart!`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(error => setCart(cart))
  }

  // useEffect(() => {
  //   console.log("refreshhhhh")
  //   try {
  //     const jwt = sessionStorage.getItem('token')
  //     const jwtUser = jwtDecode(jwt)

  //     //expiry
  //     if (Date.now() >= jwtUser.exp * 1000) {
  //       console.log("expire")
  //       setIsAuthenticated(false)
  //       sessionStorage.removeItem('token')
  //       Location.reload()
  //     } else {
  //       console.log("ok")
  //       setUser(jwtUser)
  //       setIsAuthenticated(true)
  //     }

  //   } catch (error) {
  //     setIsAuthenticated(false)
  //     console.log("error jwt");
  //   }

  // }, []);
  useEffect(() => {
    console.log("Checking authentication...");
    try {
      const jwt = sessionStorage.getItem("token");
      if (!jwt) {
        console.log("No token found");
        setIsAuthenticated(false);
        return;
      }

      const jwtUser = jwtDecode(jwt);


      // Check token expiry
      if (Date.now() >= jwtUser.exp * 1000) {
        console.log("Token expired");
        setIsAuthenticated(false);
        sessionStorage.removeItem("token");
        navigate("/login"); // Redirect to login
      } else {
        console.log("Token valid");
        setUser(jwtUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("JWT decode error:", error);
      setIsAuthenticated(false);
    }
  }, [navigate]);
 
  

  return (
    <div className="app">
      <Navbar user={user} ></Navbar>
      <main>
        <Routing addToCart={addToCart} isAuthenticated={isAuthenticated}></Routing>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
