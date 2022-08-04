import { Link as RouterLink, useParams } from "react-router-dom";
import { Button, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import Rating from "../components/Rating";
import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";

const ProductScreen = () => {
	const [product,setProduct] = useState({})
	const { id } = useParams();

	useEffect(()=>{
		const fetchProduct = async() => {
			const { data } = await axios.get(`/api/products/${id}`);
			console.log(data)
			setProduct(data);
				}
				fetchProduct();
	},[id])

	return (
		<>
			<Flex mb="3">
				<Button as={RouterLink} to="/" colorScheme="red">
					Back
				</Button>
			</Flex>

			<Grid templateColumns={ { base:"1fr", md:"1fr 1fr", lg:"5fr 4fr 3fr"}  }gap="10">
				{/* Coloum 1 */}
				<Image src={product.image} alt={product.name} mb="10" />

				{/* coloum 2 */}
				<Flex direction="column">
					<Heading
						as="h6"
						textTransform="uppercase"
						fontWeight="bold"
						fontSize="sm"
						color="gray"
					>
						{" "}
						{product.brand}{" "}
					</Heading>
					<Heading
						as="h2"
						textTransform={"uppercase"}
						fontWeight="bold"
						fontSize="lg"
					>
						{product.name}
					</Heading>

					<Rating value={product.rating} text={product.numReviews} />
					<Heading as="h5" fontSize="xl" color="teal.600">
						₹{product.price}
					</Heading>
					<Text>{product.description}</Text>
				</Flex>

				{/* column 3 */}
				<Flex direction="column">
					<Flex justifyContent="space-between" py="2">
						<Text>Price:</Text>
						<Text fontWeight="bold">₹{product.price}</Text>
					</Flex>
					<Flex justifyContent="space-between" py="1">
						<Text>Status:</Text>
						<Text fontWeight="bold">
							{product.countInStock > 0 ? "InStock" : "Not available'"}
						</Text>
					</Flex>
					<Button
						bgColor="gray.800"
						textTransform="uppercase"
						letterSpacing="wide"
						my="2"
						colorScheme="red"
						disabled={product.countInStock === 0}
					>
						Add To Cart
					</Button>
				</Flex>
			</Grid>
		</>
	);
};

export default ProductScreen;
