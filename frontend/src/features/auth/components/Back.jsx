import React from 'react';
import { Text } from '@chakra-ui/react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const handleBack = () => {
    history.go(-1);
}

const Back = () => {
    return (
        <Text
            display="flex"
            _hover={{cursor: "pointer"}}
            onClick={handleBack}
            w="fit-content"
        >
            <MdKeyboardArrowLeft size={25}></MdKeyboardArrowLeft>
            <Text>
                Kembali
            </Text>
        </Text>
    )
}

export default Back;