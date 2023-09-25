import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import StepProgress from './StepProgress';

const TitleProgress = ({role, text, section}) => {
    let steps = null;
    if(role == 'student'){
        steps = 3        
    }else if(role == 'tentor') {
        steps = 7
    }
    return (
        <Flex flexDir="column" gap="16px">
            <Text fontSize="3xl" fontWeight="600">
                {text}   
            </Text>

            <StepProgress steps={steps} section={section}/>
        </Flex>
    )
}

export default TitleProgress;