import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { reset, login } from '../redux/userRedux';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &::disabled{
     color: green;
     cursor: not-allowed;
  }
`;

const Line = styled.div`
  width: 100%;
  margin: 5px 0px;
  font-size: 12px;
  cursor: pointer;
`;

const Span = styled.span`
font-weight: bold;
margin-left: 10px;
`;


const Error = styled.span`
  color:red;
`

const Login = () => {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

   const formData = { email, password }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )  

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleClick = (e) =>{
    e.preventDefault();
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input value={email} placeholder="email"  onChange={(e)=>setEmail( e.target.value)} />
          <Input value={password} placeholder="password" 
          type='password'
          onChange={(e)=>setPassword(e.target.value)} />
          <Button onClick={handleClick}>LOGIN</Button>
          <Line>Email: "jack@gmail.com"
            Password: "jack"
          </Line>
          <Link to="/register">
           <Line >CREATE A NEW ACCOUNT?
            <Span>
           RESGISTER
          </Span>
          </Line>
          </Link>

        </Form>
      </Wrapper>
    </Container>
  );
};



export default Login