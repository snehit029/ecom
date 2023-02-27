/*import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { payment } from '../redux/userRedux';

const Button = styled.button`
width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer`;



const PayButton =({cart, cartItems}) => {

  const dispatch = useDispatch()

  const pay = () =>{
    console.log(cartItems);
    dispatch(payment(cartItems));
 }

  const user = useSelector((state) => state.auth)

    /*const handleCheckout = ()=>{
    axios.post(`/api/stripe/create-checkout-session`,{
      cartItem,
      userId: user._id
    }).then((res)=>{
      if(res.data.url){
        window.location.href = res.data.url;
      }
    })
   .catch((err) => console.log(err.message));
  }
    return (
        <>
        <Button onClick={pay}> Check Out</Button>
        </>
    )
}

export default PayButton*/



import axios from "axios";
import { useSelector } from "react-redux";


const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`http://localhost:5000/api/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;