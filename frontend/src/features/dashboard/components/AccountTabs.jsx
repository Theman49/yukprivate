import React, { createRef } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { Flex, Heading, Text } from "@chakra-ui/react";
import AuthFormControl from "../../auth/components/AuthFormControl";
import AuthButton from "../../auth/components/AuthButton";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AccountTabs = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const emailField = createRef();
  const passwordField = createRef();
  const confirmPasswordField = createRef();

  let { token, isAuth, role: isRole, user } = useSelector((state) => state.auth);

  if (!isAuth) {
    isAuth = localStorage.getItem('isAuth')
    isRole = localStorage.getItem('role')
    token = localStorage.getItem("token");
    user = JSON.parse(localStorage.getItem('user'))
  }

  const userData = { ...user };

  const onSubmit = async () => {

    if (passwordField.current.value === confirmPasswordField.current.value) {

      try {

        const token = localStorage.getItem("token");

        const studentChangePasswordPayload = {
          email: emailField.current.value,
          password: passwordField.current.value
        };

        const studentChangePasswordRequest = await axios.put(
          `${BASE_URL}/users/changepassword`,
          studentChangePasswordPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*'
            }
          },
        );

        const studentChangePasswordResponse = studentChangePasswordRequest.data;

        alert(studentChangePasswordResponse.message);

        if (studentChangePasswordResponse.status) navigate('/dashboard/home');

      } catch (err) {
        alert(err.message);
      }

    } else {
      alert("Password tidak sama!");
    }

  };

  return (
    <Flex flexDir="column" maxW="477px" gap="24px">
      <AuthFormControl
        label="Email"
        type="email"
        placeholder="Email kamu"
        ref={emailField}
      />
      <AuthFormControl
        label="Kata Sandi Baru"
        type="password"
        placeholder="Buat kata sandi baru kamu"
        ref={passwordField}
      />
      <AuthFormControl
        label="Konfirmasi Kata Sandi"
        type="password"
        placeholder="Buat kata sandi baru kamu"
        ref={confirmPasswordField}
      />
      <AuthButton value="Simpan Perubahan" handleClick={onSubmit} />
    </Flex>
  );
};

export default AccountTabs;
