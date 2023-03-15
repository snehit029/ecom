import { useState , useEffect } from "react"
import styled from "styled-components"
import axios from 'axios'
import Product from "./Product"
const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`

const Products = ({category,filters,sort}) => {
  
  const[products,setProducts] = useState([])
  
  const[filteredProducts,setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async ()=>{
      try{ 
        const res = await axios.get(category ?`https://mern-ecomm-43hi.onrender.com/api/products?category=${category}` :"https://mern-ecomm-43hi.onrender.com/api/products" );
        setProducts(res.data);
      }catch (err){}
    }
    getProducts()
  }, [category])
  
  useEffect(() => {
   category && setFilteredProducts(
    products.filter(item=> Object.entries(filters).every(([key,value])=>
    item[key].includes(value)))
   )

  }, [products,category,filters])

  useEffect(() => {
    if(sort === "newest"){
      setFilteredProducts(prev=>
        [...prev].sort((a,b) => a.createdAt - b.createdAt))
    } else  if(sort === "asc"){
      setFilteredProducts(prev=>
        [...prev].sort((a,b) => a.price - b.price))
    } else  {
      setFilteredProducts(prev=>
        [...prev].sort((a,b) => a.price - b.price))
    }
  }, [sort]) 
  
  

  return (
    <Container>
        { category ? filteredProducts.map((item, id)=>(
            <Product item = {item} key={id}/>
      )) : products.slice(0,8).map((item, id)=>(
        <Product item = {item} key={id}/>))
    }
    </Container>
  )
}

export default Products