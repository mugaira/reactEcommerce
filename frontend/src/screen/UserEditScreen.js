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
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';

const UserEditScreen = () => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [isAdmin, setIsAdmin] = useState(false);

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
        onChange={(e) => setEmail(e.currentTarget.value)}
       />
      </FormControl>
      <Spacer h='3' />

      <FormControl
       id='isAdmin'
       isRequired
      >
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
    </FormContainer>
   </Flex>
  </>
 );
};

export default UserEditScreen;
