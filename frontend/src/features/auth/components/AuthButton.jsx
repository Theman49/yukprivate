import React from 'react';
import { Button, Text } from '@chakra-ui/react'; 

const AuthButton = ({value, size="xl", handleClick}) => {
    return (
        <Button
            bg="#69D3CF"
            py="16px"
            w="full"
            color="white"
            size={size}
            onClick={handleClick}
        >
            {value}
        </Button>
    )
}

export default AuthButton;