import React, {forwardRef} from 'react';
import { Select } from '@chakra-ui/react';

const days = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
]

const SelectDay = forwardRef(({defaultValue = "", className=""}, ref) => {
    return (
        <Select placeholder="Pilih Hari" borderColor="#D0D5DD" color="#667085" className={className} ref={ref}>
            {days.map((item, index) => {
                return (
                    <option key={index} value={item.toLowerCase()} selected={item.toLowerCase() == defaultValue.toLowerCase() ? true : false }>{item}</option>
                )
            })}
        </Select>
    )
})

export default SelectDay;