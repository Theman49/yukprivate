import React from 'react';
import FormFinal from '../../../features/auth/components/student/FormFinal';
import AuthBiodataLayout from '../../../layouts/AuthBiodataLayout';
import { useSelector } from "react-redux";

const BiodataSecondSection = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }
    
    return (
        <AuthBiodataLayout 
            role="student"
            section={3}
            text="Langkah terakhir! Lengkapi pendidikan kamu saat ini"
            valueButton="Submit"
        >
            <FormFinal />
        </AuthBiodataLayout>
    );
}

export default BiodataSecondSection;