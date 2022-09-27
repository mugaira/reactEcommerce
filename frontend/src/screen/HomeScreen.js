import { Heading, Flex, Grid, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Carousel from '../components/Carousel';
import HomeBannerOne from '../components/BannerOne';
import HomeBannerTwo from '../components/BannerTwo';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const [featuredProducts, setFeaturedProducts] = useState([])

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
		setFeaturedProducts(products.filter((product) => (product.isFeatured) ? product : ''));

	}, [dispatch, setFeaturedProducts]);

	return (
		<>
			<Flex display="flex" direction="column" w="100%">
				<Box w="100%">
					<Carousel />
				</Box>

				<Box w="100%">
					<HomeBannerOne />
				</Box>

				<Heading
					as='h2'
					fontSize='3xl'
					mb='4'
					mt='8'
				>
					Feature Product
				</Heading>

				{loading ? (
					<Loader />
				) : error ? (
					<Message type='error'>{error}</Message>
				) : (
					<Grid
						templateColumns={{
							sm: '1fr',
							md: '1fr 1fr',
							lg: '1fr 1fr 1fr',
							xl: '1fr 1fr 1fr 1fr',
						}}
						gap='8'
					>
						{featuredProducts.map((prod) => (
							<Product
								key={prod._id}
								product={prod}
							/>
						))}
					</Grid>
				)}


				<Box mt='4'>
					<HomeBannerTwo />
				</Box>
			</Flex>
		</>
	);
};

export default HomeScreen;
