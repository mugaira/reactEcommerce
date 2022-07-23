import { useState } from "react";
import { Flex, Link, Heading, Box, Icon } from "@chakra-ui/react";
import { HiShoppingBag, HiUser, HiOutlineMenu } from "react-icons/hi";
import React from "react";

const Header = () => {
 const [show, setShow] = useState(false);
 // console.log(show);

 return (
  <Flex
   as="header"
   align="center"
   justifyContent="space-between"
   wrap="wrap"
   py="6"
   px="6"
   bgColor="gray.800"
   w="100%"
   pos="fixed"
   top="0"
   zIndex="999"
  >
   <Heading
    as="h1"
    color="whiteAlpha.800"
    fontWeight="bold"
    size="md"
    letterSpacing="md"
   >
    <Link
     href="/"
     _hover={{ color: "whiteAlpha.900", textDecoration: "none" }}
    >
     Rst Store
    </Link>
   </Heading>
   <Box
    display={{ base: "flex", md: "none" }}
    onClick={() => {
     setShow(!show);
    }}
   >
    <Icon
     as={HiOutlineMenu}
     color="whiteAlpha.700"
     w="6"
     h="6"
     _hover={{ color: "whiteAlpha.800" }}
    />
   </Box>

   <Box
    display={{ base: show ? "flex" : "none", md: "flex" }}
    width={{ base: "full", md: "auto" }}
    flexDirection={{ base: "column", md: "auto" }}
    mt={{ base: "5", md: "auto" }}
    justifyContent={{ base: "flex-end", md: "auto" }}
   >
    <Link
     href="/cart"
     color="whiteAlpha.700"
     letterSpacing="wide"
     fontSize="sm"
     fontWeight="bold"
     textTransform="uppercase"
     mr="5"
     display="flex"
     alignItems="center"
     _hover={{ color: "whiteAlpha.800" }}
    >
     <Icon as={HiShoppingBag} w="4" h="4" mr="1" />
     Cart
    </Link>
    <Link
     href="/cart"
     color="whiteAlpha.700"
     letterSpacing="wide"
     fontSize="sm"
     fontWeight="bold"
     textTransform="uppercase"
     mr="5"
     display="flex"
     alignItems="center"
     _hover={{ color: "whiteAlpha.800" }}
    >
     <Icon as={HiUser} w="4" h="4" mr="1" />
     Login
    </Link>
   </Box>
  </Flex>
 );
};

export default Header;
