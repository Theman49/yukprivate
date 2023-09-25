import React from 'react';
import AuthBiodataLayout from '../../../layouts/AuthBiodataLayout';
import ProposalBiodata from '../../../features/auth/components/tentor/ProposalBiodata';
import { useSelector } from "react-redux";

const ProposalBiodataSection = () => {

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    return (
        <AuthBiodataLayout 
            role="tentor"
            section={6}
            text="Hampir selesai! Bagaimana cara Kamu mengenalkan dirimu?"
        >
            <ProposalBiodata />
        </AuthBiodataLayout>
    );
}

export default ProposalBiodataSection;