import React, {forwardRef} from 'react';
import { FormControl, FormLabel, Textarea } from  '@chakra-ui/react';

const FormControlTextarea = forwardRef(({label, placeholder, defaultValue=""}, ref) => {
    return (
        <FormControl>
            <FormLabel fontWeight={600}>{label}</FormLabel>
            <Textarea placeholder={placeholder} h="150px" borderColor="#D0D5DD" defaultValue={defaultValue} ref={ref}/>
        </FormControl>
    )
});

export default FormControlTextarea;