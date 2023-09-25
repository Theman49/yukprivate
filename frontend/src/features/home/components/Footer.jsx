import React from "react";
import {
  Flex,
  Container,
  HStack,
  Heading,
  Text,
  Link,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { ReactComponent as Logo } from "../../../assets/logo/Logo.svg";
import { MdOutlinePlace, MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { Link as LinkRouter } from "react-router-dom";

const Footer = () => {
  return (
    <Flex bg="brand.500" minH="100%" h="auto" w="full" p="48px 0px">
      <Container maxW="1200px">
        <Flex gap={["30px","60px"]} flexDir={['column', 'row']}>
          <Flex flexDirection="column" maxW={["100%","30%"]} gap="16px">
            <Link
              as={LinkRouter}
              to="/"
              textDecor="none"
              _hover={{
                textDecor: "none",
              }}
            >
              <HStack>
                <Flex maxW="48px">
                  <Logo />
                </Flex>
                <Heading color="white" fontSize="4xl" fontWeight="bold">
                  Yuk Private
                </Heading>
              </HStack>
            </Link>
            <Text color="white" fontSize="lg">
              Platform Penghubung Antara Tentor Dan Siswa Untuk Meraih PTN
              Impianmu
            </Text>
          </Flex>
          
          <Flex
            w={["100%", "65%"]}
            gap={["10px", "0px"]}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex flexDir={['column', 'row']} justifyContent="space-between" gap="4px" w="full" color="white">
              <Link
                as={LinkRouter}
                to="/explore"
                textDecor="none"
                _hover={{
                  textDecor: "none",
                  transform: "scale(1.05)",
                  transition: "0.2s",
                }}
              >
                Temukan Tentor
              </Link>
              <Link
                as={LinkRouter}
                to="/register"
                textDecor="none"
                _hover={{
                  textDecor: "none",
                  transform: "scale(1.05)",
                  transition: "0.2s",
                }}
              >
                Daftar Tentor
              </Link>
              <Link
                textDecor="none"
                _hover={{
                  textDecor: "none",
                  transform: "scale(1.05)",
                  transition: "0.2s",
                }}
              >
                Les Private
              </Link>
              <Link
                textDecor="none"
                _hover={{
                  textDecor: "none",
                  transform: "scale(1.05)",
                  transition: "0.2s",
                }}
              >
                Try Out
              </Link>
              <Link
                textDecor="none"
                _hover={{
                  textDecor: "none",
                  transform: "scale(1.05)",
                  transition: "0.2s",
                }}
              >
                Konsultasi
              </Link>
              <Link
                textDecor="none"
                _hover={{
                  textDecor: "none",
                  transform: "scale(1.05)",
                  transition: "0.2s",
                }}
              >
                Webinar
              </Link>
            </Flex>
            <Divider color="white" />
            <Flex>
              <Flex flexDir={['column', 'row']} w="full" justifyContent="space-around" gap={["4px", "0px"]}>
                <Link
                  display="flex"
                  alignItems="center"
                  gap="8px"
                  textDecor="none"
                  _hover={{
                    textDecor: "none",
                    transform: "scale(1.05)",
                    transition: "0.2s",
                  }}
                >
                  <IconButton
                    icon={<MdOutlinePlace />}
                    color="white"
                    borderRadius="full"
                    bg="#348A97"
                    maxW="32px"
                  />
                  <Text fontSize="14px" color="white">
                    Gunungpati, Semarang
                  </Text>
                </Link>
                <Link
                  display="flex"
                  alignItems="center"
                  gap="8px"
                  textDecor="none"
                  _hover={{
                    textDecor: "none",
                    transform: "scale(1.05)",
                    transition: "0.2s",
                  }}
                >
                  <IconButton
                    icon={<MdOutlineEmail />}
                    color="white"
                    borderRadius="full"
                    bg="#348A97"
                    maxW="32px"
                  />
                  <Text fontSize="14px" color="white">
                    yukprivate@gmail.com
                  </Text>
                </Link>
                <Link
                  href="https://wa.me/+6285640192914"
                  isExternal
                  display="flex"
                  alignItems="center"
                  gap="8px"
                  textDecor="none"
                  _hover={{
                    textDecor: "none",
                    transform: "scale(1.05)",
                    transition: "0.2s",
                  }}
                >
                  <IconButton
                    icon={<MdOutlinePhone />}
                    color="white"
                    borderRadius="full"
                    bg="#348A97"
                    maxW="32px"
                  />
                  <Text fontSize="14px" color="white">
                    085640192914
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Footer;
