import React from 'react';
import { Container, Flex, Link } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo/Logo.svg';

const NavbarAuth = () => {
    return (
        <Flex 
            w="100%"
            // pos="fixed" 
            justifyContent="space-between"
            bg="white"
            boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
            zIndex={300}
        >
            <Container 
                maxW="80%"
            >
                <Link
                    as={LinkRouter}
                    to="/"
                >
                    <Logo />
                </Link>
            </Container>
        </Flex>
    )
}

export default NavbarAuth;