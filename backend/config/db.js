import mongoose from "mongoose";

const connectDB = async () => {
 try {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
   useUnifiedTopology : true,
   useNewUrlParser : true
  });

  console.log(`mongoDB connect: ${conn.connection.host}`.yellow.bold)
  
 } catch (error) {
  console.log(`Error: ${error.message}`.red.underline);
  process.exit(1);  
 }

}

export default connectDB;