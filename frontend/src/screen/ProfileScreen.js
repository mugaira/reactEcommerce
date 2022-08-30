import {
 Button,
 Flex,
 FormControl,
 FormLabel,
 Grid,
 Heading,
 Input,
 Spacer,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const ProfileScreen = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setconfirmPassword] = useState('');
 const [message, setMessage] = useState('');

 const userDetails = useSelector((state) => state.userDetails);
 const { loading, error, user } = userDetails;

 const userLogin = useSelector((state) => state.userLogin);
 const { userInfo } = userLogin;

 const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
 const { success } = userUpdateProfile;

 useEffect(() => {
  if (!userInfo) {
   navigate('/login');
  } else {
   if (!user.name) {
    dispatch(getUserDetails());
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
  </Grid>
 );
};

export default ProfileScreen;
