import React from "react";
import {
  Flex,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StudentDataTabs from "../../features/dashboard/components/StudentDataTabs";
import TentorDataTabs from "../../features/dashboard/components/TentorDataTabs";
import AccountTabs from "../../features/dashboard/components/AccountTabs";
import EducationTabs from "../../features/dashboard/components/EducationTabs";
import { useSelector } from "react-redux";

const AccountConfiguration = () => {
  let {isAuth, token, user, role: isRole} = useSelector((state) => state.auth);

  if(!isRole){
    isAuth = localStorage.getItem('isAuth')
    token = localStorage.getItem('token')
    isRole = localStorage.getItem('role')
    user = JSON.parse(localStorage.getItem('user'))
  }

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
          Pengaturan
        </Heading>
        {isRole == "student" && (
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
                Data Diri
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
                Akun
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="24px 0px 24px 0px">
                <StudentDataTabs />
              </TabPanel>
              <TabPanel p="24px 0px 24px 0px">
                <AccountTabs />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        {isRole == "tentor" && (
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
                Data Diri
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
                Pendidikan
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
                Akun
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="24px 0px 24px 0px">
                <TentorDataTabs />
              </TabPanel>
              <TabPanel p="24px 0px 24px 0px">
                <EducationTabs />
              </TabPanel>
              <TabPanel p="24px 0px 24px 0px">
                <AccountTabs />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </DashboardLayout>
  );
};

export default AccountConfiguration;
