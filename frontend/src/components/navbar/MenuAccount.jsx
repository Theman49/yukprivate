import React from "react";
import {
  Flex,
  Container,
  IconButton,
  Heading,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
  Link,
} from "@chakra-ui/react";
import { NavLink as LinkRouter, useNavigate} from "react-router-dom";
import {
  MdFavorite,
  MdNotifications,
  MdKeyboardArrowDown,
  MdPeople,
  MdGroupWork,
  MdMonetizationOn,
  MdSettings,
  MdLogout,
  MdDashboard,
  MdAccessTime,
  MdAccountCircle,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import {logout} from '../../redux/authSlice';
import DefaultUser from '../../assets/images/default-user.jpg';

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const MenuAccount = ({ userName, userImg, userEmail, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <>
      <Menu>        
        <MenuButton as={Button} w={["300px", "full"]} rightIcon={<MdKeyboardArrowDown />}>
          <Flex gap="16px" alignItems="center">
            <Text display={['none', 'block']} fontSize="md" fontWeight="medium">
              Halo, {userName}
            </Text>
            <Image
              boxSize="40px"
              objectFit="cover"
              src={userImg != null ? `${PUBLIC_URL}/${userImg}` : DefaultUser}
              alt="Dan Abramov"
              borderRadius="full"
            />
            <Text display={['block', 'none']} fontSize="md" fontWeight="medium">
              {userName}
            </Text>
          </Flex>
        </MenuButton>


        <MenuList
          border="none"
          borderRadius="8px"
          maxW="282px"
          p="12px"
          boxShadow="0px 2px 25px rgba(0, 0, 0, 0.1)"
        >
          <MenuGroup>
            <Flex display={['none', 'flex']} gap="16px" pl="12px">
              <Image
                boxSize="40px"
                objectFit="cover"
                src={userImg != null ? `${PUBLIC_URL}/${userImg}` : DefaultUser}
                alt="Dan Abramov"
                borderRadius="4px"
              />
              <Flex flexDirection="column">
                <Text fontSize="md" fontWeight="semibold">
                  {userName}
                </Text>
                <Text fontSize="xs" color="gray">
                  {userEmail}
                </Text>
              </Flex>
            </Flex>
          </MenuGroup>
          <MenuDivider color="#D0D5DD" />
          {role == "student" ? (
            <>
              <MenuGroup>
                <Link
                  as={LinkRouter}
                  to="/dashboard/home"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdDashboard />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Dashboard
                  </MenuItem>
                </Link>
                <Link
                  as={LinkRouter}
                  to="/dashboard/tentor"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdPeople />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Tentor
                  </MenuItem>
                </Link>
                <Link
                  as={LinkRouter}
                  to="/dashboard/schedule"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdAccessTime />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Jadwal
                  </MenuItem>
                </Link>
                <Link
                  as={LinkRouter}
                  to="/dashboard/program"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdGroupWork />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Program Saya
                  </MenuItem>
                </Link>
                <Link
                  as={LinkRouter}
                  to="/dashboard/tentor"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdFavorite />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Wishlist
                  </MenuItem>
                </Link>
              </MenuGroup>
              <MenuDivider color="#D0D5DD" />
              <MenuGroup>
                <Link
                  as={LinkRouter}
                  to="/dashboard/account"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdSettings />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Pengaturan
                  </MenuItem>
                </Link>
                <MenuItem
                  fontSize="14"
                  fontWeight="medium"
                  color="gray"
                  icon={<MdLogout />}
                  _hover={{ bg: "brand.400", color: "white" }}
                  onClick={handleLogout}
                >
                  Keluar
                </MenuItem>
              </MenuGroup>
            </>
          ) : (
            <>
              <MenuGroup>
                <Link
                  as={LinkRouter}
                  to="/dashboard/home"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdDashboard />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Dashboard
                  </MenuItem>
                </Link>
                <Link
                  as={LinkRouter}
                  to="/dashboard/schedule"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdAccessTime />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Jadwal
                  </MenuItem>
                </Link>
                <Link
                  as={LinkRouter}
                  to="/dashboard/program"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdMonetizationOn />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Keuangan
                  </MenuItem>
                </Link>
                <Link
                  as={LinkRouter}
                  to="/dashboard/profile"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdAccountCircle />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Profile Tentor
                  </MenuItem>
                </Link>
              </MenuGroup>
              <MenuDivider color="#D0D5DD" />
              <MenuGroup>
                <Link
                  as={LinkRouter}
                  to="/dashboard/account"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <MenuItem
                    fontSize="14"
                    fontWeight="medium"
                    color="gray"
                    icon={<MdSettings />}
                    _hover={{ bg: "brand.400", color: "white" }}
                  >
                    Pengaturan
                  </MenuItem>
                </Link>
                <MenuItem
                  fontSize="14"
                  fontWeight="medium"
                  color="gray"
                  icon={<MdLogout />}
                  _hover={{ bg: "brand.400", color: "white" }}
                  onClick={handleLogout}
                >
                  Keluar
                </MenuItem>
              </MenuGroup>
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default MenuAccount;
