import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc   Auth user & get token
// @route  POST /api/user/login
// @access public

const authUser = asyncHandler(async (req, res) => {
 const { email, password } = req.body;

 const user = await User.findOne({ email });

 if (user && (await user.matchPassword(password))) {
  res.json({
   _id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
   token: generateToken(user._id),
  });
 } else {
  res.status(401); //Unauthorized
  throw new Error('Invalid email or password');
 }
});

// @desc   Get user profile
// @route  GET /api/user/profile
// @access private

const getUserProfile = asyncHandler(async (req, res) => {
 const user = await User.findById(req.user._id);

 if (user) {
  res.json({
   _id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
  });
 } else {
  res.status(404);
  throw new Error('User Not Found');
 }
});

// @desc   Register new user
// @route  POST /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
 const { name, email, password } = req.body;

 const userExists = await User.findOne({ email });

 if (userExists) {
  res.status(400); //Bad rrequest
  throw new Error('user/email already exist');
 }

 const user = await User.create({ name, email, password });

 if (user) {
  res.status(200).json({
   _id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
   token: generateToken(user._id),
  });
 }
});

// @desc   Update user profile
// @route  put /api/users/profile
// @access private

const updateUserProfile = asyncHandler(async (req, res) => {
 const user = await User.findById(req.user._id);

 if (user) {
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
   user.password = req.body.password;
  }

  const updateUser = await user.save();

  res.json({
   _id: updateUser._id,
   name: updateUser.name,
   email: updateUser.email,
   isAdmin: updateUser.isAdmin,
   token: generateToken(updateUser._id),
  });
 } else {
  res.status(404);
  throw new Error('User Not Found');
 }
});

// @desc   Get all users
// @route  GET /api/users
// @access private/admin

const getUsers = asyncHandler(async (req, res) => {
 const user = await User.find({});
 res.json(user);
});

// @desc   Delete users
// @route  Delete /api/users/:id
// @access private/admin

const deleteUser = asyncHandler(async (req, res) => {
 const user = await User.findById(req.params.id);

 if (user) {
  await user.remove();
  res.json({ message: 'User deleted' });
 } else {
  res.status(404);
  throw new Error('User not found');
 }
});

export {
 authUser,
 getUserProfile,
 registerUser,
 updateUserProfile,
 getUsers,
 deleteUser,
};
