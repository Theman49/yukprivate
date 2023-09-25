import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const GoogleButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLoginGoogleSuccess = async (credentialResponse) => {

        try {
        const userToLoginPayload = {
            google_credential: credentialResponse.credential,
        };

        const loginGoogleRequest = await axios.post(
            `${BASE_URL}/auth/login-google`,
            userToLoginPayload
        );

        const loginGoogleResponse = loginGoogleRequest.data;

        console.log(loginGoogleResponse);

        alert(loginGoogleResponse.message);

        if (loginGoogleResponse.status) {

            const token = loginGoogleResponse.data.token;

            const getCurrentUser = await axios.get(
            `${BASE_URL}/auth/me`,
            {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
                }
            }
            );

            const currentUser = getCurrentUser.data.data.current_user;

            dispatch(login({
                token: loginGoogleResponse.data.token,
                role: loginGoogleResponse.data.role,
                user: currentUser
                }))

                if (!currentUser.isVerifiedEmail) {
                navigate('/verification');
                }

                if (!currentUser.role) {
                navigate('/roles');
                } else {
                navigate('/');
                }
            }
        } catch (err) {
        console.log(err);
        }
    }

    return (
        <GoogleOAuthProvider 
            clientId="91634822664-348hrorr67bbrp2tcnnemg9cmepc3hki.apps.googleusercontent.com"
        >
            <GoogleLogin
                onSuccess={onLoginGoogleSuccess}
                onError={() => {
                console.log("Login Failed ):");
                }}
            />
        </GoogleOAuthProvider>
    )
}

export default GoogleButton;