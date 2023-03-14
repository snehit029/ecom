import { Badge } from '@material-ui/core';
import {  ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { mobile } from '../responsive';
import { logout, reset } from '../redux/userRedux';
import { selectTotalQTY } from '../redux/cartRedux';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {user} = useSelector((state)=> state.auth) 
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

 
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <Container>
        <Wrapper>
            <Left>
                
            </Left>
            <Link to="/">
            <Center >
              <Logo >
                SPECTER
                </Logo>
                </Center>
                </Link>
         <Right>
          {user ? (<span onClick={onLogout}>{user.username}</span>) :
          (<><Link to='/register'><MenuItem>
          REGISTER</MenuItem></Link>
            <Link to='/login'>
            <MenuItem>LOG IN</MenuItem>
            </Link></>)}
            
            <Link to='/cart'>
            <MenuItem>
            <Badge badgeContent={cartTotalQuantity} color="primary" overlap='rectangular' >
            <ShoppingCartOutlined />
            </Badge>
           </MenuItem>
  </Link>
  </Right>
            </Wrapper>
            </Container>
  )
}

export default Navbar