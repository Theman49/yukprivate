import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import AuthLayout from '../../layouts/AuthLayout';
import Student from '../../assets/images/Student.png';
import Tentor from '../../assets/images/Tentor.png';
import Role from '../../features/auth/components/Role';
import { useSelector } from "react-redux";

const Roles = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }


    return (
        <AuthLayout>
            <Flex
                flexDir="column"
                gap="32px"
                fontWeight={600}
            >
                <Box>
                    <Text fontSize="4xl">
                        Terimakasih telah bergabung! Tentukan role Kamu disini
                    </Text>
                </Box>

                <Flex
                    justifyContent="space-between"
                >
                    <Role src={Student} text="Student"/>
                    <Role src={Tentor} text="Tentor"/>
                </Flex>
            </Flex>
        </AuthLayout>
    );
};

export default Roles;