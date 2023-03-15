import axios from 'axios'

const API_URL = 'https://mern-ecomm-43hi.onrender.com/api/auth/'
const pay = 'https://mern-ecomm-43hi.onrender.com/api/stripe/create-checkout-session'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

//Payment
const payment = async(cart, cartItems)=>{
  const response = await axios.post(pay, cartItems)
  
  if(response.data.url){
    window.location.href = response.data.url;
  }
}



const authService = {
    register,
    login,
    logout,
    payment
  }
  
  export default authService