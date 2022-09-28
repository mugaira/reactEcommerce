import { useState } from 'react';
import {
 Box,
 Button,
 Flex,
 Heading,
 Icon,
 Link,
 Menu,
 MenuButton,
 MenuItem,
 MenuList,
} from '@chakra-ui/react';
import { HiShoppingBag, HiUser, HiOutlineMenu } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import React from 'react';

const Header = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [show, setShow] = useState(false);

 const userLogin = useSelector((state) => state.userLogin);
 const { userInfo } = userLogin;

 const logoutHandler = () => {
  dispatch(logout());
  navigate('/');
 };

 return (
  <Flex
   as='header'
   align='center'
   justifyContent='space-between'
   wrap='wrap'
   py='6'
   px='6'
   bgColor='gray.800'
   w='100%'
   pos='fixed'
   top='0'
   zIndex='999'
  >
   <Heading
    as='h1'
    color='whiteAlpha.800'
    fontWeight='bold'
    size='md'
    letterSpacing='md'
   >
    <Link
     as={RouterLink}
     to='/'
     _hover={{ color: 'whiteAlpha.900', textDecoration: 'none' }}
    >
    Hoodie Hub
    </Link>
   </Heading>
   <Box
    display={{ base: 'block', md: 'none' }}
    onClick={() => {
     setShow(!show);
    }}
   >
    <Icon
     as={HiOutlineMenu}
     color='whiteAlpha.700'
     w='6'
     h='6'
     _hover={{ color: 'whiteAlpha.800' }}
    />
   </Box>

   <Box
    display={{ base: show ? 'block' : 'none', md: 'flex' }}
    width={{ base: 'full', md: 'auto' }}
    flexDirection={{ base: 'row', md: 'auto' }}
    mt={{ base: '5', md: 'auto' }}
    alignItems={{ base: 'flex-end', md: 'center' }}
   >
    <Link
     as={RouterLink}
     to='/cart'
     color='whiteAlpha.700'
     letterSpacing='wide'
     fontSize='sm'
     fontWeight='bold'
     textTransform='uppercase'
     mr='5'
     display='flex'
     alignItems='center'
     _hover={{ color: 'whiteAlpha.800' }}
    >
     <Icon
      as={HiShoppingBag}
      w='4'
      h='4'
      mr='1'
     />
     Cart
    </Link>
    {/* User Menu */}
    {userInfo ? (
     <Menu>
      <MenuButton
       as={Button}
       height='8'
       rightIcon={<IoChevronDown />}
       display='flex'
       alignItems='center'
       _hover={{ textDecor: 'none', opacity: '0.7' }}
      >
       {userInfo.name}
      </MenuButton>
      <MenuList>
       <MenuItem
        as={RouterLink}
        to='/profile'
       >
        Profile
       </MenuItem>
       <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </MenuList>
     </Menu>
    ) : (
     <Link
      as={RouterLink}
      to='/login'
      color='whiteAlpha.700'
      letterSpacing='wide'
      fontSize='sm'
      fontWeight='bold'
      textTransform='uppercase'
      mr='5'
      display='flex'
      alignItems='center'
      _hover={{ color: 'whiteAlpha.800' }}
     >
      <Icon
       as={HiUser}
       w='4'
       h='4'
       mr='1'
      />
      Login
     </Link>
    )}
    ;{/* Admin Menu */}
    {userInfo && userInfo.isAdmin && (
     <Menu>
      <MenuButton
       ml='5'
       color='white'
       fontSize='sm'
       fontWeight='semibold'
       as={Link}
       textTransform='uppercase'
       _hover={{ textDecoration: 'none', opacity: '0.7' }}
      >
       Manage
       <Icon as={IoChevronDown} />
      </MenuButton>
      <MenuList>
       <MenuItem
        as={RouterLink}
        to='/admin/userlist'
       >
        All Users
       </MenuItem>
       <MenuItem
        as={RouterLink}
        to='/admin/productlist'
       >
        All Products
       </MenuItem>
       <MenuItem
        as={RouterLink}
        to='/admin/orderlist'
       >
        All Orders
       </MenuItem>
      </MenuList>
     </Menu>
    )}
   </Box>
  </Flex>
 );
};

export default Header;
