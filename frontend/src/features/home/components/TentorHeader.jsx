import React from "react";
import {
  Flex,
  Image,
  Avatar,
  Heading,
  Text,
  Link,
  IconButton,
} from "@chakra-ui/react";
import {
  MdOutlineMessage,
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineShare,
} from "react-icons/md";
import { Link as LinkRouter } from "react-router-dom";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const TentorHeader = ({
  name,
  location,
  jobPosition,
  jobPlace,
  avatarImg,
  headerImg,
}) => {
  return (
    <Flex
      flexDirection="column"
      maxW="759px"
      bg="white"
      border=" 1px solid #D0D5DD"
      borderRadius="12px"
    >
      <Image objectFit="cover" src={headerImg} w="full" />
      <Flex pos="relative" w="full" p="10px 24px 24px 60px">
        <Avatar
          pos="absolute"
          top="-62px"
          left="60px"
          size="2xl"
          border="4px solid white"
          src={avatarImg != null ? `${PUBLIC_URL}/${avatarImg}` : null}
          alt={name}
          bg="#eee"
        />
        <Flex flexDirection="column" w="full" mt="66px">
          <Heading fontSize="xl" fontWeight="semibold">
            {name}
          </Heading>
          <Text fontSize="md" color="gray">
            {location}
          </Text>
          <Text fontSize="md" color="gray">
            {jobPosition} di {jobPlace}
          </Text>
        </Flex>
        <Flex w="176px" gap="10px">
          <Link
            as={LinkRouter}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <IconButton
              aria-label="message"
              icon={<MdOutlineMessage />}
              fontSize="24px"
              boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
              borderRadius="4px"
            />
          </Link>
          <Link
            as={LinkRouter}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <IconButton
              aria-label="favorite"
              icon={<MdFavoriteBorder />}
              fontSize="24px"
              boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
              borderRadius="4px"
            />
          </Link>
          <Link
            as={LinkRouter}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <IconButton
              aria-label="share"
              icon={<MdOutlineShare />}
              fontSize="24px"
              boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
              borderRadius="4px"
            />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TentorHeader;
