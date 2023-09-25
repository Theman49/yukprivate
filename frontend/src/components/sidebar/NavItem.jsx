import React from "react";
import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon, title, children }) => {
  return (
    <Flex flexDirection="column" w="100%" mb="8px">
      <Link
        as={NavLink}
        end
        to={to}
        p="12px 24px"
        borderRadius="8px"
        _hover={{
          textDecor: "none",
          bg: "brand.400",
          "& > div > svg": {
            color: "white",
          },
          "& > div > p": {
            color: "white",
          },
          transform: "scale(1.05)",
          transition: "0.2s",
        }}
        _activeLink={{
          bg: "brand.500",
          color: "white",
          "& > div > svg": {
            color: "white",
          },
          "& > div > p": {
            color: "white",
          },
        }}
        w="100%"
      >
        <Flex alignItems="center">
          <Icon as={icon} fontSize="xl" color="gray" />
          <Text ml="16px" fontSize="18px" color="gray">
            {title}
          </Text>
          {children}
        </Flex>
      </Link>
    </Flex>
  );
};

export default NavItem;
