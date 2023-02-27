import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
height: 30px;
background-color: teal;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: bold;`

const Annoucement = () => {
  return (
    <Container>Super Deal free shipping on Orders above Rs.399</Container>
  )
}

export default Annoucement