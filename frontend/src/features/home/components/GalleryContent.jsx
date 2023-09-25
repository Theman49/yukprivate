import React from "react";
import {
  Flex,
  Heading,
  Text,
  Button,
  Link,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const GalleryContent = ({dataGalery}) => {
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
        <Heading fontSize="xl" fontWeight="semibold">
          Video Perkenalan
        </Heading>
        <Flex justifyContent="center" w="full">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/b9q2Fc24kIU" title="YouTube video player"></iframe>
        </Flex>
      </Flex>
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
        <Heading fontSize="xl" fontWeight="semibold">
          Galeri Foto
        </Heading>
        <SimpleGrid minChildWidth="214px" w="100%" spacing="12px">
          {dataGalery.map(item => {
            return item.activity_image != null ? (
              <Image
                minW="214px"
                h="120px"
                objectFit="cover"
                src={`${PUBLIC_URL}/${item.activity_image}`}
                alt={item.activity_image.split('/')[1]}
                rounded="4px"
              />
            ) : null
          })}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default GalleryContent;
