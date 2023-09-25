import React from "react";
import {
  Flex,
  Box,
  Container,
  Link,
  Button,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  MdFavorite,
  MdNotifications,
  MdNotificationsNone,
  MdKeyboardArrowDown,
  MdPeople,
  MdGroupWork,
  MdMonetizationOn,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import NotificationItem from "./NotificationItem";

const MenuNotification = () => {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        color="#667085"
        variant="solid"
        bgColor="#EAECF0"
        aria-label="Notification"
        fontSize="24px"
        rounded="full"
        icon={<MdNotifications />}
      />
      <MenuList
        border="none"
        borderRadius="8px"
        maxW="282px"
        p="12px"
        boxShadow="0px 2px 25px rgba(0, 0, 0, 0.1)"
      >
        <NotificationItem notificationData="Pembayaran Berhasil, lihat jadwal les private mu di menu jadwal" />
        <NotificationItem notificationData="Pembayaran Berhasil, lihat jadwal les private mu di menu jadwal" />

        <Flex justifyContent="end">
          <Button
            variant="outline"
            fontSize="xs"
            fontWeight="medium"
            borderColor="#D0D5DD"
            h="32px"
          >
            Tandai Sudah Dibaca
          </Button>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default MenuNotification;
