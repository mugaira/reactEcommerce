import {
 Box,
 Button,
 Flex,
 Grid,
 Heading,
 Image,
 Link,
 Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderAction';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrderScreen = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const cart = useSelector((state) => state.cart);

 cart.itemsPrice = cart.cartItems.reduce(
  (acc, currVal) => acc + currVal.price * +currVal.qty,
  0
 );

 cart.shippingPrice = cart.itemsPrice < 5000 ? 1000 : 0;
 cart.taxPrice = (18 * cart.itemsPrice) / 100;
 cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

 const orderCreate = useSelector((state) => state.orderCreate);
 const { success, error, order } = orderCreate;

 const placeOrderHandler = () => {
  dispatch(
   createOrder({
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
   })
  );
 };
 useEffect(() => {
  if (success) {
   navigate(`/order/${order._id}`);
  }
 }, [success, navigate, order]);

 return (
  <Flex
   w='full'
   direction='column'
   py='5'
  >
   <CheckoutSteps
    step1
    step2
    step3
    step4
   />
   <Grid
    templateColumns='3fr 2fr'
    gap='20'
   >
    {/* column 1 */}
    <Flex direction='column'>
     {/* Shipping */}
     <Box
      borderBottom='1px'
      py='6'
      borderColor='gray.400'
     >
      {error && <Message type='error'>{error}</Message>}
      <Heading
       as='h2'
       mb='3'
       fontSize='3xl'
       fontWeight='semibold'
      >
       Shipping
      </Heading>
      <Text>
       <strong>Address: </strong>
       {cart.shippingAddress.address},{cart.shippingAddress.city},{' '}
       {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
      </Text>
     </Box>

     {/* Payment Method */}
     <Box
      borderBottom='1px'
      py='6'
      borderColor='gray.300'
     >
      <Heading
       as='h2'
       mb='3'
       fontSize='3xl'
       fontWeight='semibold'
      >
       Payment Method
      </Heading>
      <Text>
       <strong>Method: </strong>
       {cart.paymentMethod.toUpperCase()}
      </Text>
     </Box>

     {/* Order Items */}
     <Box
      borderBottom='1px'
      py='6'
      borderColor='gray.400'
     >
      <Heading
       as='h2'
       mb='3'
       fontSize='3xl'
       fontWeight='semibold'
      >
       Order Items
      </Heading>
      <Box>
       {cart.cartItems.length === 0 ? (
        <Message>Your Cart Is Empty</Message>
       ) : (
        <Box py='2'>
         {cart.cartItems.map((item, idx) => (
          <Flex
           key={idx}
           alignItems='center'
           justifyContent='space-between'
          >
           <Flex
            py='2'
            alignItems='center'
           >
            <Image
             src={item.image}
             alt={item.name}
             w='12'
             h='12'
             objectFit='cover'
             mr='6'
            />
            <Link
             fontWeight='bold'
             fontSize='xl'
             as={RouterLink}
             to={`/product/${item.product}`}
            >
             {item.name}&nbsp;
            </Link>
           </Flex>

           <Text
            fontSize='lg'
            fontWeight='semibold'
           >
            {item.qty} x ₹{item.price} = ₹{+item.qty * item.price}
           </Text>
          </Flex>
         ))}
        </Box>
       )}
      </Box>
     </Box>
    </Flex>

    {/* column 2 */}
    <Flex
     direction='column'
     bgColor='white'
     justifyContent='space-between'
     py='8'
     px='8'
     shadow='md'
     rounded='lg'
     borderColor='gray.400'
    >
     <Box>
      <Heading
       as='h2'
       mb='6'
       fontSize='3xl'
       fontWeight='semibold'
      >
       Order Summary
      </Heading>

      {/* Item Price */}
      <Flex
       borderBottom='1px'
       py='2'
       borderColor='gray.200'
       alignItems='center'
       justifyContent='space-between'
      >
       <Text fontSize='xl'>Items</Text>
       <Text
        fontWeight='bold'
        fontSize='xl'
       >
        ₹{cart.itemsPrice}
       </Text>
      </Flex>

      {/* Shipping Price */}
      <Flex
       borderBottom='1px'
       py='2'
       borderColor='gray.200'
       alignItems='center'
       justifyContent='space-between'
      >
       <Text fontSize='xl'>Shipping</Text>
       <Text
        fontWeight='bold'
        fontSize='xl'
       >
        ₹{cart.shippingPrice}
       </Text>
      </Flex>

      {/* Tax Price */}
      <Flex
       borderBottom='1px'
       py='2'
       borderColor='gray.200'
       alignItems='center'
       justifyContent='space-between'
      >
       <Text fontSize='xl'>Tax Price</Text>
       <Text
        fontWeight='bold'
        fontSize='xl'
       >
        ₹{cart.taxPrice}
       </Text>
      </Flex>

      {/* Total Price */}
      <Flex
       borderBottom='1px'
       py='2'
       borderColor='gray.200'
       alignItems='center'
       justifyContent='space-between'
      >
       <Text fontSize='xl'>Total Price</Text>
       <Text
        fontWeight='bold'
        fontSize='xl'
       >
        ₹{cart.totalPrice}
       </Text>
      </Flex>
     </Box>
     <Button
      size='lg'
      textTransform='uppercase'
      colorScheme='yellow'
      type='button'
      w='full'
      onClick={placeOrderHandler}
      disabled={cart.cartItems === 0}
     >
      Place Order
     </Button>
    </Flex>
   </Grid>
  </Flex>
 );
};

export default PlaceOrderScreen;
