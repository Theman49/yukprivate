import React, { createRef } from 'react';
import { Flex } from '@chakra-ui/react';
import AuthFormControl from '../AuthFormControl';
import AuthBottomNavigation from '../AuthBottomNavigation';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const FormFinal = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }
    
    const navigate = useNavigate();

    const school_name = createRef();
    const student_class = createRef();
    const school_major = createRef();

    const onSubmit = async() => {

        const token = localStorage.getItem('token');

        try{

            const userToFillEducationPayload = {
                school_name: school_name.current.value,
                student_class: student_class.current.value,
                school_major: school_major.current.value,
            }

            const request = await axios.put(
                `${BASE_URL}/students/biodata/3`, 
                userToFillEducationPayload,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*'
                }
            })

            const response = request.data
            alert(response.message)
            navigate('/')
        }catch(e){
            alert(e.message);
        }
    }
    return (
        <>
            <Flex flexDir="column" gap="24px">
                <AuthFormControl type="text" label="Asal Sekolah" placeholder="Masukkan nama sekolah Kamu" ref={school_name}/>        
                <AuthFormControl type="select" label="Kelas" placeholder="--Pilih Kelas--" 
                    options={[
                        '10',
                        '11',
                        '12',
                    ]}
                    values={[
                        '10',
                        '11',
                        '12'
                    ]} 
                    ref={student_class}
                />
                <AuthFormControl type="select" label="Jurusan" placeholder="--Pilih Jurusan--" 
                    options={[
                        'IPA',
                        'IPS',
                        'BAHASA',
                    ]}
                    values={[
                        'ipa',
                        'ips',
                        'bahasa'
                    ]}
                    ref={school_major}
                />
            </Flex>
            <AuthBottomNavigation handleSubmit={onSubmit} valueButton="Selesai" />
        </>
    );
};

export default FormFinal;