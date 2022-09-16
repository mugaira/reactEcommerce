import { Button, Flex, FormControl, FormLabel, Heading, Input, Link, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductEditScreen = () => {

 const dispatch = useDispatch();

 const { id: productId } = useParams();

 const productDetails = useSelector((state) => state.productDetails);
 const { loading, error, product } = productDetails;

 const [name, setName] = useState('');
 const [price, setPrice] = useState(0);
 const [image, setImage] = useState('');
 const [brand, setBrand] = useState('');
 const [category, setCategory] = useState('');
 const [description, setDescription] = useState('');
 const [countInStock, setCountInStock] = useState(0);

 useEffect(() => {
  if (!product.name || product._id !== productId) {
   dispatch(listProductDetails(productId));
  }
  else {
   setName(product.name);
   setPrice(product.price);
   setImage(product.image);
   setBrand(product.brand);
   setCategory(product.category);
   setDescription(product.description);
   setCountInStock(product.countInStock);
  }
 }, [product, dispatch, productId]);

 const submitHandler = () => {
  //UPDATE PRODUCT
 }

 return (
  <>
   <Link as={RouterLink} to='/admin/productlist' >
    Go Back
   </Link>

   <Flex w='full' alignItems='center' justifyContent='center' py='5'>
    <FormContainer>
     <Heading as='h1' mb='8' fontSize='3xl'>
      Edit Product
     </Heading>

     {loading ? (
      <Loader />
     ) : error ? (
      <Message type='error'>{error}</Message>
     ) : (
      <form onSubmit={submitHandler}>
       {/* Name */}
       <FormControl id='name' isRequired>
        <FormLabel>Name: </FormLabel>
        <Input type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
       </FormControl>
       <Spacer h='3' />

       {/* Price */}
       <FormControl id='price' isRequired>
        <FormLabel>Price:</FormLabel>
        <Input type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
       </FormControl>
       <Spacer h='3' />

       {/* Image */}
       <FormControl id='image' isRequired>
        <FormLabel>Image:</FormLabel>
        <Input type='text' placeholder='Enter Img url' value={image} onChange={(e) => setImage(e.target.value)} />
       </FormControl>
       <Spacer h='3' />

       {/* Brand */}
       <FormControl id='brand' isRequired>
        <FormLabel>Brand:</FormLabel>
        <Input type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
       </FormControl>
       <Spacer h='3' />

       {/* Description */}
       <FormControl id='description' isRequired>
        <FormLabel>Description:</FormLabel>
        <Input type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
       </FormControl>
       <Spacer h='3' />

       {/* Category */}
       <FormControl id='category' isRequired>
        <FormLabel>Category:</FormLabel>
        <Input type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
       </FormControl>
       <Spacer h='3' />

       {/* Count In Stock */}
       <FormControl id='countInStock' isRequired >
        <FormLabel>Count In Stock:</FormLabel>
        <Input type='number' placeholder='Enter Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
       </FormControl>
       <Spacer h='3' />

       <Button type='submit' colorScheme='teal' isLoading={loading} mt='4'>
        Update
       </Button>
      </form>
     )}
    </FormContainer>
   </Flex>
  </>
 )
}

export default ProductEditScreen
