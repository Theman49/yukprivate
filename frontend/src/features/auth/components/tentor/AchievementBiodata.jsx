import React, { useEffect, useState, createRef } from 'react';
import { Flex, Box, Checkbox } from '@chakra-ui/react';
import AuthFormControl from '../AuthFormControl';
import AuthBottomNavigation from '../AuthBottomNavigation';
import AuthButton from '../AuthButton';
import SelectYear from '../SelectYear';
import SelectMonth from '../SelectMonth';
import InputFile from '../InputFile';
import axios from 'axios';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AchievementBiodata = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    const achievement_name = createRef();
    const organizer_name = createRef();
    const start_month = createRef();
    const start_year = createRef();
    const url_certificate = createRef();

    const onSubmit = async() => {

        const file = url_certificate.current.files[0];

        if (file && (file.type).split('/')[1] === "pdf") {

            const token = localStorage.getItem('token');

            try{

                const userToAchievementPayload = new FormData();

                userToAchievementPayload.append('achievement_name', achievement_name.current.value);
                userToAchievementPayload.append('organizer_name', organizer_name.current.value);
                userToAchievementPayload.append('date_of_activity', start_month.current.value + " " + start_year.current.value);
                userToAchievementPayload.append('url_certificate', file);

                const achievementRequest = await axios.post(
                    `${BASE_URL}/tentors/biodata/5`,
                    userToAchievementPayload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                )

                const achievementResponse = achievementRequest.data;

                alert(achievementResponse.message);

            }catch(e){
                alert(e.message);
            }
        }else{
            alert("Dokumen harus bertipe PDF");
        }

    }
    return (
        <>
            <Flex flexDir="column" gap="24px">
                <AuthFormControl type="text" label="Prestasi" placeholder='Misal: Juara 1 Lomba Poster' ref={achievement_name}/>
                <AuthFormControl type="text" label="Penyelenggara" placeholder='Isi dengan nama peneyelenggara/institusi' ref={organizer_name}/>
                <Flex justifyContent="space-between" alignItems="flex-end" gap="10px">
                    <Box w="full">
                        <SelectMonth label="Tanggal Kegiatan" placeholder="Bulan" ref={start_month}/>                
                    </Box>
                    <Box w="full">
                        <SelectYear placeholder="Tahun" ref={start_year}/>
                    </Box>
                </Flex>
                <InputFile label="Unggah Sertifikat Disini" ref={url_certificate}/>
                <Flex justifyContent="end">
                    <Box w="20%">
                        <AuthButton value="Simpan" size="sm" handleClick={onSubmit}/>
                    </Box>
                </Flex>
            </Flex>
            <AuthBottomNavigation hasSkipped to="/tentor/six"/>
        </>
    );
};

export default AchievementBiodata;