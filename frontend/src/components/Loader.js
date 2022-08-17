import { Flex, Spinner } from "@chakra-ui/react";

import React from "react";

const Loader = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.800"
        size="xl"
        label="Loading..."
      ></Spinner>
    </Flex>
  );
};

export default Loader;
