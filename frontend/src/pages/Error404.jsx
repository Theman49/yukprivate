import React from "react";
import { Flex, Heading, Button, Link, HStack } from "@chakra-ui/react";
import HomeLayout from "../layouts/HomeLayout";
import { ReactComponent as NotFound } from "../assets/illustrations/NotFound.svg";
import { Link as LinkRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound404 = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <HomeLayout>
      <Flex
        flexDir="column"
        gap="36px"
        py="50px"
        justifyContent="center"
        alignItems="center"
      >
        <NotFound maxW="900px" />
        <Flex
          flexDir="column"
          gap="36px"
          justifyContent="center"
          alignItems="center"
          maxW="657px"
        >
          <Heading fontSize="lg" fontWeight="medium" textAlign="center">
            Website masih dalam pengerjaan, mungkin Kamu bisa membuka halaman
            lain atau kembali ke beranda
          </Heading>

          <HStack gap="12px">
            {isAuth == true && (
              <Link
                as={LinkRouter}
                to="/dashboard/home"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  p="16px 32px"
                  color="white"
                  bg="brand.500"
                  _hover={{ bg: "brand.400" }}
                  _active={{ bg: "brand.700" }}
                  maxW="200px"
                >
                  Kembali ke Dashboard
                </Button>
              </Link>
            )}
            <Link
              as={LinkRouter}
              to="/"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Button
                p="16px 32px"
                color="white"
                bg="brand.500"
                _hover={{ bg: "brand.400" }}
                _active={{ bg: "brand.700" }}
                maxW="200px"
              >
                Kembali ke Beranda
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Flex>
    </HomeLayout>
  );
};

export default NotFound404;
