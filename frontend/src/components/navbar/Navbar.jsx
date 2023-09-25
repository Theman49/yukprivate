import React, { useEffect, useState } from "react";
import { Flex, Container, Link, Button, Text } from "@chakra-ui/react";
import { NavLink as LinkRouter } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo/Logo.svg";
import MenuNotification from "./MenuNotification";
import MenuAccount from "./MenuAccount";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Navbar = () => {
  const dispatch = useDispatch()
  let { isAuth, role: isRole, user, token } = useSelector((state) => state.auth);
  let name, email;

  if (!isAuth) {
    isAuth = localStorage.getItem("isAuth");
    isRole = localStorage.getItem("role");
    token = localStorage.getItem("token");
    user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      name = user.name;
      email = user.email;
    }
  } else {
    name = user.name;
    email = user.email;
  }

  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserData = async() => {
      try{
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

      }catch(e){
        if(e.response.status == 401){
          dispatch(logout())
        }
      }
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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex gap="32px">
          <Link
            as={LinkRouter}
            end
            to="/"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Logo />
          </Link>
          <Flex gap="32px" alignItems="center">
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
        </Flex>
        {!isAuth ? (
          <Flex gap="18px">
            <Link
              as={LinkRouter}
              to="/login"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Button
                variant="outline"
                color="brand.500"
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
                _hover={{ bgColor: "brand.400" }}
                _active={{ bgColor: "brand.700" }}
              >
                Daftar
              </Button>
            </Link>
          </Flex>
        ) : isRole == "student" ? (
          <Flex gap="16px" alignItems="center">
            <MenuNotification />
            <MenuAccount
              userName={name}
              userImg={userData ? userData.url_picture : null}
              userEmail={email}
              role={isRole}
            />
          </Flex>
        ) : isRole == "tentor" ? (
          <Flex gap="16px" alignItems="center">
            <MenuNotification />
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
      </Container>
    </Flex>
  );
};

export default Navbar;
