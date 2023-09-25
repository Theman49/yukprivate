import React from "react";
import {
  Avatar,
  Badge,
  Flex,
  Heading,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { MdCalendarToday, MdAccessTime, MdTimer } from "react-icons/md";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const TentorScheduleItem = ({
  studentImg,
  studentName,
  privateMeet,
  scheduleDate,
  scheduleTime,
  scheduleDuration,
}) => {
  return (
    <Flex
      border="1px solid #D0D5DD"
      w="100%"
      h="84px"
      p="8px 18px"
      borderRadius="8px"
      gap="16px"
      alignItems="center"
      _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
    >
      <Avatar boxSize="48px" src={`${PUBLIC_URL}/${studentImg}`} name={studentName} />
      <Flex flexDirection="column" gap="8px">
        <HStack>
          <Heading fontSize="18px" fontWeight="medium">
            {studentName}
          </Heading>
          <Badge
            colorScheme={privateMeet == "Online" ? "blue" : "green"}
            fontSize="12px"
          >
            {privateMeet}
          </Badge>
        </HStack>
        <HStack gap="6px">
          <Flex alignItems="center" gap="4px">
            <Icon as={MdCalendarToday} color="gray" />
            <Text fontSize="12px" color="gray">
              {scheduleDate}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Icon as={MdAccessTime} color="gray" />
            <Text fontSize="12px" color="gray">
              {scheduleTime}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="4px">
            <Icon as={MdTimer} color="gray" />
            <Text fontSize="12px" color="gray">
              {scheduleDuration}
            </Text>
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default TentorScheduleItem;
