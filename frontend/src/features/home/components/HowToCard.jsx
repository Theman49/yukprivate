import React from "react";
import { Flex, Text, Heading, Image } from "@chakra-ui/react";

const HowToCard = ({ number, title, paragraph, bgColor, icon }) => {
  return (
    <Flex
      flexDirection="column"
      minW="270px"
      bg="white"
      boxShadow="0px 4px 32px rgba(0, 0, 0, 0.15)"
      borderRadius="20px"
      justifyContent="space-between"
      alignItems="center"
      gap="44px"
    >
      <Flex
        flexDirection="column"
        maxW="227px"
        gap="20px"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        mt="28px"
      >
        <Flex
          borderRadius="full"
          bg="#F2F4F7"
          boxSize="60px"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="lg" fontWeight="semibold">
            {number}
          </Text>
        </Flex>
        <Heading fontSize="2xl" fontWeight="semibold">
          {title}
        </Heading>
        <Text fontSize="lg" fontWeight="medium" color="#98A2B3">
          {paragraph}
        </Text>
      </Flex>
      <Flex
        w="full"
        h="160px"
        bg={bgColor}
        justifyContent="center"
        alignItems="center"
        p="40px 0"
        borderBottomLeftRadius="20px"
        borderBottomRightRadius="20px"
      >
        <Image maxW="80px" src={icon} alt={title} />
      </Flex>
    </Flex>
  );
};

export default HowToCard;
