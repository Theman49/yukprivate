import React from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  Link,
  Image,
  Divider,
} from "@chakra-ui/react";
import { MdOutlineOpenInNew } from "react-icons/md";
import IconTrophy from "../../../assets/icons/IconTrophy.png";
const AchievementItem = ({
  achievementRank,
  achievementPlace,
  achievementDate,
  certificateLink,
}) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="16px">
          <Image src={IconTrophy} maxW={["40px","64px"]} />
          <Flex flexDirection="column" gap="4px">
            <Heading fontSize="md" fontWeight="medium">
              {achievementRank}
            </Heading>
            <Text fontSize="sm" fontWeight="medium">
              {achievementPlace}
            </Text>
            <Text fontSize="xs" color="gray">
              {achievementDate}
            </Text>
          </Flex>
        </Flex>
        <Link
          display={["none", "block"]}
          href={certificateLink}
          isExternal
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            variant="solid"
            bg="#F2F4F7"
            _hover={{ bg: "#D7D7D7" }}
            _active={{ bg: "#BBBBBB" }}
            rightIcon={<MdOutlineOpenInNew fontSize="md" />}
            fontSize="sm"
            fontWeight="medium"
          >
            Lihat Sertifikat
          </Button>
        </Link>
      </Flex>
      <Divider color="#D0D5DD" mt="4px" />
    </>
  );
};

export default AchievementItem;
