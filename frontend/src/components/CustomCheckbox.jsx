import React from 'react';
import { chakra, useCheckbox, Text } from '@chakra-ui/react';

function CustomCheckbox(props) {
    const { state, getCheckboxProps, getInputProps } = useCheckbox(props)

    return (
        <chakra.label
        bg={state.isChecked ? 'brand.500': ""}
        color={state.isChecked ? 'white': ""}
        p="8px"
        borderRadius="4px"
        textAlign="center"
        fontWeight={400}
        border="1px solid #D0D5DD"
        _hover={{
            bg: "brand.500",
            color: "white",
            cursor: "pointer"
        }}
        >
        <input {...getInputProps()} hidden />
        <Text color="gray.700" {...getCheckboxProps}>{props.text}</Text>
        </chakra.label>
    )
}

export default CustomCheckbox;