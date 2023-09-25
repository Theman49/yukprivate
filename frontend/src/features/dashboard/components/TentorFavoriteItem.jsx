import React from "react";
import {
  Avatar,
  Badge,
  Flex,
  Image,
  Heading,
  Text,
  HStack,
  Icon,
  Button,
  VStack,
} from "@chakra-ui/react";
import {
  MdStarRate,
  MdFavoriteBorder,
  MdOutlineWorkOutline,
  MdOutlineCommentBank,
  MdOutlineLocationOn,
  MdFavorite,
} from "react-icons/md";

import DefaultUser from '../../../assets/images/default-user.jpg';

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const TentorFavoriteItem = ({
  tentorImg,
  tentorRating,
  tentorName,
  tentorPlace,
  tentorJob,
  tentorLocation,
  tentorCourse,
}) => {
  return (
    <Flex
      minW="390px"
      boxShadow="0px 2px 25px rgba(0, 0, 0, 0.1)"
      borderRadius="8px"
      bg="white"
    >
      <Flex pos="relative">
        <Image
          w="150px"
          h="180px"
          objectFit="cover"
          src={tentorImg != null ? `${PUBLIC_URL}/${tentorImg}` : DefaultUser}
          alt={tentorName}
          borderRadius="8px"
        />
        <Flex
          pos="absolute"
          top="8px"
          left="8px"
          bg="blackAlpha.500"
          borderRadius="4px"
          fontSize="md"
          p="4px 8px"
          alignItems="center"
          gap="4px"
        >
          <Icon as={MdStarRate} fontSize="16px" color="#F79009" />
          <Text color="white" fontSize="xs">
            {tentorRating}
          </Text>
        </Flex>
        <Flex pos="absolute" top="8px" right="8px">
          <Icon as={MdFavorite} fontSize="24px" color="#F04438" />
        </Flex>
      </Flex>
      <Flex flexDirection="column" p="16px" gap="16px">
        <Flex w="full" justifyContent="space-between">
          <Flex flexDirection="column">
            <Heading fontSize="lg" fontWeight="semibold">
              {tentorName}
            </Heading>
            <Text fontSize="sm" color="gray">
              {tentorPlace}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <VStack alignItems="flex-start">
            <Flex alignItems="center" gap="8px">
              <Icon as={MdOutlineWorkOutline} fontSize="20px" color="gray" />
              <Text fontSize="14px" color="gray">
                {tentorJob}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="8px">
              <Icon as={MdOutlineCommentBank} fontSize="20px" color="gray" />
              <Text fontSize="14px" color="gray" w="70%" noOfLines={1}>
                {tentorCourse}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="8px">
              <Icon as={MdOutlineLocationOn} fontSize="20px" color="gray" />
              <Text fontSize="14px" color="gray">
                {tentorLocation}
              </Text>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TentorFavoriteItem;
