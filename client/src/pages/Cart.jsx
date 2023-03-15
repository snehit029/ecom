import { Add, Remove } from "@material-ui/icons";
import PayButton from '../components/PayButton'
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import styled from "styled-components";
import Announcement from '../components/Annoucement'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { payment } from "../redux/userRedux.js"
import {  clearCart, decrementQuantity, getTotals, incrementQuantity, removeItem } from "../redux/cartRedux";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const {user} = useSelector((state)=>state.auth)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getTotals());
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  const handleRemoveFromCart = (item) =>{
    dispatch(removeItem(item));
  }

  const handleDecreaseCart = (item)=>{
     dispatch(decrementQuantity(item));
  }

  const handleIncreaseCart = (item) =>{
    dispatch(incrementQuantity(item));
  }

  const clearCartHandler = () =>{
    dispatch(clearCart())
  }

 const pay = () =>{
    dispatch(payment(cart));
 }

 const continueHandler = () =>{
  navigate("/products")
 }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={continueHandler}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(0)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton  onClick={clearCartHandler}>CLEAR CART</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.cartItems.map((item, id)=>(
            <Product key={id}>
              <ProductDetail>
                <Image  src={item.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {item.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item._id}
                  </ProductId>
                  <ProductColor color={item.color} />
                  <ProductSize>
                    <b>Size:</b> {item.size}
                  </ProductSize>
                  
                </Details>
              </ProductDetail>
             
              <PriceDetail>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" 
              className="w-5 h-5" width={35} onClick={()=> handleRemoveFromCart(item)} cursor="pointer">
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            
            </svg>

              <ProductAmountContainer>
                  <span>Quantity </span>
                  <Remove  cursor="pointer"  onClick = {()=> handleDecreaseCart(item)}/>
                  <ProductAmount>{item.cartQuantity}</ProductAmount>
                  <Add  cursor="pointer" onClick ={()=> handleIncreaseCart(item)}/>

                </ProductAmountContainer>
                <ProductPrice>Price: Rs.{item.price * item.cartQuantity}</ProductPrice>
              </PriceDetail>
            </Product>))}
            <Hr />
          
          
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.cartTotalAmount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 100</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs. -100</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.cartTotalAmount}</SummaryItemPrice>
            </SummaryItem>
            {user ? ( <PayButton cart = {cart} cartItems={cart.cartItems} onClick={pay}/>) : (<Button onClick={()=> navigate('/login')}>Login to Checkout</Button>)}
          
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
