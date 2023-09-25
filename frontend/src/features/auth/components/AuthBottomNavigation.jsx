import React from 'react';
import Back from './Back';
import AuthButton from './AuthButton';
import { Flex, Box, Link } from '@chakra-ui/react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';

const AuthBottomNavigation = ({valueButton="Selanjutnya", handleSubmit=null, hasSkipped=false, to=""}) => {
    const navigate = useNavigate();
    if(hasSkipped){
        return (
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Back />
                </Box>

                <Box>
                    <Link as={LinkRouter} to={to} color="#475467">Lewati</Link>
                </Box>

                <Box w="30%">
                    <AuthButton value={valueButton} handleClick={() => navigate(to)}/>
                </Box>
            </Flex>

        );
    }else{
        return (
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Back />
                </Box>

                <Box w="30%">
                    <AuthButton value={valueButton} handleClick={handleSubmit}/>
                </Box>
            </Flex>

        );
    }
}

export default AuthBottomNavigation;