import {
 Heading,
 Flex,
 Grid,
 Box,
 Spacer,
 Menu,
 MenuButton,
 Button,
 MenuList,
 MenuItem,
 Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductDisplayScreen = ({ category }) => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [searchQuery, setSearchQuery] = useState('');

 const productList = useSelector((state) => state.productList);
 let { loading, error, products } = productList;

 products = products.filter((product) => product.category === category);
 console.log(products);

 useEffect(() => {
  dispatch(listProducts());
 }, [dispatch, category]);

 const submitMenHandler = () => {
  navigate('/men');
 };
 const submitWomenHandler = () => {
  navigate('/women');
 };

 const filterProduct = (searchQuery) => {
  searchQuery.toLowerCase();

  products = products.filter((product) =>
   product.name.toLowerCase().includes(searchQuery)
  );
 };

 if (searchQuery) {
  filterProduct(searchQuery);
 }

 const submitHandler = (e) => {
  e.preventDefault();
  // console.log(searchQuery);
 };

 return (
  <div>
   <Grid
    templateColumns={{ lg: '1fr 6fr', md: '1fr 4fr', base: '1fr' }}
    gap='5'
   >
    <Flex mt={{ lg: '50px', md: '50px', base: '10px' }}>
     <Box p='5'>
      <Heading
       as='h3'
       fontSize='2xl'
      >
       Filter
      </Heading>
      <Spacer h='2' />

      <Flex
       direction='column'
       justifyContent='center'
       alignContent='center'
      >
       <Flex
        my='3'
        mx='3'
        direction='column'
       >
        <Menu mt='2'>
         <MenuButton
          mt='2'
          as={Button}
         >
          Category
         </MenuButton>
         <MenuList>
          <MenuItem onClick={submitMenHandler}>Men</MenuItem>
          <MenuItem onClick={submitWomenHandler}>Women</MenuItem>
         </MenuList>
        </Menu>
       </Flex>
      </Flex>
     </Box>
    </Flex>

    <Flex direction='column'>
     <form onSubmit={submitHandler}>
      <Input
       mt='3'
       size='lg'
       width='400px'
       rounded='3xl'
       placeholder={`Search in ${category}`}
       bgColor='white'
       w='auto'
       onChange={(e) => setSearchQuery(e.target.value)}
      />
     </form>

     <Box>
      <Heading
       as='h2'
       fontSize='3xl'
       mb='4'
       mt='8'
      >
       {category.toUpperCase()}
      </Heading>

      {loading ? (
       <Loader />
      ) : error ? (
       <Message type='error'>{error}</Message>
      ) : (
       <Grid
        templateColumns={{
         sm: '1fr',
         md: '1fr 1fr',
         lg: '1fr 1fr 1fr',
         xl: '1fr 1fr 1fr 1fr',
        }}
        gap='8'
       >
        {products.map((prod) => (
         <Product
          key={prod._id}
          product={prod}
         />
        ))}
       </Grid>
      )}
     </Box>
    </Flex>
   </Grid>
  </div>
 );
};

export default ProductDisplayScreen;
