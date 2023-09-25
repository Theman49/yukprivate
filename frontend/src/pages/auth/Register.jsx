import React, { createRef } from "react";
import { Flex, Text, Box, Link, Divider } from "@chakra-ui/react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../../layouts/AuthLayout";
import AuthFormControl from "../../features/auth/components/AuthFormControl";
import AuthButton from "../../features/auth/components/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from '../../redux/authSlice';
import GoogleButton from "../../features/auth/components/GoogleButton";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Register = () => {

  const navigate = useNavigate();

  const nameField = createRef();
  const emailField = createRef();
  const passwordField = createRef();
  const confirmPasswordField = createRef();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (passwordField.current.value === confirmPasswordField.current.value) {

      try {

        const userToRegisterPayload = {
          name: nameField.current.value,
          email: emailField.current.value,
          password: passwordField.current.value,
        }

        const registerRequest = await axios.post(
          `${BASE_URL}/register`,
          userToRegisterPayload
        );

        const registerResponse = registerRequest.data;
        
        alert(registerResponse.message);
        
        if (registerResponse.status) {
          dispatch(
            login({
              isAuth: false,
            })
          );
          
          navigate('/login');
        }
        

        nameField.current.value =
          emailField.current.value =
          passwordField.current.value =
          confirmPasswordField.current.value =
            "";

        
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("password tidak sama");
    }
  };

  return (
    <AuthLayout>
      <Flex flexDir="column" gap="32px">
        <Box>
          <Text fontSize="4xl" fontWeight="500">
            Mulai Private Sekarang!
          </Text>
          <Text color="#667085">
            Pilih tentor dan mulai belajar bersama Yuk Private
          </Text>
        </Box>

        <Box>
          <Flex
            boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
            borderRadius="8px"
            justifyContent="center"
            py="16px"
          >
            <Flex alignItems="center" gap="8px">
              <GoogleButton/>
            </Flex>
          </Flex>
        </Box>

        <Box>
          <Flex color="#D9D9D9" alignItems="center" gap="16px">
            <Divider />
            <Text color="#000">atau</Text>
            <Divider />
          </Flex>
        </Box>

        <Box>
          <Flex flexDir="column" gap="24px" mb="16px">
            <AuthFormControl
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap kamu"
              ref={nameField}
            />
            <AuthFormControl
              label="Email"
              type="email"
              placeholder="Alamat email kamu"
              ref={emailField}
            />
            <AuthFormControl
              label="Buat Kata Sandi"
              type="password"
              placeholder="Buat kata sandi kamu"
              ref={passwordField}
            />
            <AuthFormControl
              label="Konfirmasi Kata Sandi"
              type="password"
              placeholder="Ulangi kata sandi yang kamu buat"
              ref={confirmPasswordField}
            />
          </Flex>
        </Box>

        <Box>
          <Flex flexDir="column" gap="20px" alignItems="center">
            <Text
              textAlign="center"
              color="#667085"
              fontWeight={400}
              fontSize="sm"
              w="68%"
            >
              Dengan melanjutkan, Anda menyetujui
              <Link as={LinkRouter} to="#" color="brand.500">
                {" "}
                Ketentuan penggunaan
              </Link>
              ,
              <Link as={LinkRouter} to="#" color="brand.500">
                {" "}
                Kebijakan Privasi
              </Link>
              , dan
              <Link as={LinkRouter} to="#" color="brand.500">
                {" "}
                Standar Komunitas
              </Link>{" "}
              Yuk Private
            </Text>

            <AuthButton value="Buat akun saya" handleClick={onSubmit} />

            <Text textAlign="center">
              Sudah punya akun?
              <Link
                as={LinkRouter}
                to="/login"
                color="#69D3CF"
                ms="8px"
                _hover={{
                  textDecoration: "none",
                }}
              >
                Masuk Sekarang
              </Link>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </AuthLayout>
  );
};

export default Register;
