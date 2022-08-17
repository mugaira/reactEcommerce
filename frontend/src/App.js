import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screen/HomeScreen";
import { Flex } from "@chakra-ui/react";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";

const App = () => {
  return (
   
    <BrowserRouter>
      <Header />
      <Flex
        as="main"
        mt="72px"
        direction="column"
        py="6"
        px="6"
        bgColor="gray.200"
      >
        <Routes>
      <Route path='/' element = {<HomeScreen />} />
      <Route path='/product/:id'  element={<ProductScreen />} />
      <Route path='/cart/:id' element={<CartScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      </Routes>
      </Flex>

      <Footer />
      </BrowserRouter>
    
  );
};

export default App;
