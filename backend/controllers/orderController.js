import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';

// @desc   Create new order
// @route  POST /api/orders
// @access private

const addOrderItems = asyncHandler(async (req, res) => {
 const {
  orderItems,
  paymentMethod,
  shippingAddress,
  itemPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
 } = req.body;

 if (orderItems && orderItems.length === 0) {
  res.status(400); //Bad request
  throw new Error('No order found');
 } else {
  const order = new Order({
   orderItems,
   user: req.user._id,
   shippingAddress,
   paymentMethod,
   itemPrice,
   shippingPrice,
   taxPrice,
   totalPrice,
  });

  const createOrder = await order.save();
  res.status(200).json(createOrder);
 }
});

export { addOrderItems };
