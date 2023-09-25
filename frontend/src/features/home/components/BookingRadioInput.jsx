import React from 'react';
import { Box, Text, Radio } from '@chakra-ui/react';

const RadioInput = ({value, text, state, id="", isHiddenRadio}) => {
  return (
    <Box 
      bg={state == value ? "brand.500" : ""} 
      color={state == value ? "white" : ""} 
      border={state != value ? "1px solid #D0D5DD" : ""}
      display="flex" 
      alignItems="center"
      p="8px 16px"
      borderRadius="4px"
      justifyContent={isHiddenRadio ? "center" : "space-between"}
      gap="10px"
      w="full"
      _hover={{
        cursor: "pointer"
      }}
      >
        <Text>
          <label htmlFor={`${value}${id}`} style={{cursor: "pointer"}}>{text}</label>
        </Text>
        <Radio display={isHiddenRadio ? "none" : ""} value={value} id={`${value}${id}`} colorScheme="whiteAlpha"></Radio>
    </Box>

  )
}

export default RadioInput;