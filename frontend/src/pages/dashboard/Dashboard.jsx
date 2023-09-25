import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import OncomingPrivateSchedule from "../../features/dashboard/components/OncomingPrivateSchedule";
import QuestionWhatsapp from "../../features/dashboard/components/QuestionWhatsapp";
import LatestActivity from "../../features/dashboard/components/LatestActivity";
import DiscoverTentor from "../../features/dashboard/components/DiscoverTentor";
import DashboardLayout from "../../layouts/DashboardLayout";
import TentorSchedule from "../../features/dashboard/components/TentorSchedule";
import TentorPrivateHistory from "../../features/dashboard/components/TentorPrivateHistory";
import TentorPerfomance from "../../features/dashboard/components/TentorPerfomance";
import { useSelector } from "react-redux";

const Dashboard = () => {
  let {isAuth, token, user, role: isRole} = useSelector((state) => state.auth);

  if(!isRole){
    isAuth = localStorage.getItem('isAuth')
    token = localStorage.getItem('token')
    isRole = localStorage.getItem('role')
    user = JSON.parse(localStorage.getItem('user'))
  }

  return (
    <DashboardLayout>
      {isRole == "student" && (
        <>
          <Flex gap="24px" flexDir={["column", "row"]}>
            <Box display={["block", "none"]}>
              <QuestionWhatsapp />
            </Box>
            <OncomingPrivateSchedule />
            <Flex flexDirection="column" gap="24px" display={["none", "flex"]}>
              <LatestActivity />
              <QuestionWhatsapp />
            </Flex>
          </Flex>
          <DiscoverTentor />
        </>
      )}
      {isRole == "tentor" && (
        <>
          <Flex flexDir="column" gap="24px">
            <TentorPerfomance />
            <Flex gap="24px" flexDir={["column", "row"]}>
              <TentorSchedule />
              <TentorPrivateHistory />
            </Flex>
          </Flex>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
