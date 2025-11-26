# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# CartWish

CartWish is a simple e-commerce demo application built with React.  
Users can browse products, view product details, add/remove items from the **Cart**,  
and use basic **authentication (Signup/Login)** powered by **JWT tokens**.

The project demonstrates:
- Routing
- Component-based UI
- Authentication flows
- Route protection
- API data fetching using Axios
- Error handling
- State management with React hooks

---

## 🚀 Live Demo

- Demo: https://serene-gelato-973a92.netlify.app/ 

---

### **Core Features**
- Product listing page  
- Product detail page (`/product/:id`)  
- Add to cart / remove from cart  
- Signup / Login 

### **Authentication Features**
- User **Signup**
- User **Login**
- Backend returns a **JWT token**
- Token stored in browser (localStorage/sessionStorage)
- Protected routes accessible only when logged in  
- Auto-redirect if user is not authenticated

### **Routing**
- Dynamic routing using React Router  
- Route protection using a custom `ProtectedRoute` component

### **API**
- Fetching product data using Axios  
- Posting login/signup data to server  
- Attaching JWT token to protected API calls  

### **Error handling**
- Loading states  
- Failed API calls  
- Invalid credentials  
- Token expiration

---

## 🛠️ Tech Stack

- **React**  
- **React Router DOM**  
- **Axios**  
- **JWT Authentication**  
- **JavaScript (ES6+)**  
- **CSS**
---

## 📁 Project Structure
src/
components/ # UI components (Navbar, ProductCard, Cart, ProtectedRoute)
pages/ # Screens (Home, ProductDetail, Cart, Signup, Login, MyOrder)
hooks/ # Custom hooks (useData, useAxios)
services/ # Axios instance + token interceptors
routes/ # Routing setup (routing.jsx)
App.jsx # Root layout
index.js # Entry point with BrowserRouter

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.