import React from "react";
import {
  Flex,
  Link,
  Button,
  Text,
  IconButton,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { MdNotificationsNone } from "react-icons/md";

const NotificationItem = ({ notificationData }) => {
  return (
    <>
      <MenuGroup>
        <Flex gap="12px">
          <Flex
            w="24px"
            h="24px"
            rounded="full"
            bgColor="#C8FAEB"
            justifyContent="center"
            alignItems="center"
            mt="2px"
          >
            <IconButton
              icon={<MdNotificationsNone />}
              rounded="full"
              fontSize="16px"
              color="#4CB0B5"
            />
          </Flex>
          <Flex flexDir="column" gap="4px" alignItems="start">
            <Text fontSize="xs" fontWeight="medium">
              {notificationData}
            </Text>
            <Link>
              <Button color="brand.500" fontSize="xs" fontWeight="medium" p="0">
                Lihat Selengkapnya
              </Button>
            </Link>
          </Flex>
        </Flex>
      </MenuGroup>
      <MenuDivider />
    </>
  );
};

export default NotificationItem;
