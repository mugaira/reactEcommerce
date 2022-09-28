import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import {IoStar, IoStarOutline ,IoStarHalf} from 'react-icons/io5'

import React from 'react'


const Rating = ({value,text ,color = "red.500"}) => {
  return (
      <Flex alignItems='center'>
        <Box mr='3'>
       <Icon color={color}
       as = {value >= 1 ? IoStar : value >= 0.5 ? IoStarHalf : IoStarOutline} />
       <Icon color={color}
       as = {value >= 2 ? IoStar : value >= 1.5 ? IoStarHalf : IoStarOutline} />
       <Icon color={color}
       as = {value >= 3 ? IoStar : value >= 2.5 ? IoStarHalf : IoStarOutline} />
       <Icon color={color}
       as = {value >= 4 ? IoStar : value >= 3.5 ? IoStarHalf : IoStarOutline} />
       <Icon color={color}
       as = {value >= 5 ? IoStar : value >= 4.5 ? IoStarHalf : IoStarOutline} />
       </Box>
       {/* <Text >{text} Reviews</Text> */}
      </Flex>
    
  )
}

export default Rating
