import React, { useEffect, useState } from "react";
import {
  Flex,
  Container,
  Link,
  Button,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Image,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { NavLink as LinkRouter } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo/Logo.svg";
import LogoImage from "../../assets/images/logo.png";
import {
  MdMenu
} from "react-icons/md";
import MenuNotification from "./MenuNotification";
import MenuAccount from "./MenuAccount";
import { useSelector } from "react-redux";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MobileNavbar = () => {
  let { isAuth, role: isRole, user, token } = useSelector((state) => state.auth);
  let name, email;

  if (!isAuth) {
    isAuth = localStorage.getItem('isAuth')
    isRole = localStorage.getItem('role')
    token = localStorage.getItem('token')
    user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      name = user.name
      email = user.email
    }
  } else {
    name = user.name
    email = user.email
  }

  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserData = async() => {
      const req = await axios.get(
        `${BASE_URL}/users/${isRole}s/${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

      const res = req.data.data
      setUserData(res[`${isRole}s_by_id`])
    }
    getUserData();
  },[])

  return (
    <Flex
      w="full"
      h="65px"
      bg="white"
      zIndex="300"
      pos="fixed"
      boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
    >
      <Container
        maxW="1202px"
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex gap="32px" justifyContent="space-between" w="full" alignItems="center">
                    <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<MdMenu />}
              variant='solid'
              color="gray"
              fontSize="24px"
              borderRadius="50%"
              _hover={{
                transform: "scale(1.1)"
              }}
            >
              Actions
            </MenuButton>
            <MenuList border="0" pos="relative">
              <Box
                bg="white"
                minW="fit-content"
                h="auto"
                p="24px"
                borderRadius="8px"
                mb="24px"
                position="absolute"
                zIndex="2"
                boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
              >
                <Flex gap="32px" alignItems="baseline" flexDir="column" mb="20px">
                  <Link
                    as={LinkRouter}
                    end
                    to="/"
                    _hover={{
                      textDecoration: "none",
                      color: "brand.400",
                      borderBottom: "2px solid #8EE4D9",
                    }}
                    _activeLink={{
                      color: "brand.500",
                      borderBottom: "2px solid #69D3CF",
                    }}
                  >
                    <Text fontWeight="medium" fontSize="14px">
                      Beranda
                    </Text>
                  </Link>
                  <Link
                    as={LinkRouter}
                    end
                    to="/explore"
                    _hover={{
                      textDecoration: "none",
                      color: "brand.400",
                      borderBottom: "2px solid #8EE4D9",
                    }}
                    _activeLink={{
                      color: "brand.500",
                      borderBottom: "2px solid #69D3CF",
                    }}
                  >
                    <Text fontWeight="medium" fontSize="14px">
                      Tentor
                    </Text>
                  </Link>
                  <Link
                    as={LinkRouter}
                    to="/program"
                    _hover={{
                      textDecoration: "none",
                      color: "brand.400",
                      borderBottom: "2px solid #8EE4D9",
                    }}
                    _active={{
                      color: "brand.700",
                      borderBottom: "2px solid #69D3CF",
                    }}
                  >
                    <Text fontWeight="medium" fontSize="14px">
                      Program
                    </Text>
                  </Link>
                </Flex>
                {!isAuth ? (
                  <Flex gap="18px" flexDir="column">
                    <Link
                      as={LinkRouter}
                      to="/login"
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outline"
                        color="brand.500"
                        w="100px"
                        _hover={{ color: "brand.400" }}
                        _active={{ color: "brand.700" }}
                      >
                        Masuk
                      </Button>
                    </Link>
                    <Link
                      as={LinkRouter}
                      to="/register"
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="solid"
                        bgColor="brand.500"
                        color="white"
                        w="100px"
                        _hover={{ bgColor: "brand.400" }}
                        _active={{ bgColor: "brand.700" }}
                      >
                        Daftar
                      </Button>
                    </Link>
                  </Flex>
                ) : isRole == "student" ? (
                  <Flex gap="16px" alignItems="flex-start">
                    {/* <MenuNotification /> */}
                    <MenuAccount
                      userName={name}
                      userImg={userData ? userData.url_picture : null}
                      userEmail={email}
                      role={isRole}
                    />
                  </Flex>
                ) : isRole == "tentor" ? (
                  <Flex gap="16px" alignItems="baseline">
                    {/* <MenuNotification /> */}
                    <MenuAccount
                      userName={name}
                      userImg={userData ? userData.url_picture : null}
                      userEmail={email}
                      role={isRole}
                    />
                  </Flex>
                ) : (
                  <></>
                )}
              </Box>
            </MenuList>
          </Menu>
          
          <Link
            as={LinkRouter}
            end
            to="/"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Image
              src={LogoImage}
              alt="Logo Yuk Private"
             />
          </Link>

        </Flex>

      </Container>
    </Flex>
  );
};

export default MobileNavbar;
