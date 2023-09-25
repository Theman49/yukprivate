import React from 'react';
import AuthBiodataLayout from '../../../layouts/AuthBiodataLayout';
import FormSecondSection from '../../../features/auth/components/FormSecondSection';
import { useSelector } from "react-redux";

const AddressBiodata = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    return (
        <AuthBiodataLayout 
            role="student"
            section={2}
            text="Beritahu Kami alamat lengkapmu"
        >
            <FormSecondSection />
        </AuthBiodataLayout>
    );
}

export default AddressBiodata;