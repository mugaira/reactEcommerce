import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	Icon,
	Image,
	Link,
	Select,
	Text,
} from "@chakra-ui/react";
import {
	useParams,
	useSearchParams,
	Link as RouterLink,
	useNavigate,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashBinSharp } from "react-icons/io5";
import Message from "../components/Message";
import { useEffect } from "react";
import React from "react";

const CartScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id: productId } = useParams();

	const [searchParams] = useSearchParams();
	const qty = searchParams.get("qty");

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(qty, productId));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkOutHandler = () => {
		navigate(`/login?redirect=shipping`);
	};

	return (
		<Grid>
			<Box>
				<Heading mb="8">Shopping Cart</Heading>
				<Flex>
					{cartItems.length === 0 ? (
						<Message>
							Your Cart is Empty.{" "}
							<Link as={RouterLink} to="/">
								Go Home
							</Link>
						</Message>
					) : (
						<Grid templateColumns="4fr 2fr" gap="10" w="full">
							<Flex direction="column">
								{cartItems.map((item) => (
									<Grid
										key={item.product}
										size="100%"
										alignItems="center"
										justifyContent="space-between"
										borderBottom="1px"
										borderColor="gray.100"
										py="4"
										px="2"
										rounded="lg"
										_hover={{ bgColor: "gray.500" }}
										templateColumns="1fr 4fr 2fr 2fr 2fr"
									>
										{/* Product Image */}
										<Image
											src={item.image}
											alt={item.name}
											borderRadius="lg"
											height="20"
											width="18"
											objectFit="cover"
										/>

										{/* Product Name */}
										<Text fontWeight="semibold" fontSize="lg">
											<Link as={RouterLink} to={`/product/${item.product}`}>
												{item.name}
											</Link>
										</Text>

										{/* Product Price */}
										<Text fontWeight="semibold" fontSize="lg">
											₹{item.price}
										</Text>

										{/* Quantity Select Box */}
										<Select
											value={item.qty}
											onChange={(e) =>
												dispatch(addToCart(e.target.value, item.product))
											}
											width="20"
										>
											{[...Array(item.countInStock).keys()].map((i) => (
												<option key={i + 1} value={i + 1}>
													{i + 1}
												</option>
											))}
										</Select>

										{/* Delete Button */}
										<Button
											type="button"
											colorScheme="red"
											onClick={() => removeFromCartHandler(item.product)}
										>
											<Icon as={IoTrashBinSharp} />
										</Button>
									</Grid>
								))}
							</Flex>

							{/* Column 2 */}
							<Flex
								direction="column"
								border="1px"
								borderWidth="2"
								borderColor="gray.200"
								backgroundColor='whiteAlpha.800'
								rounded="md"
								padding="5"
								height="60"
								justifyContent="space-between"
							>
								<Flex direction="column">
									<Heading as="h2" fontSize="xl" mb="2" mt='2'>
										Subtotal (
										{cartItems.reduce((acc, currVal) => acc + currVal.qty, 0)}
										items) {' : '}
									</Heading>
									<Text
										fontWeight="bold"
										fontSize="xl"
										color="blue.600"
										mb="4"
									>
										₹
										{cartItems.reduce(
											(acc, currVal) => acc + currVal.qty * currVal.price,
											0
										)}
									</Text>
									<Button
										type="button"
										disabled={cartItems.length === 0}
										size="lg"
										colorScheme="teal"
										bgColor="gray.800"
										onClick={checkOutHandler}
									>
										Proceed To Checkout
									</Button>
								</Flex>
							</Flex>
						</Grid>
					)}
				</Flex>
			</Box>
		</Grid>
	);
};

export default CartScreen;
