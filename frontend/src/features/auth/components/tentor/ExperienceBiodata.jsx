import React, { useEffect, useState, createRef, useRef } from 'react';
import { Flex, Box, Checkbox } from '@chakra-ui/react';
import AuthFormControl from '../AuthFormControl';
import AuthBottomNaviation from '../AuthBottomNavigation';
import AuthButton from '../AuthButton';
import SelectYear from '../SelectYear';
import SelectMonth from '../SelectMonth';
import axios from 'axios';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ExperienceBiodata = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    const teaching_place = createRef();
    const teaching_role = createRef();
    const start_month = createRef();
    const start_year = createRef();
    const end_month = createRef();
    const end_year = createRef();
    const isTeaching = useRef();

    const onSubmit = async() => {

        try{

            const token = localStorage.getItem('token');

            const userToExperiencePayload = {
                teaching_place: teaching_place.current.value,
                teaching_role: teaching_role.current.value,
                teaching_start_date: start_month.current.value + " " + start_year.current.value,
                teaching_end_date: end_month.current.value + " " + end_year.current.value,
                isTeaching: isTeaching.current.checked
            };

            const experienceRequest = await axios.post(
                `${BASE_URL}/tentors/biodata/4`,
                userToExperiencePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );

            const experienceResponse = experienceRequest.data;

            alert(experienceResponse.message);
            
        }catch(e){
            alert(e.message);
        }
    }
    return (
        <>
            <Flex flexDir="column" gap="24px">
                <AuthFormControl type="text" label="Pernah mengajar dimana?" placeholder='Misal: SMP N 2 Semarang' ref={teaching_place}/>
                <AuthFormControl type="text" label="Sebagai apa?" placeholder='Misal: Guru Bahasa Inggris' ref={teaching_role}/>
                <Flex justifyContent="space-between" gap="10px">
                    <Box w="full">
                        <SelectMonth label="Tanggal mulai mengajar" placeholder="Bulan" ref={start_month}/>                
                    </Box>
                    <Box display="flex" flexDir="column" alignItems="end" w="full">
                        <Checkbox defaultChecked fontSize="8px" ref={isTeaching}>Saya masih mengajar disini</Checkbox>
                        <SelectYear placeholder="Tahun" ref={start_year}/>
                    </Box>
                </Flex>
                <Flex justifyContent="space-between" alignItems="flex-end" gap="10px">
                    <Box w="full">
                        <SelectMonth label="Tanggal akhir mengajar" placeholder="Bulan" ref={end_month}/>                
                    </Box>
                    <Box w="full">
                        <SelectYear placeholder="Tahun" ref={end_year}/>
                    </Box>
                </Flex>
                <Flex justifyContent="end">
                    <Box w="20%">
                        <AuthButton value="Simpan" size="sm" handleClick={onSubmit}/>
                    </Box>
                </Flex>
            </Flex>
            <AuthBottomNaviation hasSkipped to="/tentor/fifth" />
        </>
    );
};

export default ExperienceBiodata;