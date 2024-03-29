import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { register, reset } from '../redux/userRedux';
import { mobile } from '../responsive';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    );
    
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;


const Register = () => {
 
 

  const [formdata, setFormdata] = useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:"",
  })
  
  
  const{ user,isError, isSuccess,message } = useSelector(
    (state) => state.auth)

  const { username, email, password } = formdata

  const dispatch = useDispatch();
  
  const navigate = useNavigate()
  
  useEffect(() => {
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])
    




  const handleSubmit=(e)=>{
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    }
    dispatch(register(userData))
  }
  return (
    <Container>
       <Wrapper>
           <Title>Create An Account</Title>
           <Form onSubmit={handleSubmit}>
               
               <Input type='text' placeholder="username" onChange={(e)=> setFormdata({...formdata, username: e.target.value})} />
               <Input type="email" placeholder="email" onChange={(e)=> setFormdata({...formdata, email: e.target.value})}/>
               <Input type='password' placeholder="password" onChange={(e)=> setFormdata({...formdata, password: e.target.value})} />
               <Input type='password' placeholder="Confirm password" onChange={(e)=> setFormdata({...formdata, confirmpassword: e.target.value})} />

               <Agreement>By creating an account, I consent to the processing of my personal data in acccordance with the <b>PRIVACY POLICY</b></Agreement>
               <Button>CREATE ACCOUNT</Button>
           </Form>
           </Wrapper> 
    </Container>
  )
}

export default Register