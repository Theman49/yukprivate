import React from "react";
import {
  Flex,
  VStack,
  Heading,
  Text,
  Icon,
  Image,
  Divider,
  Button,
  Link,
} from "@chakra-ui/react";
import {
  MdOutlineWorkOutline,
  MdOutlineCommentBank,
  MdOutlineLocationOn,
  MdCalendarToday,
  MdAccessTime,
} from "react-icons/md";
import { Link as LinkRouter } from "react-router-dom";
import DefaultUser from "../../../assets/images/default-user.jpg";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const TentorInfoCard = ({
  tentorImg,
  tentorName,
  tentorJob,
  tentorCourseMastery,
  tentorPlace,
  tentorId,
  scheduleDate,
  scheduleTime,
}) => {
  return (
    <Flex
      flexDirection="column"
      w="400px"
      p="12px"
      border="1px solid #D0D5DD"
      borderRadius="8px"
      bg="white"
    >
      <Flex gap="20px" mb="15px">
        <Image
          boxSize="100px"
          objectFit="cover"
          src={tentorImg != null ? `${PUBLIC_URL}/${tentorImg}` : DefaultUser }
          alt="Dan Abramov"
          borderRadius="4px"
        />
        <Flex flexDirection="column" gap="16px" h="116px">
          <Heading fontWeight="semibold" fontSize="16px">
            {tentorName}
          </Heading>
          <VStack alignItems="flex-start">
            <Flex alignItems="center" gap="8px">
              <Icon as={MdOutlineWorkOutline} fontSize="20px" color="gray" />
              <Text fontSize="14px" color="gray">
                {tentorJob}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="8px">
              <Icon as={MdOutlineCommentBank} fontSize="20px" color="gray" />
              <Text fontSize="14px" color="gray" w="75%" noOfLines={1}>
                {tentorCourseMastery}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="8px">
              <Icon as={MdOutlineLocationOn} fontSize="20px" color="gray" />
              <Text fontSize="14px" color="gray">
                {tentorPlace}
              </Text>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
      <Divider color="#D0D5DD" />
      <Flex mt="14px" justifyContent="space-between" h="41px">
        <Flex alignItems="flex-start" flexDirection="column" gap="9px">
          <Text fontWeight="medium" fontSize="12px">
            Jadwal Tersedia
          </Text>
          <Flex gap="8px">
            <Flex alignItems="center" gap="2px">
              <Icon as={MdCalendarToday} fontSize="16px" color="gray" />
              <Text fontSize="12px" color="gray">
                {scheduleDate}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="2px">
              <Icon as={MdAccessTime} fontSize="16px" color="gray" />
              <Text fontSize="12px" color="gray">
                {scheduleTime}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Link
          as={LinkRouter}
          to="#"
          textDecor="none"
          _hover={{ textDecor: "none" }}
        >
          <Button
            as={LinkRouter}
            to={`/explore/booking/${tentorId}`}
            bg="brand.500"
            p="8px"
            w="109px"
            fontWeight="medium"
            fontSize="12px"
            color="white"
            _hover={{ bg: "brand.400" }}
            _active={{ bg: "brand.700" }}
          >
            Reservasi Tentor
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default TentorInfoCard;
