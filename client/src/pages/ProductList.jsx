import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Annoucement'
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div``;
const Title = styled.h1`
margin: 20px;`;
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`;
const Filter = styled.div`
margin: 20px;
${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}`;

const FilterText = styled.span`
font-size: 20px;
font-weight: 600;
margin-right: 20px;
${mobile({ marginRight: "0px" })}`

const Select = styled.select`
padding: 10px;
margin-right: 20px;
${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const category =(location.pathname.split('/')[[2]])
  const [filters,setFilters] = useState({})
  
  const [sort,setSort] = useState("Newest")

  const handleFilters = (e)=>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    })
  }
  return (
    <Container>
        <Navbar/>
        <Announcement />
        <Title>{category}</Title>
        <FilterContainer>
           <Filter> <FilterText>Fliter Products:</FilterText>
           <Select  name="color" defaultValue={"DEFAULT"} onChange={handleFilters}>
            <Option value="DEFAULT">
              Color
            </Option>
            <Option value="white">white</Option>
            <Option value="black">black</Option>
            <Option value="red">red</Option>
            <Option value="blue">blue</Option>
            <Option value="yellow">yellow</Option>
            <Option value="green">green</Option>
          </Select>
          <Select name="size" defaultValue={"DEFAULT"} onChange={handleFilters}>
            <Option value="DEFAULT" >
              Size
            </Option>
            <Option value="XS">XS</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>
           
           </Filter> 
           <Filter> <FilterText>Sort Products:</FilterText>
           <Select onChange={(e)=> setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
           </Filter> 
        </FilterContainer>
        <Products category={category} filters={filters}sort={sort}/>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default ProductList