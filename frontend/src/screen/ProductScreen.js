import {
	Button,
	Select,
	Flex,
	Grid,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { useState, useEffect } from "react";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import React from "react";

const ProductScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [qty, setQty] = useState(1);

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [id, dispatch]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}/?qty=${qty}`);
	};

	return (
		<>
			<Flex mb="3">
				<Button as={RouterLink} to="/" colorScheme="red">
					Back
				</Button>
			</Flex>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type="error">{error}</Message>
			) : (
				<Grid
					templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "5fr 4fr 3fr" }}
					gap="10"
				>
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

						{product.countInStock > 0 && (
							<Flex justifyContent="space-between" py="2">
								<Text>Qty: </Text>
								<Select
									value={qty}
									onChange={(e) => setQty(e.target.value)}
									width="30%"
								>
									{[...Array(product.countInStock).keys()].map((i) => (
										<option key={i + 1} value={i + 1}>
											{i + 1}
										</option>
									))}
								</Select>
							</Flex>
						)}

						<Button
							bgColor="gray.800"
							textTransform="uppercase"
							letterSpacing="wide"
							my="2"
							colorScheme="red"
							disabled={product.countInStock === 0}
							onClick={addToCartHandler}
						>
							Add To Cart
						</Button>
					</Flex>
				</Grid>
			)}
		</>
	);
};

export default ProductScreen;
