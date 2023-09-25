import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Image, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import {
  MdStarRate,
  MdFavoriteBorder,
  MdOutlineWorkOutline,
  MdOutlineCommentBank,
  MdOutlineLocationOn,
} from "react-icons/md";

import DefaultUser from '../../../assets/images/default-user.jpg';

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const TentorInfoCard = ({
  tentorImg,
  tentorRating,
  tentorName,
  tentorPlace,
  tentorJob,
  tentorCourse,
  tentorLocation,
  tentorId
}) => {
  const navigate = useNavigate();
  return (
    <Flex
      flexDirection="column"
      bg="white"
      boxShadow="0px 2px 25px rgba(0, 0, 0, 0.05)"
      borderRadius="4px"
      maxW={["170px","282px"]}
      _hover={{ transform: "scale(1.05)", transition: "0.2s", cursor: "pointer" }}
      onClick={() => navigate(`/explore/booking/${tentorId}`)}
    >
      <Flex pos="relative">
        <Image
          objectFit="cover"
          boxSize="full"
          borderRadius="4px"
          src={tentorImg != null ? `${PUBLIC_URL}/${tentorImg}` : DefaultUser}
          alt={tentorName}
          maxH={["180px","280px"]}
        />
        <Flex
          pos="absolute"
          top="8px"
          right="8px"
          bg="blackAlpha.500"
          borderRadius="4px"
          fontSize="md"
          p="4px 8px"
          alignItems="center"
          gap="8px"
        >
          <Icon as={MdStarRate} fontSize="20px" color="#F79009" />
          <Text color="white">{tentorRating}</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" p="16px" gap="16px">
        <Flex w="full" justifyContent="space-between">
          <Flex flexDirection="column">
            <Heading fontSize="lg" fontWeight="semibold" noOfLines={1}>
              {tentorName}
            </Heading>
            <Text fontSize="sm" color="gray">
              {tentorPlace}
            </Text>
          </Flex>
          <MdFavoriteBorder fontSize="24px" />
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

export default TentorInfoCard;
