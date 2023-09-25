import React, { useEffect, useState, createRef } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import AuthFormControl from '../AuthFormControl';
import AuthBottomNavigation from '../AuthBottomNavigation';
import AuthButton from '../AuthButton';
import InputFile from '../InputFile';
import FormControlTextarea from '../FieldTextarea';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProposalBiodata = () => {

    const navigate = useNavigate();
    
    let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        token = localStorage.getItem('token')
        user = JSON.parse(localStorage.getItem('user'))
    }

    const tentor_introduction = createRef();
    const reason_for_registering = createRef();
    const url_esay = createRef();

    const onSubmit = async() => {

        const file = url_esay.current.files[0];

        if (file && (file.type).split('/')[1] === "pdf") {

            try{

                const userToProposalPayload = new FormData();

                userToProposalPayload.append('tentor_introduction', tentor_introduction.current.value);
                userToProposalPayload.append('reason_for_registering', reason_for_registering.current.value);
                userToProposalPayload.append('url_esay', file);

                const proposalRequest = await axios.post(
                    `${BASE_URL}/tentors/biodata/6`,
                    userToProposalPayload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                const proposalResponse = proposalRequest.data;

                alert(proposalResponse.message);
                
                if (proposalResponse.status) navigate('/tentor/final');
            } catch(e) {
                alert(e.message);
            }
        }else{
            alert("Dokumen harus bertipe PDF");
        }
    };

    return (
        <>
            <Flex flexDir="column" gap="24px">
                <FormControlTextarea label="Ceritakan dirimu disini!" placeholder="Beritahu Kami tentang dirimu, tujuanmu dan sesuatu yang kamu sukai" ref={tentor_introduction}/>            
                <AuthFormControl type="text" label="Apa alasan Kamu menjadi Tentor?" placeholder='Ceritakan kenapa Kamu ingin menjadi Tentor' ref={reason_for_registering}/>
                <InputFile label="Unggah CV Disini" ref={url_esay}/>
            </Flex>
            <AuthBottomNavigation handleSubmit={onSubmit} />
        </>
    );
};

export default ProposalBiodata;