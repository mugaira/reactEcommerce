import dotenv from 'dotenv';
import mongoose from "mongoose";
import colors from "colors";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

connectDB();

const importData = async () => {
 try {
  await Product.deleteMany();
  await Order.deleteMany();
  await User.deleteMany();

  const userCreated = await User.insertMany(users);
  const adminId = userCreated[0]._id;
  
  const sampleProduct = products.map((product) => {
   return {...product, user:adminId};
  });

  await Product.insertMany(sampleProduct);
  console.log('Data Imported'.green.inverse); 
  process.exit();

 } catch (error) {
  console.log(`${error}`);
  process.exit(1);
 }
};

const destroyData = async () => {
 try {
  await Product.deleteMany();
  await Order.deleteMany();
  await User.deleteMany();

  console.log('Data Destroyed'.red.inverse);
  process.exit();
 } catch (error) {
  console.log(`${error}`);
  process.exit(1);
 }
}


if(process.argv[2] === '-d'){
 destroyData();
}
else{
 importData();
}
