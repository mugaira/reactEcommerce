import React from "react";
import { Heading, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  // const products = [1,2,3];

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // console.log("i reached here");
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <Heading as="h2" fontSize="3xl" mb="8">
        Latest Product
      </Heading>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error" >{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr",
          }}
          gap="8"
        >
          {products.map((prod) => (
            <Product key={prod._id} product={prod} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default HomeScreen;
