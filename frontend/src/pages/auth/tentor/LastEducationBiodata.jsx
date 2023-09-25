import React from 'react';
import AuthBiodataLayout from '../../../layouts/AuthBiodataLayout';
import FormEducation from '../../../features/auth/components/tentor/LastEducationBiodata';
import { useSelector } from "react-redux";

const  LastEducationBiodata = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth');
        isRole = localStorage.getItem('role');
        user = JSON.parse(localStorage.getItem('user'));
    }

    return (
        <AuthBiodataLayout
            role="tentor"
            section={3}
            text="Beritahu Kami latar belakang pendidikan Kamu ya"
        >
            <FormEducation />
        </AuthBiodataLayout>
    );
}

export default LastEducationBiodata;