import React from "react";
import {
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import Map from './Map';

const LocationTentor = () => {
  return (
    <Flex
      flexDirection="column"
      bg="white"
      border=" 1px solid #D0D5DD"
      borderRadius="12px"
      p="24px"
      gap="16px"
      maxW="405px"
    >
      <Heading fontSize="xl" fontWeight="semibold">
        Lokasi Tentor
      </Heading>
      <Box w={["100%","357px"]} maxH="326px" bg="gray">
        <Map coordinates={[110.39511616120927,-7.049250237585497]}/>
      </Box>
    </Flex>
  );
};

export default LocationTentor;
