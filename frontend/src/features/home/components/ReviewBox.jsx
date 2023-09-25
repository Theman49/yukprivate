import React from "react";
import {
  Flex,
  Heading,
  Icon,
  HStack,
  Box,
  Divider,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { MdStarRate } from "react-icons/md";

const ReviewBox = () => {
  return (
    <Flex flexDirection="column" gap="20px">
      <Heading fontSize={["2xl","4xl"]} fontWeight="medium" color="white">
        Metode mengajar yang sangat bagus sehingga materi dapat tersampaikan
        dengan baik dan mudah untuk di pahami
      </Heading>
      <HStack>
        <Icon as={MdStarRate} fontSize="20px" color="#F79009" />
        <Icon as={MdStarRate} fontSize="20px" color="#F79009" />
        <Icon as={MdStarRate} fontSize="20px" color="#F79009" />
        <Icon as={MdStarRate} fontSize="20px" color="#F79009" />
        <Icon as={MdStarRate} fontSize="20px" color="#F79009" />
      </HStack>
      <Divider color="white" />
      <Flex justifyContent="flex-start" gap="20px">
        <Avatar boxSize="64px" src="https://bit.ly/prosper-baba" />
        <Flex flexDirection="column" textAlign="start" gap="12px">
          <Text fontSize="lg" fontWeight="semibold" color="white">
            Miracle Kenter
          </Text>
          <Text fontSize="md" fontWeight="medium" color="white">
            SMAN 1 Semarang
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ReviewBox;
