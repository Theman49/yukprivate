import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Step = ({active}) => {
    return (
        <Box
            w="full"
            h="10px"
            borderRadius="20px"
            bg={active ? "brand.500" : "#D0D5DD"}
        ></Box>
    )
}

const StepProgress = ({steps, section}) => {
    let step = []
    for(let i=0; i<steps; i++){
        if(i < section){
            step.push(<Step key={i} active/>)
        } else {
            step.push(<Step key={i}/>)
        }
    }
    return (
        <Flex justifyContent="space-between" gap="15px">
            {step}
        </Flex>
    )
    
};

export default StepProgress;