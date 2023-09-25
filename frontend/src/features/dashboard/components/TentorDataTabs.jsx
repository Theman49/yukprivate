import React, { useEffect, useState, createRef } from "react";
import {
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Avatar,
  IconButton,
  Input
} from "@chakra-ui/react";
import AuthFormControl from "../../auth/components/AuthFormControl";
import AuthButton from "../../auth/components/AuthButton";
import Map from "../../auth/components/Map";
import { MdImage } from "react-icons/md";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { login } from '../../../redux/authSlice';
import { useRef } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const TentorDataTabs = () => {


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  let { token, isAuth, role: isRole, user } = useSelector((state) => state.auth);

  if (!isAuth) {
    isAuth = localStorage.getItem('isAuth')
    isRole = localStorage.getItem('role')
    token = localStorage.getItem("token")
    user = JSON.parse(localStorage.getItem('user'))
  }

  const userData = { ...user };

  const name = createRef();
  const username = createRef();
  const gender = createRef();
  const date_of_birth = createRef();
  const no_handphone = createRef();
  const kecamatan = createRef();
  const kelurahan = createRef();
  const pin_point = createRef();
  const [kec, setKec] = useState(null);
  const [kel, setKel] = useState(null);
  const [choosedKec, setChoosedKec] = useState("");
  const [tentorData, setTentorData] = useState([]);
  const [tentorRegisterData, setTentorRegisterData] = useState([]);
  const picture = useRef();


  useEffect(() => {
    const getTentorData = async () => {

      try {

        const token = localStorage.getItem("token");

        const getUserDataRequest = await axios.get(
          `${BASE_URL}/users/tentors/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*'
            },
          }
        );

        console.log(getUserDataRequest)

        const getUserDataResponse = getUserDataRequest.data.data.tentors_by_id;

        setTentorData(getUserDataResponse);
        setTentorRegisterData(getUserDataResponse.register);

      } catch (err) {
        alert(err.message);
      }
    };
    getTentorData();
  }, []);

  useEffect(() => {
    const getKecamatan = async () => {
      const response = await axios.get(   
        "http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=3374"
      );
      const kecamatan = await response.data.kecamatan;
      setKec(kecamatan);
    };
    getKecamatan();
  }, []);


  useEffect(() => {
    const getKelurahan = async () => {
      const idKec = choosedKec.split("_")[0];
      const response = await axios.get(
        `http://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKec}`
      );
      setKel(response.data.kelurahan);
    };
    getKelurahan();
  }, [choosedKec]);


  const handleClickKec = (event) => {
    setChoosedKec(event.target.value);
  };

  const [pinPoint, setPinPoint] = useState();

  useEffect(() => {
    if(tentorData.address && kec){
      const kecValue = tentorData.address.split(",")[0]
      const getKecamatan = kec.filter(item => item.nama.toLowerCase().includes(kecValue.toLowerCase()))[0]
      setChoosedKec(`${getKecamatan.id}_${getKecamatan.nama}`)
    }

    if(tentorData.pin_point){
      const pinPointValue = tentorData.pin_point.split(",")
      const longLat = pinPointValue.map(item => parseFloat(item))
      setPinPoint(longLat)
    }

  }, [tentorData])

  const file = document.getElementById('picture')
  const [selectedFile, setSelectedFile] = useState();
  const [selectedPicture, setSelectedPicture] = useState();

  useEffect(() => {
    if(!selectedFile){
      return
    }

    const setPicturePreview = () => {
      if(selectedFile.type.split('/')[0] !== 'image'){
        setSelectedFile(null)
        setSelectedPicture(undefined)
        alert("File harus bertipe gambar")
        return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setSelectedPicture(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }
    setPicturePreview()
  }, [selectedFile])

  const onSubmit = async () => {

    try {

      const userToUpdateProfilePayload = new FormData();

      userToUpdateProfilePayload.append('name', name.current.value);
      userToUpdateProfilePayload.append('username', username.current.value);
      userToUpdateProfilePayload.append('gender', gender.current.value);
      userToUpdateProfilePayload.append('date_of_birth', date_of_birth.current.value);
      userToUpdateProfilePayload.append('no_handphone', no_handphone.current.value);
      if(kecamatan.current.value && kelurahan.current.value){
        userToUpdateProfilePayload.append('address', `${(kecamatan.current.value).split('_')[1]},${(kelurahan.current.value).split('_')[1]}`);
      }
      userToUpdateProfilePayload.append('pin_point', pin_point.current.value);
      userToUpdateProfilePayload.append('url_picture', selectedFile);

      const userUpdateProfileRequest = await axios.put(
        `${BASE_URL}/tentors/biodata/update`,
        userToUpdateProfilePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          },
        },
      );

      const userUpdateProfileResponse = userUpdateProfileRequest.data;

      alert(userUpdateProfileResponse.message);

      if (userUpdateProfileResponse.status) {
        
        userData.name = name.current.value;

        dispatch(login({
          token: token,
          role: 'tentor',
          user: userData
        }));

        navigate('/dashboard/home');
      }
      
    } catch (err) {
      alert(err.message);
    }

  };



  return (
    <Flex flexDir={["column", "row"]} w="100%" gap="60px">
      <Flex flexDir="column" maxW={["100%","477px"]} gap="24px">
        <Flex display={["flex", "none"]} minW="100px" flexDir="column" gap="8px">
          <Text fontWeight={600}>Foto Profil</Text>
          <Flex pos="relative" w="fit-content"> 
            <Avatar
              w="96px"
              h="96px"
              name={tentorRegisterData.name}
              src={selectedPicture ? selectedPicture :  `${PUBLIC_URL}/${tentorData.url_picture}`}
            />
            <IconButton
              pos="absolute"
              bottom="0px"
              right="0px"
              icon={<MdImage />}
              bg="brand.500"
              color="white"
              rounded="full"
              onClick={() => {
                file.click();
              }}
            />
          </Flex>
          {/* <input type="file" id="picture" /> */}
        </Flex>
        <AuthFormControl
          label="Nama Lengkap"
          type="email"
          placeholder="Masukkan Nama Lengkapmu"
          ref={name}
          defaultValue={tentorRegisterData.name}
        />
        <AuthFormControl
          label="Username"
          type="email"
          placeholder="Buat username Kamu"
          ref={username}
          defaultValue={tentorData.username}
        />
        <AuthFormControl
          label="Jenis Kelamin"
          type="select"
          placeholder="--Pilih Jenis Kelamin--"
          options={["Laki Laki", "Perempuan"]}
          values={["laki-laki", "perempuan"]}
          ref={gender}
          defaultValue={tentorData.gender}
        />
        <AuthFormControl
          label="Tanggal Lahir"
          type="date"
          placeholder="MM/DD/YYYY"
          ref={date_of_birth}
          defaultValue={tentorData.date_of_birth}
        />
        <AuthFormControl
          label="Nomor Telepon"
          type="text"
          placeholder="Cth. 628123456789"
          ref={no_handphone}
          defaultValue={tentorData.no_handphone}
        />
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
          options={kec != null ? kec.map((item) => item.nama) : []}
          values={
            kec != null ? kec.map((item) => `${item.id}_${item.nama}`) : []
          }
          ref={kecamatan}
          defaultValue={tentorData.address ? (tentorData.address).split(",")[0] : null}
        />
        <AuthFormControl
          label="Kelurahan"
          type="select"
          placeholder="--Pilih Kelurahan--"
          options={kel != null ? kel.map((item) => item.nama) : []}
          values={
            kel != null ? kel.map((item) => `${item.id}_${item.nama}`) : []
          }
          ref={kelurahan}
          defaultValue={tentorData.address ? (tentorData.address).split(",")[1] : null}
        />
        <FormControl>
          <FormLabel fontWeight={600}>Pin Point</FormLabel>
          <Map defaultValue={tentorData.pin_point ? pinPoint : null} ref={pin_point} />
        </FormControl>
        <AuthButton value="Simpan Perubahan" handleClick={onSubmit} />
      </Flex>

      <Flex display={["none", "flex"]} minW="100px" flexDir="column" gap="8px">
        <Text fontWeight={600}>Foto Profil</Text>
        <Flex pos="relative"> 
          <Avatar
            w="96px"
            h="96px"
            name={tentorRegisterData.name}
            src={selectedPicture ? selectedPicture :  `${PUBLIC_URL}/${tentorData.url_picture}`}
          />
          <IconButton
            pos="absolute"
            bottom="0px"
            right="0px"
            icon={<MdImage />}
            bg="brand.500"
            color="white"
            rounded="full"
            onClick={() => {
              file.click();
            }}
          />
        </Flex>
        {/* <input type="file" id="picture" /> */}
      </Flex>
      <Input 
        type="file" 
        id="picture" 
        ref={picture}
        display="none"
        onChange={(event) => {
          setSelectedFile(event.target.files[0])
        }}/
      >
    </Flex>
  );
};

export default TentorDataTabs;
