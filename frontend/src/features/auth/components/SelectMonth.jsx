import React, {forwardRef} from 'react';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';

const SelectMonth = forwardRef(({label, placeholder, defaultValue=""}, ref) => {
    let months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ];

    return (
        <FormControl>
            <FormLabel fontWeight={600}>{label}</FormLabel>

            <Select placeholder={placeholder} borderColor="#D0D5DD" color="#667085" ref={ref}>
                {months.map((item, index) => {
                    const value = item.substring(0,3)
                    return (
                        <option key={index} value={value} selected={defaultValue == value ? true : false}>{item}</option>
                    )
                })}
            </Select>
        </FormControl>
    )
})

export default SelectMonth;