import {
	Button,
	Select,
	Flex,
	Grid,
	Heading,
	Image,
	Text,
	Box,
	FormControl,
	FormLabel,
	Textarea,
	Link,
} from '@chakra-ui/react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import {
	createProductReview,
	listProductDetails,
} from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { useState, useEffect } from 'react';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	// const [image, setImage] = useState('')

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	// const fetchImage = async () => {
	// 	const data = await `/${product.image}`
	// 	console.log(data);
	// 	setImage(data);
	// }

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productCreateReview = useSelector((state) => state.productCreateReview);
	const { error: errorReview, success: successReview } = productCreateReview;

	useEffect(() => {
		if (successReview) {
			alert('Product Reviewed');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(id));

		// fetchImage();
	}, [id, dispatch, successReview]);



	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(id, { rating, comment }));
	};

	return (
		<>
			<Flex mb='3'>
				<Button
					as={RouterLink}
					to='/'
					colorScheme='red'
				>
					Back
				</Button>
			</Flex>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type='error'>{error}</Message>
			) : (
				<>
					<Grid
						templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '5fr 4fr 3fr' }}
						gap='10'
					>
						{/* Coloum 1 */}
						<Image
							src={product.image}
							alt={product.name}
							mb='10'
						/>

						{/* coloum 2 */}
						<Flex direction='column'>
							<Heading
								as='h6'
								textTransform='uppercase'
								fontWeight='bold'
								fontSize='sm'
								color='gray'
							>
								{' '}
								{product.brand}{' '}
							</Heading>
							<Heading
								as='h2'
								textTransform={'uppercase'}
								fontWeight='bold'
								fontSize='lg'
							>
								{product.name}
							</Heading>

							<Rating
								value={product.rating}
								text={product.numReviews}
							/>
							<Heading
								as='h5'
								fontSize='xl'
								color='teal.600'
							>
								₹{product.price}
							</Heading>
							<Text>{product.description}</Text>
						</Flex>

						{/* column 3 */}
						<Flex direction='column'>
							<Flex
								justifyContent='space-between'
								py='2'
							>
								<Text>Price:</Text>
								<Text fontWeight='bold'>₹{product.price}</Text>
							</Flex>
							<Flex
								justifyContent='space-between'
								py='1'
							>
								<Text>Status:</Text>
								<Text fontWeight='bold'>
									{product.countInStock > 0 ? 'InStock' : "Not available'"}
								</Text>
							</Flex>

							{product.countInStock > 0 && (
								<Flex
									justifyContent='space-between'
									py='2'
								>
									<Text>Qty: </Text>
									<Select
										value={qty}
										onChange={(e) => setQty(e.target.value)}
										width='30%'
									>
										{[...Array(product.countInStock).keys()].map((i) => (
											<option
												key={i + 1}
												value={i + 1}
											>
												{i + 1}
											</option>
										))}
									</Select>
								</Flex>
							)}

							<Button
								bgColor='gray.800'
								textTransform='uppercase'
								letterSpacing='wide'
								my='2'
								colorScheme='red'
								disabled={product.countInStock === 0}
								onClick={addToCartHandler}
							>
								Add To Cart
							</Button>
						</Flex>
					</Grid>

					{/* Review Form */}
					<Box mt='10'>
						<Box>
							<Heading
								as='h2'
								size='xl'
								mb='4'
							>
								Reviews
							</Heading>
						</Box>

						{product.reviews.length === 0 && <Message>No Reviews</Message>}
						{product.reviews.length !== 0 && (
							<Box
								p='4'
								bgColor='white'
								rounded='mb'
								mb='1'
								mt='5'
							>
								{product.reviews.map((review) => (
									<Flex
										direction='column'
										key={review._id}
										mb='5'
									>
										<Flex justifyContent='space-between'>
											<Text fontSize='lg'>
												<strong>{review.name}{' '}</strong>
												{review.createdAt?.substring(0, 10)}
											</Text>
											<Rating value={review.rating} />
										</Flex>
										<Text mt='2'>{review.comment}</Text>
									</Flex>
								))}
							</Box>
						)}

						{/* Form */}
						<Box
							p='10'
							bgColor='white'
							rounded='md'
							border='2px'
							mt='10'
							borderColor='gray.300'
						>
							<Heading
								as='h3'
								size='lg'
								mb='6'
							>
								Write a review
							</Heading>

							{errorReview && <Message type='error'>{errorReview}</Message>}
							{userInfo ? (
								<form onSubmit={submitHandler}>
									<FormControl
										id='rating'
										mb='3'
									>
										<FormLabel>Rating</FormLabel>
										<Select
											placeholder='Select Option'
											value={rating}
											onChange={(e) => setRating(e.target.value)}
										>
											<option value='1'>1 - Poor</option>
											<option value='2'>2 - Okay</option>
											<option value='3'>3 - Good</option>
											<option value='4'>4 - Very Good</option>
											<option value='5'>5 - Excellent</option>
										</Select>
									</FormControl>

									<FormControl
										id='comment'
										mb='3'
									>
										<FormLabel>Comment</FormLabel>
										<Textarea
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										></Textarea>
									</FormControl>

									<Button
										colorScheme='teal'
										type='submit'
									>
										Post Review
									</Button>
								</form>
							) : (
								<Message>
									Please{' '}
									<Link
										as={RouterLink}
										to='/login'
									>
										Login
									</Link>{' '}
									to write a review
								</Message>
							)}
						</Box>
					</Box>
				</>
			)}
		</>
	);
};

export default ProductScreen;
