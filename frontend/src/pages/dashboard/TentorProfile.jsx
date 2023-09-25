import React, {useState, useEffect} from "react";
import {
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import DashboardLayout from "../../layouts/DashboardLayout";
import TentorProfileTabs from "../../features/dashboard/components/TentorProfileTabs";
import BookingScheduleTabs from "../../features/dashboard/components/BookingScheduleTabs";
import axios from 'axios';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TentorProfile = () => {
  let { isAuth, role: isRole, user, token } = useSelector((state) => state.auth);

  if (!isAuth) {
    isAuth = localStorage.getItem("isAuth");
    isRole = localStorage.getItem("role");
    token = localStorage.getItem("token");
    user = JSON.parse(localStorage.getItem("user"));
  } 
  const [tentorData, setTentorData] = useState(null);

  useEffect(() => {
    const getTentorData = async() => {
      const req = await axios.get(
        `${BASE_URL}/users/tentors/${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

      const res = req.data.data.tentors_by_id
      setTentorData(res)
    }
    getTentorData();
  },[])


  return (
    <DashboardLayout>
      <Flex
        flexDirection="column"
        p="24px"
        bg="white"
        w={["full","868px"]}
        minH="80vh"
        borderRadius="8px"
        boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
        gap="20px"
      >
        <Heading fontSize="xl" fontWeight="medium">
          Profil Tentor
        </Heading>
        <Tabs
          defaultIndex={0}
          isLazy
          w="full"
          maxW="759px"
          borderColor="#D9D9D9"
        >
          <TabList gap="32px">
            <Tab
              p="8px 0px"
              fontSize="lg"
              color="#667085"
              _selected={{
                color: "brand.500",
                borderBottom: "3px solid #69D3CF",
              }}
            >
              Profil Tentor
            </Tab>
            <Tab
              p="8px 0px"
              fontSize="lg"
              color="#667085"
              _selected={{
                color: "brand.500",
                borderBottom: "3px solid #69D3CF",
              }}
            >
              Jadwal Booking
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="24px 0px 24px 0px">
              {tentorData != null ? (
                <TentorProfileTabs tentorData={tentorData}/>
              ) : <></>}
            </TabPanel>
            <TabPanel p="24px 0px 24px 0px">
              <BookingScheduleTabs tentorSchedules={tentorData != null ? tentorData.tentor_schedules : null}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>

    </DashboardLayout>
  );
};

export default TentorProfile;
