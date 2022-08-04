import { useState,useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import { Heading ,Grid } from '@chakra-ui/react';
import Product from '../components/Product';


const HomeScreen = () => {

  const[products,setProducts] = useState([]);

  useEffect(()=> {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  


  return (
   <div>
  <Heading as='h2' fontSize='3xl' mb='8'>
   Latest Product
  </Heading>

  <Grid templateColumns={{base:'1fr', md:'1fr 1fr' ,lg:'1fr 1fr 1fr 1fr'}}gap='8'>
   {products.map((prod) => (
     <Product key={prod._id} product={prod} />
   ))}
  </Grid>
  </div>
  
  )
}

export default HomeScreen;
