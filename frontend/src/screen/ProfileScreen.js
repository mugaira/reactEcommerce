import {
 Button,
 Flex,
 FormControl,
 FormLabel,
 Grid,
 Heading,
 Icon,
 Input,
 Spacer,
 Table,
 Tbody,
 Td,
 Th,
 Thead,
 Tr,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { IoWarning } from 'react-icons/io5';
import { listMyOrder } from '../actions/orderAction';

const ProfileScreen = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setconfirmPassword] = useState('');
 const [message, setMessage] = useState('');

 const userProfile = useSelector((state) => state.userProfile);
 const { loading, error, user } = userProfile;

 const userLogin = useSelector((state) => state.userLogin);
 const { userInfo } = userLogin;

 const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
 const { success } = userUpdateProfile;

 const orderMyList = useSelector((state) => state.orderMyList);
 const { loading: loadingOrders, error: errorOrders,orders } = orderMyList;

 useEffect(() => {
  if (!userInfo) {
   navigate('/login');
  } else {
   if (!user.name) {
    dispatch(getUserProfile());
    dispatch(listMyOrder());
   } else {
    setName(user.name);
    setEmail(user.email);
   }
  }
 }, [navigate, userInfo, user, dispatch]);

 const submitHandler = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
   setMessage('Password Does Not Match');
  } else {
   dispatch(updateUserProfile({ id: user._id, name, email, password }));
  }
 };

 return (
  <Grid
   templateColumns={{ sm: '1fr', md: '1fr 1fr' }}
   py='5'
   gap='10'
  >
   <Flex
    w='full'
    alignItems='flex-start'
    justifyContent='center'
    py='5'
   >
    <FormContainer>
     <Heading
      as='h1'
      mb='8'
      fontSize='3xl'
     >
      User Profile
     </Heading>

     {error && <Message type='error'>{error}</Message>}
     {message && <Message type='error'>{message}</Message>}
     {success && <Message type='success'>Profile Updated!</Message>}

     <form onSubmit={submitHandler}>
      <FormControl id='name'>
       <FormLabel htmlFor='name'>Your Name</FormLabel>
       <Input
        id='name'
        type='text'
        placeholder='Your Full Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
       />
      </FormControl>

      <Spacer h='3' />

      <FormControl id='email'>
       <FormLabel htmlFor='email'>Your Email</FormLabel>
       <Input
        id='email'
        type='email'
        placeholder='username@domain.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
      </FormControl>

      <Spacer h='3' />

      <FormControl id='password'>
       <FormLabel htmlFor='password'>Password</FormLabel>
       <Input
        id='password'
        type='password'
        placeholder='********'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       />
      </FormControl>

      <Spacer h='3' />

      <FormControl id='confirmPassword'>
       <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
       <Input
        id='confirmPassword'
        type='password'
        placeholder='********'
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
       />
      </FormControl>

      <Button
       type='submit'
       colorScheme='teal'
       mt='4'
       isLoading={loading}
      >
       Update
      </Button>
     </form>
    </FormContainer>
   </Flex>

   {/* Orders */}

   <Flex direction='column'>
    <Heading
     as='h2'
     mb='4'
    >
     My Orders
    </Heading>

    {loadingOrders ? (
     <Loader />
    ) : errorOrders ? (
     <Message type='error'>{error}</Message>
    ) : (
     <Table variant='striped'>
      <Thead>
       <Tr>
        <Th>ID</Th>
        <Th>DATE</Th>
        <Th>TOTAL</Th>
        <Th>PAID</Th>
        <Th>DELIVERED</Th>
        <Th></Th>
       </Tr>
      </Thead>
      <Tbody>
       {orders.map((order) => (
        <Tr key={order._id}>
         <Td>{order._id}</Td>
         <Td>{order.createdAt.substring(0, 10)}</Td>
         <Td>{order.totalPrice}</Td>
         <Td>
          {order.isPaid ? (
           order.paidAt.substring(0, 10)
          ) : (
           <Icon
            as={IoWarning}
            color='red'
           />
          )}
         </Td>
         <Td>
          <Button
           as={RouterLink}
           to={`/order/${order._id}`}
           colorScheme='teal'
           size='sm'
          >
           Details
          </Button>
         </Td>
        </Tr>
       ))}
      </Tbody>
     </Table>
    )}
   </Flex>
  </Grid>
 );
};

export default ProfileScreen;
