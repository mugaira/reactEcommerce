import { Box, Flex, Heading, Text, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';


import React from "react";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Link 
    as = {RouterLink}
     to={`/product/${product._id}`} _hover={{ textDecor: "none" }}>
      <Box
        maxW="sm"
        borderRadius="lg"
        bgColor="white"
        transition="all"
        // minH="500px"
        _hover={{ shadow: "lg" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          minH="300px"
          objectFit="cover"
          borderRadius="sm"
        ></Image>
        <Flex py="3" px="2" direction="column" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="1">
            {product.name}
          </Heading>
          <Flex alignItems="center" justifyContent="space-between">
           <Rating value={product.rating} />
            <Text fontSize="1.5xl" fontweight="bold" color="blue.200">
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Product;
