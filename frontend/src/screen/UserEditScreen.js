import {
 Button,
 Checkbox,
 Flex,
 FormControl,
 FormLabel,
 Heading,
 Input,
 Link,
 Spacer,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const { id: userId } = useParams();

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [isAdmin, setIsAdmin] = useState(false);

 const userDetails = useSelector((state) => state.userDetails);
 const { loading, error, user } = userDetails;

 const userUpdate = useSelector((state) => state.userUpdate);
 const {
  loading: loadingUpdate,
  success: successUpdate,
  error: errorUpdate,
 } = userUpdate;

 useEffect(() => {
  if (successUpdate) {
   dispatch({ type: USER_UPDATE_RESET });
   navigate('/admin/userlist');
  } else {
   if (!user.name || user._id !== userId) {
    dispatch(getUserDetails(userId));
   } else {
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
   }
  }
 }, [dispatch, successUpdate, navigate, userId, user]);

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
 };

 return (
  <>
   <Link
    as={RouterLink}
    to='/admin/userlist'
   >
    Go back
   </Link>
   <Flex
    w='full'
    alignItems='center'
    justifyContent='center'
    py='5'
   >
    <FormContainer>
     <Heading
      as='h1'
      mb='8'
      fontSize='3xl'
     >
      Edit User
     </Heading>

     {loadingUpdate && <Loader />}
     {errorUpdate && <Message type='error'>{error}</Message>}

     {loading ? (
      <Loader />
     ) : error ? (
      <Message type='error'>{error}</Message>
     ) : (
      <form onSubmit={submitHandler}>
       <FormControl
        id='name'
        isRequired
       >
        <FormLabel>Name</FormLabel>
        <Input
         type='text'
         placeholder='Enter Your Full Name'
         value={name}
         onChange={(e) => setName(e.target.value)}
        />
       </FormControl>
       <Spacer h='3' />

       <FormControl
        id='email'
        isRequired
       >
        <FormLabel>Email</FormLabel>
        <Input
         type='email'
         placeholder='username@domain.com'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
       </FormControl>
       <Spacer h='3' />

       <FormControl id='isAdmin'>
        <FormLabel>isAdmin</FormLabel>
        <Checkbox
         size='lg'
         colorScheme='teal'
         checked={isAdmin}
         onChange={(e) => setIsAdmin(e.target.value)}
        />
        Is Admin?
       </FormControl>

       <Spacer h='3' />

       <Button
        type='submit'
        isLoading={loading}
        colorScheme='teal'
        mt='4'
       >
        Update
       </Button>
      </form>
     )}
    </FormContainer>
   </Flex>
  </>
 );
};

export default UserEditScreen;
