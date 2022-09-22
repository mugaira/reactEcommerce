import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc   Fetch All Product
// @route  GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
 const products = await Product.find({});
 res.json(products);
});

// @desc   Fetch Single Product
// @route  GET /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
 try {
  const product = await Product.findById(req.params.id);

  if (product) {
   res.json(product);
  } else {
   res.status(404).json({ message: 'Product not found' });
  }
 } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
 }
});

// @desc   Delete product
// @route  DELETE /api/products/:id
// @access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
 const product = await Product.findById(req.params.id);

 if (product) {
  await product.remove();
  res.json({ message: 'Product deleted' });
 } else {
  res.status(404);
  throw new Error('Product not found');
 }
});

// @desc   Create product
// @route  POST /api/products/
// @access private/admin

const createProduct = asyncHandler(async (req, res) => {
 const product = new Product({
  name: 'Sample Product',
  price: 0,
  user: req.user._id,
  image: '/images/sample.jpg',
  brand: 'Sample Brand',
  category: 'Sample Category',
  countInStock: 0,
  numReview: 0,
  description: 'Sample Description',
 });

 const createdProduct = await product.save();
 res.status(201).json(createdProduct);
});

// @desc   Update product
// @route  PUT /api/products/:id
// @access private/admin

const updateProduct = asyncHandler(async (req, res) => {
 const { name, price, image, brand, category, countInStock, description } =
  req.body;

 const product = await Product.findById(req.params.id);

 if (product) {
  product.name = name;
  product.price = price;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  product.description = description;

  const updatedProduct = await product.save();

  res.json(updatedProduct);
 } else {
  res.status(404);
  throw new Error('Product not found');
 }
});

// @desc   create product review
// @route  POST /api/products/:id/reviews
// @access private

const createProductReview = asyncHandler(async (req, res) => {
 const { rating, comment } = req.body;

 const product = await Product.findById(req.params.id);

 if (product) {
  const alreadyReview = product.reviews.find(
   (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReview) {
   res.status(400);
   throw new Error('Product already reviewed');
  }

  const review = {
   name: req.user.name,
   rating: +rating,
   comment,
   user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  product.rating =
   product.reviews.reduce((acc, currVal) => currVal.rating + acc, 0) /
   product.reviews.length;

  await product.save();
  res.status(200).json({ message: 'Product reviewed' });
 } else {
  res.status(404);
  throw new Error('Product not found');
 }
});

export {
 getProducts,
 getProductById,
 deleteProduct,
 createProduct,
 updateProduct,
 createProductReview,
};
