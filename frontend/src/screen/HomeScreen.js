import React from 'react'
import { Heading ,Grid } from '@chakra-ui/react';
import products from '../products';
import Product from '../components/Product';


const HomeScreen = () => {
  return (
   <div>
  <Heading as='h2' fontSize='3xl' mb='8'>
   Latest Product
  </Heading>

  <Grid templateColumns={{base:'1fr', md:'1fr 1fr' ,lg:'1fr 1fr 1fr 1fr'}}gap='8'>
   {products.map((prod) => {
    return <Product product={prod} />
   })}
  </Grid>
  </div>
  
  )
}

export default HomeScreen;
