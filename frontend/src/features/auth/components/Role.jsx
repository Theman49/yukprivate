import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';

const Role = ({src, text }) => {
    let url = "";
    if(text.toLowerCase() == 'student'){
        url = '/student/first';
    }else if(text.toLowerCase() == 'tentor'){
        url = '/tentor/first'
    }

    return (
        <Flex
            as={LinkRouter}
            to={url}
            flexDir="column"
            gap="16px"
            alignItems="center"
            onClick={() => sessionStorage.setItem('role', text.toLowerCase())}
        >
            <Box>
                <Image src={src} />
            </Box>

            <Text fontSize="2xl">
                {text}
            </Text>
        </Flex>
    )
}

export default Role;