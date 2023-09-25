import React from 'react';
import AuthBiodataLayout from '../../../layouts/AuthBiodataLayout';
import FormFirstSection from '../../../features/auth/components/FormFirstSection';
import { useSelector } from "react-redux";

const BiodataFirstSection = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    return (
        <AuthBiodataLayout
            role="tentor"
            section={1}
            text={`Halo ${user.name} 👋 Kami ingin mengenalmu lebih dekat`}
        >
            <FormFirstSection />
        </AuthBiodataLayout>
    );
}

export default BiodataFirstSection;