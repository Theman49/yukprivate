import React, { createRef, useState } from "react";
import { Flex, Box, Heading, Text, VStack, Divider, Link, Button } from "@chakra-ui/react";
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import AuthLayout from "../../layouts/AuthLayout";
import AuthFormControl from "../../features/auth/components/AuthFormControl";
import AuthButton from '../../features/auth/components/AuthButton';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../../redux/authSlice';
import axios from 'axios';
import GoogleButton from "../../features/auth/components/GoogleButton";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {

  const { token, user, role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const emailField = createRef();
  const passwordField = createRef();

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });


  const onSubmit = async () => {

    try {

      const userToLoginPayload = {
        email: emailField.current.value,
        password: passwordField.current.value
      };

      const loginRequest = await axios.post(
        `${BASE_URL}/login`,
        userToLoginPayload
      );

      const loginResponse = loginRequest.data;

      alert(loginResponse.message);


      if (loginResponse.status) {

        const token = loginResponse.data.token;

        const getCurrentUser = await axios.get(
          `${BASE_URL}/auth/me`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*'
            }
          }
        )

        const currentUser = getCurrentUser.data.data.current_user;

        dispatch(login({
          token: loginResponse.data.token,
          role: loginResponse.data.role,
          user: currentUser
        }))

        if (!currentUser.isVerifiedEmail) {
          navigate('/verification');
        }

        if (!currentUser.role) {
          navigate('/roles');
        } else {
          navigate('/');
        }

      }
    } catch (err) {
      const response = err.response.data;
      alert(response.message)

      setErrorResponse({
        isError: true,
        message: response.message,
      });

    }
  };



  return (
    <AuthLayout>
      <Flex
        flexDir="column"
        gap="32px"
      >
        <Box>
          <Text
            fontSize="4xl"
            fontWeight="500"
          >Selamat Datang Kembali🤗</Text>
          <Text
            color="#667085"
          >Kembali belajar bersama Yuk Private</Text>
        </Box>

        <Box>
          <Flex
            boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
            borderRadius="8px"
            justifyContent="center"
            py="16px"
          >
            <Flex
              alignItems="center"
              gap="8px"
            >
              <GoogleButton/>
            </Flex>
          </Flex>
          {/* </Link> */}
        </Box>

        <Box>
          <Flex
            color="#D9D9D9"
            alignItems="center"
            gap="16px"
          >
            <Divider />
            <Text color="#000">
              atau
            </Text>
            <Divider />
          </Flex>
        </Box>

        <Box>
          <Flex
            flexDir="column"
            gap="24px"
            mb="16px"
          >
            <AuthFormControl label="Email" type="email" placeholder="Masukkan email Kamu" ref={emailField} />
            <AuthFormControl label="Kata Sandi" type="password" placeholder="Masukkan kata sandi" ref={passwordField} />
          </Flex>

          <Link
            as={LinkRouter}
            to="/forgot-password"
            _hover={{
              textDecoration: "none",
            }}
            textAlign="right"
          >
            <Text
              color="#69D3CF"
            >
              Lupa kata sandi?
            </Text>
          </Link>
        </Box>

        <Box>
          <Flex
            flexDir="column"
            gap="20px"
          >
            <AuthButton value="Masuk" handleClick={onSubmit} />

            <Text
              textAlign="center"
            >
              Belum punya akun?
              <Link
                as={LinkRouter}
                to="/register"
                color="#69D3CF"
                ms="8px"
                _hover={{
                  textDecoration: "none",
                }}
              >Buat Akun</Link>
            </Text>
          </Flex>
        </Box>

      </Flex>
    </AuthLayout>
  )
};

export default Login;
