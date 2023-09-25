import React from "react";
import { Box, Flex, Container } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import MobileSidebar from "../components/sidebar/mobile-sidebar";
import MobileNavbar from "../components/navbar/mobile-navbar";

const DashboardLayout = ({ children }) => {
  return (
    <Box minH="100vh" w="full" bg="bgcyan" pos="relative">
      <Box display={["none", "block"]}>
        <Navbar />
      </Box>
      <Box display={["block", "none"]}>
        <MobileNavbar />
      </Box>
      <Container maxW="1202px" w="100%" centerContent>
        <Flex pt="94px" flexDir={["column", "row"]} w="100%">
          <Box display={["none", "block"]}>
            <Sidebar />
          </Box>
          <Flex flexDirection="column" gap="24px" ml={["0", "332px"]} mb="24px" w="100%">
            {children}
          </Flex>
        </Flex>
      </Container>
      <Box display={["block", "none"]} pos="fixed" bottom="5%" right="5%" zIndex="3">
        <MobileSidebar/>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
