import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screen/HomeScreen";
import { Flex } from "@chakra-ui/react";

const App = () => {
  return (
    <div>
      <Header />
      <Flex
        as="main"
        mt="72px"
        direction="column"
        py="6"
        px="6"
        bgColor="gray.200"
      >
      <HomeScreen />
      </Flex>

      <Footer />
    </div>
  );
};

export default App;
