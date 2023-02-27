import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { mobile } from '../responsive';
import { logout, reset } from '../redux/userRedux';

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

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
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

  const quantity = useSelector(state=>state.cart.quantity)

  const {user} = useSelector((state)=> state.auth) 
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  return (
    <Container>
        <Wrapper>
            <Left><SearchContainer>
             <Input />
             <Search />
            </SearchContainer>
                
            </Left>
            <Center><Logo>SPECTER</Logo></Center>
         <Right>
          {user ? (<span onClick={onLogout}>{user.username}</span>) :
          (<><Link to='/register'><MenuItem>
          REGISTER</MenuItem></Link>
            <Link to='/login'>
            <MenuItem>LOG IN</MenuItem>
            </Link></>)}
            
            <Language>EN</Language>
            <Link to='/cart'>
            <MenuItem>
            <Badge badgeContent={quantity} color="primary" overlap='rectangular' >
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