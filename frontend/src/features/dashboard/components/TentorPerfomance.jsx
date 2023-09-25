import React from "react";
import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import {
  MdMonetizationOn,
  MdMoney,
  MdPeopleAlt,
  MdStarRate,
} from "react-icons/md";

const TentorPerfomance = () => {
  return (
    <Flex gap="24px" minH="150px" overflowX={["auto", "unset"]}>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        minW="273px"
        maxH="160px"
        px="24px"
        py="16px"
        bgGradient="linear(113.81deg, #0072FF 2.2%, #00C6FF 116.91%)"
        borderRadius="8px"
        _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
      >
        <Text fontSize="lg" fontWeight="semibold" color="white">
          Pendapatan
        </Text>
        <Flex gap="24px">
          <Flex
            bg="#8DE6FF"
            boxSize="64px"
            rounded="full"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              as={MdMonetizationOn}
              minW="40px"
              minH="40px"
              color="#0072FF"
            />
          </Flex>
          <Flex flexDir="column">
            <Text fontSize="md" fontWeight="medium" color="white" mr="2px">
              Rp
            </Text>
            <Heading fontSize="3xl" fontWeight="medium" color="white">
              621.768
            </Heading>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        minW="273px"
        maxH="160px"
        px="24px"
        py="16px"
        bgGradient="linear(114.38deg, #30C67C -8.42%, #82F4B1 125.24%)"
        borderRadius="8px"
        _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
      >
        <Text fontSize="lg" fontWeight="medium" color="white">
          Total Mengajar
        </Text>
        <Flex gap="24px">
          <Flex
            bg="#B3FFD8"
            boxSize="64px"
            rounded="full"
            justifyContent="center"
            alignItems="center"
          >
            <Icon as={MdPeopleAlt} minW="40px" minH="40px" color="#46D38A" />
          </Flex>
          <Flex flexDir="column">
            <Heading fontSize="3xl" fontWeight="medium" color="white">
              32
            </Heading>
            <Text fontSize="md" fontWeight="medium" color="white" mr="2px">
              Pertemuan
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        minW="273px"
        maxH="160px"
        px="24px"
        py="16px"
        bgGradient="linear(117.04deg, #FF4E50 -6.85%, #F9D423 111.51%)"
        borderRadius="8px"
        _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
      >
        <Text fontSize="lg" fontWeight="semibold" color="white">
          Rating Kamu
        </Text>
        <Flex gap="24px">
          <Flex
            bg="#FCC9B2"
            boxSize="64px"
            rounded="full"
            justifyContent="center"
            alignItems="center"
          >
            <Icon as={MdStarRate} minW="40px" minH="40px" color="#FE7A42" />
          </Flex>
          <Flex flexDir="column">
            <Heading fontSize="3xl" fontWeight="medium" color="white">
              4.9
            </Heading>
            <Text fontSize="md" fontWeight="medium" color="white" mr="2px">
              (29 Ulasan)
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TentorPerfomance;
