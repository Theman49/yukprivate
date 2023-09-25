import React, {forwardRef} from 'react';
import { Select } from '@chakra-ui/react';

const durations = [
    {
        text: "1 Jam",
        value: "1"
    },
    {
        text: "1.5 Jam",
        value: "1.5"
    },
    {
        text: "2 Jam",
        value: "2"
    }
]

const SelectDuration = forwardRef(({defaultValue=1, className=""}, ref) => {
    return (
        <Select borderColor="#D0D5DD" className={className} ref={ref}>
            {durations.map((item, index) => {
                return (
                    <option key={index} value={item.value} selected={item.value == defaultValue ? true : false}>{item.text}</option>
                )
            })}
        </Select>
    )
})

export default SelectDuration;