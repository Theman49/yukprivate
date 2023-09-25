import React, { useState, useRef, createRef } from 'react';
import { Flex, FormControl, FormLabel, Checkbox, CheckboxGroup, useCheckboxGroup, Box, Text, Grid, GridItem, Input, useCheckbox } from '@chakra-ui/react';
import AuthBottomNavigation from '../AuthBottomNavigation';
import SelectDay from '../SelectDay';
import SelectDuration from '../SelectDuration';
import { MdAdd } from 'react-icons/md';
import CustomCheckbox from '../CustomCheckbox';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const courses = [
    {
        text: "Matematika",
        value: 'Matematika'
    },
    {
        text: "Fisika",
        value: 'Fisika'
    },
    {
        text: "Kimia",
        value: 'Kimia'
    },
    {
        text: "Bahasa Inggris",
        value: 'Bahasa Inggris'
    }
]

const generateValueCheckbox = (checkedItems, value) => {
    let result = []
    for(let i=0; i<checkedItems.length; i++){
        if(checkedItems[i] == true){
            result.push(value[i])
        }
    }
    return result.join(',')
}


const FormFinal = () => {

    const navigate = useNavigate();
    
    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    const [preference, setPreference] = useState([true, true])
    const { value, getCheckboxProps } = useCheckboxGroup({
        defaultValue: ['Matematika']
    })
    const dayField = createRef();
    const timeField = useRef();
    const durationField = createRef();

    const onSubmit = async() => {

        console.log(
            dayField.current.value,
            timeField.current.value,
            durationField.current.value,
            value.join(','),
            generateValueCheckbox(preference, ['online', 'offline'])
        );

        try{

            const token = localStorage.getItem('token');

            const userToSchedulePayload = {
                day: dayField.current.value,
                time: timeField.current.value,
                duration: durationField.current.value
            };

            const scheduleRequest = await axios.post(
                `${BASE_URL}/tentors/biodata/7Schedule`,
                userToSchedulePayload, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': '*'
                    }
            });

            const scheduleResponse = scheduleRequest.data;

            alert(scheduleResponse.message);

        } catch(e) {
            alert(e.message);
        }
    }

    const onFinish = async() => {

        try{

            const token = localStorage.getItem('token');

            const userToCoursePayload = {
                course_interest: value.join(','),
                preferences: generateValueCheckbox(preference, ['offline', 'online'])
            };
            
            console.log(userToCoursePayload)

            const courseRequest = await axios.put(
                `${BASE_URL}/tentors/biodata/finish`,
                userToCoursePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );

            const courseResponse = courseRequest.data;

            alert(courseResponse.message);

            if (courseResponse.status) navigate('/');

        } catch(err) {
            alert(err.message);
        }
    };

    return (
        <>
            <Flex flexDir="column" gap="24px">
                <FormControl>
                    <FormLabel fontWeight={600}>Preferensi Mengajar</FormLabel>

                    <CheckboxGroup>
                        <Flex justifyContent="space-between" w="40%">
                            <Box>
                                <Checkbox defaultChecked isChecked={preference[0]} onChange={(e) => setPreference([e.target.checked, preference[1]])}>Tatap Muka</Checkbox>
                            </Box>
                            <Box>
                                <Checkbox defaultChecked isChecked={preference[1]} onChange={(e) => setPreference([preference[0], e.target.checked])}>Daring</Checkbox>
                            </Box>
                        </Flex>
                    </CheckboxGroup>
                </FormControl>

                <Box w="80%">
                    <Box mb="16px">
                        <Text fontSize="md" fontWeight={500}>Pilih Mata Pelajaran Sesuai Minta Kamu</Text>
                        <Text color="#667085" fontSize="12px">Kamu bisa memilih lebih dari 1 mapel</Text>
                    </Box>

                    <Grid templateColumns="repeat(2, 1fr)" gap="16px">
                        {courses.map((item, index) => {
                            return (
                                <CustomCheckbox {...getCheckboxProps({ value: item.value, text: item.text, key: index })} />
                            )
                        })}
                    </Grid>
                </Box>

                <Box>
                    <Box mb="16px">
                        <Text fontSize="md" fontWeight={500}>Sesuaikan Jadwal Mengajar Kamu</Text>
                    </Box>

                    <Flex justifyContent="space-between" gap="32px" w="80%">
                        <FormControl>
                            <FormLabel>Hari</FormLabel>
                            <SelectDay ref={dayField}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Waktu</FormLabel>
                            <Input type="time" borderColor="#D0D5DD" ref={timeField}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Durasi</FormLabel>
                            <SelectDuration ref={durationField}/>
                        </FormControl>
                    </Flex>
                </Box>

                <Flex 
                    justifyContent="center" 
                    p="16px" 
                    border="1px dashed #98A2B3" 
                    borderRadius="4px" 
                    color="#323232" 
                    _hover={{cursor: "pointer"}}
                    onClick={onSubmit}
                >
                    <MdAdd size={24}></MdAdd>
                </Flex>
            </Flex>
            <AuthBottomNavigation valueButton="Selesai" handleSubmit={onFinish}/>
        </>
    );
};

export default FormFinal;