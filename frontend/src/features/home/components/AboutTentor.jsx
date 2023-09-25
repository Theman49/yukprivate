import { React, useState } from "react";
import { Flex, Heading, Text, Button, Link, Collapse } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";

const AboutTentor = ({ tentorDescription }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
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
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize="xl" fontWeight="semibold">
          Tentang
        </Heading>
        {/* <Link
          as={LinkRouter}
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          {/* <Button
            fontSize="14px"
            leftIcon={<MdPlayArrow />}
            bg="brand.500"
            _hover={{ bg: "brand.400" }}
            _active={{ bg: "brand.700" }}
          >
            Video Perkenalan
          </Button>
        </Link> */}
      </Flex>
      <Collapse fontSize="md" startingHeight={50} in={show}>
        {tentorDescription}
      </Collapse>
      <Button
        size="sm"
        color="brand.500"
        onClick={handleToggle}
        variant="unstyled"
      >
        Lebih {show ? "Sedikit" : "Banyak"}
      </Button>
    </Flex>
  );
};

export default AboutTentor;
