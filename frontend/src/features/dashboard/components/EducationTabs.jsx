import { React, createRef, useEffect, useState } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import SelectYear from "../../auth/components/SelectYear";
import AuthFormControl from "../../auth/components/AuthFormControl";
import AuthButton from "../../auth/components/AuthButton";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { login } from '../../../redux/authSlice';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const client = axios.create({
//   baseURL: "http://localhost:8080/api/yukprivate",
// });

const EducationTabs = () => {

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

  const [data, setData] = useState(null);
  const last_education = createRef();
  const institution_name = createRef();
  const tentor_major = createRef();
  const graduation_year = createRef();

  const [tentorData, setTentorData] = useState([]);
  const [tentorRegisterData, setTentorRegisterData] = useState([]);


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

  const onSubmit = async () => {

    try {
      
      const token = localStorage.getItem('token');

      const tentorToUpdateEducationPayload = {
        last_education: last_education.current.value,
        institution_name: institution_name.current.value,
        tentor_major: tentor_major.current.value,
        graduation_year: graduation_year.current.value
      };

      const tentorToUpdateEducationRequest = await axios.put(
        `${BASE_URL}/tentors/education/update`,
        tentorToUpdateEducationPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          },
        },
      );

      const tentorToUpdateEducationResponse = tentorToUpdateEducationRequest.data;

      alert(tentorToUpdateEducationResponse.message);

      if (tentorToUpdateEducationResponse.status) navigate('/dashboard/home');

    } catch (err) {
      alert(err.message);
    }

  };

  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/api/yukprivate/last-education")
    //   .then((response) => {
    //     setData(response.data);
    //   });
    async function getData() {
      const response = await axios.get(`${BASE_URL}/last-education`);
      setData(response.data);
    }
    getData();
  }, []);

  return (
    <Flex flexDir="column" maxW="477px" gap="24px">
      <AuthFormControl
        label="Pendidikan Terakhir"
        type="select"
        placeholder="--Pendidikan Terakhir--"
        ref={last_education}
        options={data != null ? data.data.map((item) => item.text) : []}
        values={data != null ? data.data.map((item) => item.value) : []}
        defaultValue={tentorData.last_education}
      />
      <AuthFormControl
        label="Sekolah/Universitas/Instansi"
        type="text"
        placeholder="Masukkan nama sekolah/universitas/instansi Kamu"
        ref={institution_name}
        defaultValue={tentorData.institution_name}
      />
      <AuthFormControl
        label="Jurusan/Prodi"
        type="text"
        placeholder="Sebutkan jurusan/prodi kamu"
        ref={tentor_major}
        defaultValue={tentorData.tentor_major}
      />
      <SelectYear
        label="Tahun Lulus"
        placeholder="--Tahun Lulus--"
        ref={graduation_year}
        defaultValue={tentorData.graduation_year}
      />
      <AuthButton value="Simpan Perubahan" handleClick={onSubmit} />
    </Flex>
  );
};

export default EducationTabs;
