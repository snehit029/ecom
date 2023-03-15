import axios from "axios";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const Button = styled.button`
width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer`;


const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios.post("https://mern-ecomm-43hi.onrender.com/api/stripe/create-checkout-session"
    , 
      {
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
      <Button onClick={() => handleCheckout()}>
      Check out
      </Button>
    </>
  );
};

export default PayButton;