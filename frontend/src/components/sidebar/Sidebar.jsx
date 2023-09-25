import React, {useEffect, useState} from "react";
import { Box, Flex, Heading, Text, Avatar } from "@chakra-ui/react";
import {
  MdHomeFilled,
  MdAccessTime,
  MdPeople,
  MdGroupWork,
  MdMonetizationOn,
  MdSettings,
} from "react-icons/md";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import axios from 'axios';
import DefaultUser from '../../assets/images/default-user.jpg';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const Sidebar = () => {
  let {isAuth, token, user, role: isRole} = useSelector((state) => state.auth);

  if(!isRole){
    isAuth = localStorage.getItem('isAuth')
    token = localStorage.getItem('token')
    isRole = localStorage.getItem('role')
    user = JSON.parse(localStorage.getItem('user'))
  }

  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUserData = async() => {
      const req = await axios.get(
        `${BASE_URL}/users/${isRole}s/${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

      const res = req.data.data
      setUserData(res[`${isRole}s_by_id`])
    }
    getUserData();
  },[])

  return (
    <Box
      bg="white"
      w="308px"
      h="500px"
      p="24px"
      borderRadius="8px"
      mb="24px"
      position="fixed"
      zIndex="2"
      boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
    >
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Avatar
          boxSize="56px"
          src={userData ? `${PUBLIC_URL}/${userData.url_picture}` : DefaultUser}
          name={user.name}
          mb="15px"
        />
        <Heading fontWeight="medium" fontSize="18px" mb="8px">
          {user.name}
        </Heading>
        {isRole == 'student' ? (
          <Box>
            <Text fontSize="14px" color="gray" mb="4px">
              Kelas 11
            </Text>
            <Text fontSize="14px" color="gray" mb="16px">
              SMAN 1 Salatiga
            </Text>
          </Box>
        ): 
          <Box>
            <Text fontSize="14px" color="gray" mb="16px">
              Tentor
            </Text>
          </Box>
        }
      </Flex>
      <Flex flexDirection="column">
        {isRole == "student" && (
          <>
            <NavItem
              icon={MdHomeFilled}
              title="Dashboard"
              to="/dashboard/home"
            />
            <NavItem
              icon={MdAccessTime}
              title="Jadwal"
              to="/dashboard/schedule"
            />
            <NavItem icon={MdPeople} title="Tentor" to="/dashboard/tentor" />
            <NavItem
              icon={MdMonetizationOn}
              title="Transaksi"
              to="/dashboard/transaction"
            />
            <NavItem
              icon={MdSettings}
              title="Pengaturan"
              to="/dashboard/account"
            />
          </>
        )}
        {isRole == "tentor" && (
          <>
            <NavItem
              icon={MdHomeFilled}
              title="Dashboard"
              to="/dashboard/home"
            />
            <NavItem
              icon={MdAccessTime}
              title="Jadwal"
              to="/dashboard/schedule"
            />
            <NavItem
              icon={MdMonetizationOn}
              title="Keuangan"
              to="/dashboard/finance"
            />
            <NavItem
              icon={MdSettings}
              title="Profile Tentor"
              to="/dashboard/profile"
            />
            <NavItem
              icon={MdSettings}
              title="Pengaturan"
              to="/dashboard/account"
            />
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
