import React from 'react'
import Home from './pages/Home'

import {  Routes,Route} from "react-router-dom"
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import  Login from './pages/Login'
import Register from './pages/Register'
import Success from './pages/Success'
import ProductPage from './pages/ProductPage'



const App = () => {
   
  return (
    
      <Routes>
        
        <Route path='/products/:category' element={<ProductList />}/>

        <Route path='/product/:id' element={<Product />} />
        
        <Route path='/cart' element =
        {<Cart />}/>

        <Route path='/success' element =
        {<Success />}/>

        <Route path='/login' element={<Login />} />
        
        <Route path='/register' element={<Register />} />

        <Route exact path='/' element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
      
      </Routes>
  )
}

export default App