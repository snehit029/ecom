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

const Products = ({cate,filters,sort}) => {
  
  const[products,setProducts] = useState([])
  
  const[filteredProducts,setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async ()=>{
      try{
        const res = await axios.get(cate ?`http://localhost:5000/api/products?category=${cate}` : "http://localhost:5000/api/products" );
        setProducts(res.data);
      }catch (err){}
    }
    getProducts()
  }, [cate])
  
  useEffect(() => {
   cate && setFilteredProducts(
    products.filter(item=> Object.entries(filters).every(([key,value])=>
    item[key].includes(value)))
   )

  }, [products,cate,filters])

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
        { cate ? filteredProducts.map((item)=>(
            <Product item = {item} key={item.id}/>
      )) : products.slice(0,8).map((item)=>(
        <Product item = {item} key={item.id}/>))
    }
    </Container>
  )
}

export default Products