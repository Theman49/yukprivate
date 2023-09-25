import React, { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import AuthFormControl from './AuthFormControl';
import AuthBottomNavigation from './AuthBottomNavigation';
import { Flex, Input, FormControl, Box, FormLabel } from '@chakra-ui/react';
import Map from './Map';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const FormSecondSection = () => {

    const navigate = useNavigate();

    const params = useLocation();
    const rolePage = (params.pathname).split('/')[1];

    const kecamatan = createRef("");
    const kelurahan = createRef("");
    const pin_point = createRef("");

    const [kec, setKec] = useState(null);
    const [kel, setKel] = useState(null);
    const [choosedKec, setChoosedKec] = useState("");

    let {isAuth, role: isRole, user} = useSelector((state) => state.auth);

    if(!isAuth){
        isAuth = localStorage.getItem('isAuth')
        isRole = localStorage.getItem('role')
        user = JSON.parse(localStorage.getItem('user'))
    }

    const onSubmit = async() => {
        
        try{

            const token = localStorage.getItem("token");

            const userAddAddressPayload = {
                'address': `${(kecamatan.current.value).split('_')[1]},${(kelurahan.current.value).split('_')[1]}`,
                'pin_point': pin_point.current.value,
            };

            // console.log(kecamatan.current.value, kelurahan.current.value, pin_point.current.value)
            const addressRequest = await axios.put(
                `${BASE_URL}/${rolePage}s/biodata/2`,
                userAddAddressPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            
            const addressResponse = addressRequest.data;
            
            alert(addressResponse.message);
            
            (rolePage == 'tentor' ? 
                navigate(`/${rolePage}/third`)
                :
                navigate(`/${rolePage}/final`)
            )
        }catch(err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        const getKecamatan = async() => {
            const response = await axios.get(
                'http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=3374'
            );
            const kecamatan = await response.data.kecamatan;
            setKec(kecamatan);
        };
        getKecamatan();
    }, []);


    useEffect(() => {
        const getKelurahan = async() => {
            const idKec = choosedKec.split('_')[0];
            const response = await axios.get(
                `http://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKec}`
            );
            setKel(response.data.kelurahan);
        };
        getKelurahan();
    }, [choosedKec])
    

    const handleClickKec = (event) => {
        setChoosedKec(event.target.value);
    };
    
    return (
        <>
            <Flex
                flexDir="column"
                gap="24px"
            >
                <AuthFormControl 
                    label="Provinsi" 
                    type="select" 
                    placeholder="Jawa Tengah" 
                    disabled
                />
                <AuthFormControl 
                    label="Kabupaten/Kota" 
                    type="select" 
                    placeholder="Kota Semarang" 
                    disabled
                />
                <AuthFormControl 
                    handleClick={handleClickKec}
                    label="Kecamatan" 
                    type="select" 
                    placeholder="--Pilih Kecamatan--" 
                    options={(kec != null ) ? kec.map((item) => item.nama) : []}
                    values={(kec != null ) ? kec.map((item) => `${item.id}_${item.nama}`) : []}
                    ref={kecamatan}
                />
                <AuthFormControl 
                    label="Kelurahan" 
                    type="select" 
                    placeholder="--Pilih Kelurahan--" 
                    options={(kel != null) ? kel.map((item) => item.nama) : [] }
                    values={(kel != null) ? kel.map((item) => `${item.id}_${item.nama}`) : [] }
                    ref={kelurahan}
                />
                <FormControl>
                    <FormLabel fontWeight={600}>Pin Point</FormLabel>
                    <Map ref={pin_point}/>
                </FormControl>
            </Flex>
            <AuthBottomNavigation handleSubmit={onSubmit}/>
        </>
    );
}

export default FormSecondSection;