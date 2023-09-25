import React, { useEffect, useState, createRef } from 'react';
import AuthFormControl from '../AuthFormControl';
import AuthBottomNavigation from '../AuthBottomNavigation';
import SelectYear from '../SelectYear';
import axios from 'axios';
import { Flex } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const client = axios.create({
    baseURL: BASE_URL
})

const LastEducationBiodata = () => {
    
    let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth');
        isRole = localStorage.getItem('role');
        token = localStorage.getItem('token');
        user = JSON.parse(localStorage.getItem('user'));
    }

    const navigate = useNavigate();

    const last_education = createRef();
    const institution_name = createRef();
    const tentor_major = createRef();
    const graduation_year = createRef();

    const onSubmit = async() => {

        try{

            const userToFillEducationPayload = {
                last_education: last_education.current.value,
                institution_name: institution_name.current.value,
                tentor_major: tentor_major.current.value,
                graduation_year: graduation_year.current.value,
            };

            const educationRequest = await axios.put(
                `${BASE_URL}/tentors/biodata/3`,
                userToFillEducationPayload,
                {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Access-Control-Allow-Origin': '*'
                        }
                }
            );

            const educationResponse = educationRequest.data;

            alert(educationResponse.message);

            if (educationResponse.status) navigate('/tentor/fourth');

        } catch(e) {
            alert(e.message)
        }
    }

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/last-education`).then((response) => {
            setData(response.data);
        });
        async function getData() {
            const response = await client.get('/last-education');
            setData(response.data);
        }
        getData();
    }, []);

    return (
        <>
            <Flex
                flexDir="column"
                gap="24px"
            >
                <AuthFormControl 
                    label="Pendidikan Saat Ini" 
                    type="select" 
                    placeholder="--Pendidikan Saat Ini--" 
                    ref={last_education}
                    options={data != null ? data.data.map((item) => item.text) : []} 
                    values={data != null ? data.data.map((item) => item.value) : []} 
                />
                <AuthFormControl label="Sekolah/Universitas/Instansi" type="text" placeholder="Masukkan nama sekolah/universitas/instansi Kamu" ref={institution_name}/>
                <AuthFormControl label="Jurusan/Prodi" type="text" placeholder="Sebutkan jurusan/prodi kamu" ref={tentor_major}/>
                <SelectYear label="Tahun Lulus" placeholder="--Tahun Lulus--" ref={graduation_year}/>
            </Flex>
            <AuthBottomNavigation handleSubmit={onSubmit}/>
        </>
    );
}

export default LastEducationBiodata;