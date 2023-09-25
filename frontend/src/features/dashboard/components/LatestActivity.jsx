import React from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { ReactComponent as NoActivity } from "../../../assets/illustrations/NoActivity.svg";

const LatestActivity = () => {
  return (
    <Box
      bg="white"
      borderRadius="8px"
      p="24px"
      w="332px"
      h="298px"
      boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
    >
      <Heading fontWeight="medium" fontSize="20px">
        Kegiatan Terkini
      </Heading>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <NoActivity />
        <Text fontSize="16px">Belum ada Kegiatan</Text>
      </Flex>
    </Box>
  );
};

export default LatestActivity;
