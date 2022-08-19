import { useParams, useSearchParams } from 'react-router-dom';
import React from 'react'

const CartScreen = () => {

	const { id } = useParams();

	const [searchParams] = useSearchParams();
	const qty = searchParams.get('qty');

	return (
		<div>
			<p>Cart Screen</p>
		</div>
	)
}

export default CartScreen;
