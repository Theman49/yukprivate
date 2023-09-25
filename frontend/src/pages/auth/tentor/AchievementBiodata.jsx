import React from 'react';
import AuthBiodataLayout from '../../../layouts/AuthBiodataLayout';
import AchievementBiodata from '../../../features/auth/components/tentor/AchievementBiodata';
import { useSelector } from "react-redux";

const AchievementBiodataSection = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    return (
        <AuthBiodataLayout 
            role="tentor"
            section={5}
            text="Kamu pernah mengajar dimana saja?"
            hasSkippedNav
            next="/tentor/six"
        >
            <AchievementBiodata />
        </AuthBiodataLayout>
    );
}

export default AchievementBiodataSection;