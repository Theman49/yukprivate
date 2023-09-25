import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import MobileNavbar from "../components/navbar/mobile-navbar";
import Footer from "../features/home/components/Footer";

const HomeLayout = ({ children }) => {
  return (
    <Box minH="100vh" w="full">
      <Box display={["none", "block"]}>
        <Navbar />
      </Box>
      <Box display={["block", "none"]}>
        <MobileNavbar />
      </Box>
      <Container maxW="1200px" pt="65px" centerContent>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default HomeLayout;
