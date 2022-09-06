import { Box, Flex, Grid, Heading, Image, Link, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
	useParams,
	useNavigate,
	Link as RouterLink,
	useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderAction';

const OrderScreen = () => {
	const dispatch = useDispatch();
	const { id: orderId } = useParams();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, error, order } = orderDetails;

	if (!loading) {
		order.itemsPrice = order.orderItems.reduce(
			(acc, curVal) => acc + curVal.qty * curVal.price,
			0
		);
	}

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [orderId, dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message type='error'>{error}</Message>
	) : (
		<>
			<Flex
				w='full'
				py='5'
				direction='column'
			>
				<Grid
					templateColumns='3fr 2fr'
					gap='20'
				>
					{/* column 1 */}
					<Flex direction='column'>
						<Box
							borderBottom='1px'
							py='6'
							borderColor='gray.300'
						>
							<Heading
								as='h2'
								mb='3'
								fontSize='2xl'
								fontWeight='semibold'
							>
								Shipping
							</Heading>
							<Text>
								Name:<strong>{order.user.name}</strong>
							</Text>
							<Text>
								Email:{' '}
								<strong>
									<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
								</strong>
							</Text>
							<Text>
								<strong>Address: </strong>
								{order.shippingAddress.address},{order.shippingAddress.City},{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</Text>
							<Text mt='4'>
								{order.isDelivered ? (
									<Message type='success'>
										Delivered on {order.deliveredAt}
									</Message>
								) : (
									<Message type='warning'>Not Delivered</Message>
								)}
							</Text>
						</Box>

						{/* Payment Method */}
						<Box
							borderBottom='1px'
							py='6'
							borderColor='gray.300'
						>
							<Heading
								as='h2'
								mb='3'
								fontSize='2xl'
								fontWeight='semibold'
							>
								Payment Method
							</Heading>
							<Text>
								<strong>Method: </strong>
								{order.paymentMethod.toUpperCase()}
							</Text>
						</Box>

						{/* Order Items */}
						<Box
							borderBottom='1px'
							py='6'
							borderColor='gray.300'
						>
							<Heading
								as='h2'
								mb='3'
								fontSize='2xl'
								fontWeight='semibold'
							>
								Order Items
							</Heading>
							<Box>
								{order.orderItems.length === 0 ? (
									<Message>No Order Info</Message>
								) : (
									<Box py='2'>
										{order.orderItems.map((item, idx) => (
											<Flex
												key={idx}
												alignItems='center'
												justifyContent='space-between'
											>
												<Flex
													py='2'
													alignItems='center'
												>
													<Image
														src={item.image}
														alt={item.name}
														w='12'
														h='12'
														objectFit='cover'
														mr='6'
													/>
													<Link
														fontWeight='bold'
														fontSize='xl'
														as={RouterLink}
														to={`/products/${item.product}`}
													>
														{item.name}&nbsp;
													</Link>
													</Flex>
													<Text
														fontSize='lg'
														fontWeight='semibold'
													>
														{item.qty} x ₹{item.price} = ₹
														{item.qty * item.price}
													</Text>
												
											</Flex>
										))}
									</Box>
								)}
							</Box>
						</Box>
					</Flex>

					{/* Column 2 */}

					<Flex
						direction='column'
						bgColor='white'
						justifyContent='space-between'
						py='8'
						px='8'
						shadow='md'
						rounded='lg'
						borderColor='gray.300'
					>
						<Box>
							<Heading
								as='h2'
								mb='6'
								fontSize='3xl'
								fontWeight='bold'
							>
								Order Summary
							</Heading>

							{/* Item Price */}
							<Flex
								borderBottom='1px'
								py='2'
								borderColor='gray.200'
								alignItems='center'
								justifyContent='space-between'
							>
								<Text fontSize='xl'>Items </Text>
								<Text
									fontWeight='bold'
									fontSize='xl'
								>
									₹{order.itemsPrice}
								</Text>
							</Flex>

							{/* Shipping Price */}
							<Flex
								borderBottom='1px'
								py='2'
								borderColor='gray.200'
								alignItems='center'
								justifyContent='space-between'
							>
								<Text fontSize='xl'>Shipping</Text>
								<Text
									fontSize='xl'
									fontWeight='bold'
								>
									₹{order.shippingPrice}
								</Text>
							</Flex>

							{/* Tax Price */}
							<Flex
								borderBottom='1px'
								py='2'
								borderColor='gray.200'
								alignItems='center'
								justifyContent='space-between'
							>
								<Text fontSize='xl'>Tax</Text>
								<Text
									fontWeight='bold'
									fontSize='xl'
								>
									₹{order.taxPrice}
								</Text>
							</Flex>

							{/* Total Price */}
							<Flex
								borderBottom='1px'
								py='2'
								borderColor='gray.200'
								alignItems='center'
								justifyContent='space-between'
							>
								<Text fontSize='xl'>Total</Text>
								<Text
									fontWeight='bold'
									fontSize='xl'
								>
									₹{order.totalPrice}
								</Text>
							</Flex>
						</Box>

						{/* PAYMENT BUTTON */}
					</Flex>
				</Grid>
			</Flex>
		</>
	);
};

export default OrderScreen;
