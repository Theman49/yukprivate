import React from "react";
import { Flex, Image, Heading, Text } from "@chakra-ui/react";

const ProgramCard = ({ icon, title, paragraph }) => {
  return (
    <Flex
      flexDirection="column"
      minW="270px"
      bg="white"
      gap="20px"
      p="20px"
      boxShadow="0px 4px 32px rgba(0, 0, 0, 0.15)"
      borderRadius="20px"
      _hover={{ transform: "scale(1.1)", transition: "0.2s" }}
    >
      <Image maxW="60px" src={icon} alt={title} />
      <Heading fontSize="xl" fontWeight="semibold">
        {title}
      </Heading>
      <Text fontSize="lg" fontWeight="medium">
        {paragraph}
      </Text>
    </Flex>
  );
};

export default ProgramCard;
