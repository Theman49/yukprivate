import React from 'react';
import { Flex } from '@chakra-ui/react';
import AuthLayout from './AuthLayout';
import AuthBottomNavigation from '../features/auth/components/AuthBottomNavigation';
import TitleProgress from '../features/auth/components/TitleProgress';

const AuthBiodataLayout = ({children, role, section, text, valueButton, hasSkippedNav=false, next=""}) => {
    return (
        <AuthLayout>
            <Flex flexDir="column" gap="36px" >
                <TitleProgress role={role} section={section} text={text}/>
                {children}
                {/* <AuthBottomNavigation valueButton={valueButton} hasSkipped={hasSkippedNav} to={next}/> */}
            </Flex>
        </AuthLayout>
    );
}

export default AuthBiodataLayout;