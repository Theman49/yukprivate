import React from "react";
import {
  Flex,
  Heading,
  IconButton,
  Link,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

const EditGalleryContent = () => {
  return (
    <Flex flexDirection="column" gap="24px">
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        maxW="759px"
        bg="white"
        border=" 1px solid #D0D5DD"
        borderRadius="12px"
        p="24px"
        gap="16px"
      >
        <Flex w="full" justifyContent="space-between">
          <Heading fontSize="xl" fontWeight="semibold">
            Galeri Foto
          </Heading>
          <IconButton
            icon={<MdAdd />}
            fontSize="20px"
            color="white"
            bg="brand.500"
            _hover={{ bg: "brand.400" }}
            _active={{ bg: "brand.700" }}
            rounded="8px"
            mr="15px"
          />
        </Flex>

        <SimpleGrid minChildWidth="214px" w="100%" spacing="12px">
          <Image
            minW="214px"
            h="120px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            rounded="4px"
          />
          <Image
            minW="214px"
            h="120px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            rounded="4px"
          />
          <Image
            minW="214px"
            h="120px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            rounded="4px"
          />
          <Image
            minW="214px"
            h="120px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            rounded="4px"
          />
          <Image
            minW="214px"
            h="120px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            rounded="4px"
          />
          <Image
            minW="214px"
            h="120px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            rounded="4px"
          />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default EditGalleryContent;
