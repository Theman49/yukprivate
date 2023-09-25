import React, { forwardRef, createRef, useState } from 'react';
import { Flex, Text, Button, Box, Link, NumberInput, NumberInputField } from '@chakra-ui/react';
import { Link as LinkRouter, Navigate, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../../layouts/AuthLayout";
import AuthButton from '../../features/auth/components/AuthButton';
import AuthFormControl from "../../features/auth/components/AuthFormControl";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {login} from '../../redux/authSlice';

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


const Verification = () => {
    const dispatch = useDispatch();

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    const userData = {...user}


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

                const token = localStorage.getItem('token');

                const userToVerificationEmail = {
                    email: user.email,
                    otp: OTP
                };

                const verifyRequest = await axios.put(
                    `${BASE_URL}/register/verify`,
                    userToVerificationEmail,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Access-Control-Allow-Origin': '*'
                        }
                    });

                const verifyResponse = verifyRequest.data;

                alert(verifyResponse.message);

                if (verifyResponse.status){
                    userData.isVerifiedEmail = true
                    dispatch(login({
                        token: token,
                        role: isRole,
                        user: userData
                    }))
                    navigate('/roles');
                } 
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

            const token = localStorage.getItem('token');

            const userToResendOTPPayload = {
                email: user.email
            }

            const resendOTPRequest = await axios.put(
                `${BASE_URL}/register/verify/resend`,
                userToResendOTPPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

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
                    >Kami telah mengiirm email ke {user.email} untuk verifikasi. Segera cek email kamu dan masukkan kode verifikasi dibawah ini!</Text>
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

export default Verification;