import React, {forwardRef} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select
  } from '@chakra-ui/react'

const AuthFormControl = forwardRef(({label, type, disabled=false, placeholder="", options=[], values=[], handleClick=null, defaultValue=""}, ref) => {
    if(type == 'select'){
      return (
        <FormControl>
          <FormLabel fontWeight={600}>{label}</FormLabel>
          {/* <Input type={type} placeholder={placeholder} borderColor="#D0D5DD" size="lg"/> */}
          <Select onClick={handleClick} placeholder={placeholder} isDisabled={disabled} borderColor="#D0D5DD" color="#667085" bg={disabled ? "#EAECF0" : "white"} ref={ref}>
            {options.map((value, index) => {
              // const setValue = value.replace(" ", '_').toLowerCase();
              return defaultValue ? (
                <option key={index} value={values[index]} selected={values[index].toLowerCase().includes(defaultValue.toLowerCase()) ? true : false}>{value}</option>
              ) :
              (
                <option key={index} value={values[index]}>{value}</option>
              )
            })}
          </Select>
        </FormControl>
      )
    }else{
      return (
        <FormControl>
          <FormLabel fontWeight={600}>{label}</FormLabel>
          <Input type={type} placeholder={placeholder} borderColor="#D0D5DD" color="#667085" size="lg" ref={ref} defaultValue={defaultValue}/>
          {/* <FormHelperText>{helperText}</FormHelperText> */}
        </FormControl>
      )

    }
});

export default AuthFormControl;