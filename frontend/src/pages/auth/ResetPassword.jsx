import React, { createRef } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/react";
import AuthLayout from "../../layouts/AuthLayout";
import AuthFormControl from "../../features/auth/components/AuthFormControl";
import AuthButton from '../../features/auth/components/AuthButton';
import Back from '../../features/auth/components/Back';
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ResetPassword = () => {

    const navigate = useNavigate();

    const passwordField = createRef();
    const confirmPasswordField = createRef();

    const onSubmit = async () => {

        if (passwordField.current.value === confirmPasswordField.current.value) {

            try {

                const userToResetPasswordPayload = {
                    password: passwordField.current.value,
                    otp: localStorage.getItem('otp')
                };

                const resetPasswordRequest = await axios.put(
                    `${BASE_URL}/resetpassword`,
                    userToResetPasswordPayload
                );

                const resetPasswordResponse = resetPasswordRequest.data;
        
                alert(resetPasswordResponse.message); 

                if (resetPasswordResponse.status) {
                    
                    localStorage.clear();
                    
                    navigate('/login');

                }

                passwordField.current.value =
                confirmPasswordField.current.value =
                    "";
                
            } catch (err) {
                alert(e.message);
            }
        
        } else {
            alert("Password tidak sama!");
        }

    }

    return (
        <AuthLayout>
            <Flex
                flexDir="column"
                gap="32px"
            >
                <Box display="flex" gap="16px" flexDir="column">
                    <Back />

                    <Box>
                        <Text
                            fontSize="4xl"
                            fontWeight="500"
                        >Buat Kata Sandi Baru</Text>
                        <Text
                            color="#667085"
                        >Buat kata sandi yang rumit tetapi mudah diingat</Text>
                    </Box>
                </Box>

                <Box>
                    <Flex
                        flexDir="column"
                        gap="24px"
                        mb="16px"
                    >
                        <AuthFormControl label="Buat Kata Sandi" type="password" placeholder="Buat kata sandi kamu" ref={passwordField} />
                        <AuthFormControl label="Konfirmasi Kata Sandi" type="password" placeholder="Ulangi kata sandi yang kamu buat" ref={confirmPasswordField} />
                    </Flex>

                    <AuthButton value="Atur Ulang Kata Sandi" handleClick={onSubmit} />
                </Box>

            </Flex>
        </AuthLayout>
    )
}

export default ResetPassword;