import React, {forwardRef} from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

const SelectYear = forwardRef(({label="", placeholder, defaultValue=""}, ref) => {
    let graduationYear = [];
    const currentYear = new Date().getFullYear();

    for(let i=1990; i<=currentYear; i++){
        graduationYear.push(i.toString())
    }

    return (
        <FormControl>
            <FormLabel fontWeight={600}>{label}</FormLabel>
            <Select placeholder={placeholder} borderColor="#D0D5DD" color="#667085" ref={ref}>
                {graduationYear.map((item, index) => {
                    return (
                        <option key={index} value={item} selected={item == defaultValue ? true : false}>{item}</option>
                    )
                })}
            </Select>
        </FormControl>
    )
})

export default SelectYear;