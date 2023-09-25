import React from "react";
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Avatar, 

  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  MdHomeFilled,
  MdAccessTime,
  MdPeople,
  MdGroupWork,
  MdMonetizationOn,
  MdSettings,
  MdAdd
} from "react-icons/md";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";

const MobileSidebar = () => {
  let {isAuth, token, user, role: isRole} = useSelector((state) => state.auth);

  if(!isRole){
    isAuth = localStorage.getItem('isAuth')
    token = localStorage.getItem('token')
    isRole = localStorage.getItem('role')
    user = JSON.parse(localStorage.getItem('user'))
  }

  return (
    <Menu>
      <MenuList border="0" pos="relative">
        <Box
          bg="white"
          minW="fit-content"
          h="auto"
          p="24px"
          borderRadius="8px"
          mb="24px"
          position="absolute"
          zIndex="2"
          boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
          bottom="20px"
          transform="translate(-20px,-20px)"
        >
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
      </MenuList>
      <MenuButton 
        as={IconButton}
        aria-label='Options'
        icon={<MdAdd />}
        variant='solid'
        color="white"
        fontSize="24px"
        bg="brand.500"
        borderRadius="50%"
        _hover={{
          transform: "scale(1.1)"
        }}
      >
        Actions
      </MenuButton>
    </Menu>
  );
};



export default MobileSidebar;
