import React from 'react';
import AuthBiodataLayout from '../../../layouts/AuthBiodataLayout';
import ExperienceBiodata from '../../../features/auth/components/tentor/ExperienceBiodata';
import { useSelector } from "react-redux";

const ExperienceBiodataSection = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    return (
        <AuthBiodataLayout 
            role="tentor"
            section={4}
            text="Kamu pernah mengajar dimana saja?"
            hasSkippedNav
            next="/tentor/fifth"
        >
            <ExperienceBiodata />
        </AuthBiodataLayout>
    );
}

export default ExperienceBiodataSection;