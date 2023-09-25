import React, {forwardRef} from 'react';
import { MdUploadFile } from 'react-icons/md';
import { Box, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';


const InputFile = forwardRef(({label, type="pdf", defaultValue=""}, ref) => {
    const [file, setFile] = useState('');
    const [getDefaultValue, setGetDefaultValue] = useState(defaultValue)

    const handleClick = () => {
        const file = document.getElementById('file');
        file.click();
    }

    const handleChange = (e) => {
        const value = e.target.value
        const splitedValue = value.split("\\")
        if(type == 'pdf'){
            if(e.target.files[0].type.split('/')[1] != 'pdf'){
                alert('Format File harus PDF')
                e.target.value = ''
                setFile('')
                return
            }
        }else{
            if(e.target.files[0].type.split('/')[0] != 'image'){
                alert('Format File harus JPG/PNG')
                e.target.value = ''
                setFile('')
                return
            }
        }
        setGetDefaultValue("")
        setFile(splitedValue.pop())    
    }
    return (
        <FormControl>
            <FormLabel fontWeight={600}>{label}</FormLabel>
                <Box 
                    display="flex" 
                    flexDir="column" 
                    alignItems="center" 
                    gap="4px" 
                    color="#667085" 
                    p="38px"
                    border="1px dashed #667085"
                    mb={3}
                    _hover={{cursor: "pointer"}}
                    onClick={handleClick}
                >
                    <MdUploadFile size={40}></MdUploadFile>
                    {getDefaultValue != "" ?
                        <Text>{getDefaultValue}</Text>
                        :
                        file ? 
                            <Text>{file}</Text>
                            :
                            <Text fontSize="md">Unggah dalam format {type != 'pdf' ? "JPG/PNG" : "PDF"}</Text>
                     }
                    
                </Box>
            <Input type="file" id="file" display="none" ref={ref} onChange={handleChange}/>
        </FormControl>
    )
})

export default InputFile;