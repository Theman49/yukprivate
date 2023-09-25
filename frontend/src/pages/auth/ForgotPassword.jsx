import React, {createRef} from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import AuthFormControl from '../../features/auth/components/AuthFormControl';
import AuthButton from '../../features/auth/components/AuthButton';
import Back from '../../features/auth/components/Back';
import { Flex, Box, Text } from '@chakra-ui/react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ForgotPassword = () => {

    const navigate = useNavigate();

    const emailField = createRef();

    const onSubmit = async () => {

        try{
            
            const setEmail = localStorage.setItem('email', emailField.current.value);

            const userToForgotPasswordPayload = {
                email: emailField.current.value
            };

            const forgotPasswordRequest = await axios.put(
                `${BASE_URL}/forgotpassword`,
                userToForgotPasswordPayload
            );

            const forgotPasswordResponse = forgotPasswordRequest.data;

            alert(forgotPasswordResponse.message);

            if (forgotPasswordResponse.status) navigate("/verification-password");

        } catch (err) {
            alert(err.message);
        }
    };

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
                        >Lupa Kata Sandi?</Text>
                        <Text
                            color="#667085"
                        >Beri informasi untuk mengatur ulang kata sandi Kamu</Text>
                    </Box>
                </Box>

                <Box>
                    <Flex
                        flexDir="column"
                        gap="20px"
                    >
                        <AuthFormControl label="Email" type="email" placeholder="Masukkan email kamu" ref={emailField} />
                        <AuthButton value="Atur Ulang Kata Sandi" handleClick={onSubmit}/>
                    </Flex>
                </Box>

            </Flex>

        </AuthLayout>
    );
}

export default ForgotPassword;