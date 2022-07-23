import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
   <Flex as='footer' justifyContent='center' py='5'>
    <Text >copyright {new Date().getFullYear()}.all right reserved</Text>
    
   </Flex>
  )
}

export default Footer
