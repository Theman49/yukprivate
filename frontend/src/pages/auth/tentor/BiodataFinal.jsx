import React from 'react';
import AuthBiodataLayout from '../../../layouts/AuthBiodataLayout';
import BiodataFinal from '../../../features/auth/components/tentor/BiodataFinal';
import { useSelector } from "react-redux";

const FinalBiodataSection = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    return (
        <AuthBiodataLayout 
            role="tentor"
            section={7}
            text="Form terakhir! Sesuaikan Jadwal dan Mapel Kamu"
            valueButton="Submit"
        >
            <BiodataFinal />
        </AuthBiodataLayout>
    );
};

export default FinalBiodataSection;