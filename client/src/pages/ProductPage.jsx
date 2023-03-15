import styled from "styled-components"
import axios from 'axios'
import Product from "../components/Product.jsx"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar.jsx"
const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`



const ProductPage = () => {

    const [products, setProducts] = useState([])
    const getProducts = async()=>{
        const response = await axios.get("https://mern-ecomm-43hi.onrender.com/api/products")
         setProducts (response.data)
     }
    
    useEffect(() => {
      getProducts()
    }, [])
    
return (
  <>
    <Navbar />
    <Container>
     {products.map((item)=>(
     <Product item = {item} key={item.id}/>
     ))}
    </Container>
    </>

  )
}

export default ProductPage