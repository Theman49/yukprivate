import React, { createRef, useState } from 'react';
import AuthFormControl from './AuthFormControl';
import AuthBottomNavigation from './AuthBottomNavigation';
import { Flex } from '@chakra-ui/react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../../../redux/authSlice';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const FormFirstSection = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const params = useLocation();
    const rolePage = (params.pathname).split('/')[1];

    const username = createRef();
    const gender = createRef();
    const date_of_birth = createRef();
    const no_handphone = createRef();

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

    let { token, isAuth, role: isRole, user } = useSelector((state) => state.auth);

    if (!isAuth) {
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        token = localStorage.getItem("token");
        user = JSON.parse(localStorage.getItem('user'))
    }

    const userData = { ...user };

    const onSubmit = async () => {

        const userToFillBioPayload = {
            username: username.current.value,
            gender: gender.current.value,
            date_of_birth: date_of_birth.current.value,
            no_handphone: no_handphone.current.value,
            role: rolePage
        };

        try {
            const fillBioRequest = await axios.post(
                `${BASE_URL}/${rolePage}s/biodata/1`,
                userToFillBioPayload, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const fillBioResponse = fillBioRequest.data;

            alert(fillBioResponse.message);

            if (fillBioResponse.status) {

                userData.role = rolePage

                dispatch(login({
                    token: token,
                    role: rolePage,
                    user: userData
                }))

                navigate(`/${rolePage}/second`);
            }
        } catch (err) {
            alert(err.message);

            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

    return (
        <>
            <Flex
                flexDir="column"
                gap="24px"
            >
                <AuthFormControl label="Username" type="email" placeholder="Buat username Kamu" ref={username} />
                <AuthFormControl
                    label="Jenis Kelamin"
                    type="select"
                    placeholder="--Pilih Jenis Kelamin--"
                    options={['Laki Laki', 'Perempuan']}
                    values={["laki-laki", "perempuan"]}
                    ref={gender}
                />
                <AuthFormControl
                    label="Tanggal Lahir"
                    type="date"
                    placeholder="MM/DD/YYYY"
                    ref={date_of_birth}
                />
                <AuthFormControl label="Nomor Telepon" type="text" placeholder="Cth. 628123456789" ref={no_handphone} />
            </Flex>
            <AuthBottomNavigation handleSubmit={onSubmit} />
        </>
    );
};

export default FormFirstSection;