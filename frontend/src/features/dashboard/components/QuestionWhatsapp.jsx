import React from "react";
import { Box, Flex, Heading, Text, Button, Link } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const QuestionWhatsapp = () => {
  return (
    <Box
      bg="white"
      w={["full","332px"]}
      h="176px"
      p="24px"
      borderRadius="8px"
      boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="4px"
      >
        <Heading fontWeight="medium" fontSize="20px">
          Punya pertanyaan?
        </Heading>
        <Text fontSize="14px" mb="4px" textAlign="center">
          Jika Kamu ada pertanyaan atau kendala, dapat menghubungi kami..
        </Text>
        <Link
          href="https://wa.me/085158463077"
          isExternal
          textDecor="none"
          _hover={{
            textDecor: "none",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
        >
          <Button
            leftIcon={<FaWhatsapp />}
            colorScheme="whatsapp"
            fontWeight="regular"
            fontSize="14px"
            w="100%"
          >
            Kirim Whatsapp
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default QuestionWhatsapp;
