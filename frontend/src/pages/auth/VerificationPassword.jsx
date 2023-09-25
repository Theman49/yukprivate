import React, { forwardRef, createRef, useState } from 'react';
import { Flex, Text, Button, Box, Link, NumberInput, NumberInputField } from '@chakra-ui/react';
import { Link as LinkRouter, Navigate, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../../layouts/AuthLayout";
import AuthButton from '../../features/auth/components/AuthButton';
import AuthFormControl from "../../features/auth/components/AuthFormControl";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const FieldOtp = forwardRef((props, ref) => {
    return (
        <NumberInput
            as={Flex}
            justifyContent="center"
        >
            <NumberInputField
                h="100px"
                textAlign="center"
                p={0}
                fontWeight={600}
                fontSize="4xl"
                borderRadius="8px"
                borderColor="brand.500"
                ref={ref}
            ></NumberInputField>
        </NumberInput>
    )
});


const VerificationPassword = () => {

    const navigate = useNavigate();

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

    const first = createRef();
    const second = createRef();
    const third = createRef();
    const fourth = createRef();


    const onSubmit = async (e) => {

        e.preventDefault();

        try {

            const OTP = first.current.value + second.current.value + third.current.value + fourth.current.value;

            if (OTP.length != 4) {
                alert('OTP tidak lengkap');
            } else {

                const email = localStorage.getItem('email');

                const newOTP = localStorage.setItem('otp', OTP);

                const userToVerificationPasswordPayload = {
                    email: email,
                    otp: OTP
                };

                const verifyRequest = await axios.put(
                    `${BASE_URL}/forgotpassword/verify`,
                    userToVerificationPasswordPayload
                );

                const verifyResponse = verifyRequest.data;

                alert(verifyResponse.message);

                if (verifyResponse.status)  navigate('/reset-password');
            }
            
        } catch (err) {
            const response = err.response.data;
            alert(response.message);

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

    const onResend = async (e) => {

        e.preventDefault();

        try {

            const email = localStorage.getItem('email');

            const userToResendOTPPayload = {
                email: email
            };

            console.log(userToResendOTPPayload)

            const resendOTPRequest = await axios.put(
                `${BASE_URL}/forgotpassword/verify/resend`,
                userToResendOTPPayload
            );

            console.log(resendOTPRequest)

            const resendOTPResponse = resendOTPRequest.data;

            alert(resendOTPResponse.message);

        } catch (err) {
            const response = err.response.data;
            alert(response.message);

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
                gap="60px"
            >
                <Box>
                    <Text
                        fontSize="4xl"
                        fontWeight="500"
                    >Verifikasi Email</Text>
                    <Text
                        color="#667085"
                    >Kami telah mengiirm email ke {localStorage.getItem('email')} untuk verifikasi. Segera cek email kamu dan masukkan kode verifikasi dibawah ini!</Text>
                </Box>

                <Box>
                    <Flex
                        gap="40px"
                        w="85%"
                        marginInline="auto"
                    >
                        <FieldOtp ref={first}></FieldOtp>
                        <FieldOtp ref={second}></FieldOtp>
                        <FieldOtp ref={third}></FieldOtp>
                        <FieldOtp ref={fourth}></FieldOtp>
                    </Flex>
                </Box>

                <Box>
                    <AuthButton value="Verifikasi" handleClick={onSubmit} />

                    <Text
                        textAlign="center"
                        mt="16px"
                    >
                        Belum menerima kode?<br />
                        <Link
                            // as={LinkRouter}
                            // to="/verification"
                            color="brand.500"
                            onClick={e => onResend(e)}
                        >
                            Kirim Ulang
                        </Link>
                        <span
                            style={{
                                marginLeft: "2px"
                            }}
                        >03:21</span>
                    </Text>
                </Box>


            </Flex>
        </AuthLayout>
    );
};

export default VerificationPassword;