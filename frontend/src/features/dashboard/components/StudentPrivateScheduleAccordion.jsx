import React from "react";
import moment from 'moment';
import 'moment/locale/id';
import {
  Flex,
  Box,
  HStack,
  Avatar,
  Heading,
  Text,
  Badge,
  Icon,
  Divider,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { MdCalendarToday, MdAccessTime, MdTimer } from "react-icons/md";
import ValidationModal from './ValidationModal';
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const StudentPrivateScheduleAccordion = ({
  privateStatus,
  tentorImg,
  tentorName,
  privateMeet,
  scheduleDate,
  scheduleTime,
  scheduleDuration,
  selectedCourse,
  privateLocation,
  tentorPhone,
  isValidatedByTentor,
  topicClass="",
  bookingId,
  tentorId,
  studentId,
  trigerUpdate,
  buttons
}) => {
  let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

  if(!isAuth){
      isAuth = localStorage.getItem('isAuth')
      isRole = localStorage.getItem('role')
      user = JSON.parse(localStorage.getItem('user'))
      token = localStorage.getItem('token')
  }

  const navigate = useNavigate();

  const {isOpen, onOpen, onClose} = useDisclosure();

  const momentSchedule = moment(`'${scheduleDate} ${scheduleTime}'`, "YYYY-MM-DD HH:mm")
  const endMomentSchedule = moment(`'${scheduleDate} ${scheduleTime}'`, "YYYY-MM-DD HH:mm").add(scheduleDuration, 'hours')

  const expiredClass = async() => {
    if(privateStatus == 'accepted'){
      const req = await axios.put(
        `${BASE_URL}/booking/expired/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
          }
        }
      )

      const res = req.data
      if(res.status) trigerUpdate('expired')
    }
  }

  if(moment() >= endMomentSchedule){
    expiredClass()
  }

  const sendMessage = () => {
    window.open(`https://wa.me/${tentorPhone}`, "_blank");
  }


  return (
    <>
    <AccordionItem
      maxW={["100%","590px"]}
      border="1px solid #D0D5DD"
      borderRadius="8px"
      bg="white"
      p="2px"
      mb="16px"
      _hover={{ transform: "scale(1.02)", transition: "0.2s" }}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Box flex="1" textAlign="left" position="relative">
              <Flex gap="16px">
                <Avatar boxSize="48px" src={`${PUBLIC_URL}/${tentorImg}`} name={tentorName} display={['none', 'block']}/>
                <Flex flexDirection="column" gap="8px">
                  <HStack>
                    <Heading fontSize="18px" fontWeight="medium">
                      {tentorName}
                    </Heading>
                    <Badge colorScheme="green" fontSize="12px">
                      {privateMeet}
                    </Badge>
                  </HStack>
                  <HStack gap="20px">
                    <Flex alignItems="center" gap="4px" flexDir={['column', 'row']}>
                      <Icon as={MdCalendarToday} color="gray" />
                      <Text fontSize="12px" color="gray">
                        {moment(scheduleDate).format('dddd, DD-MM-YYYY')}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" gap="4px" flexDir={['column', 'row']}>
                      <Icon as={MdAccessTime} color="gray" />
                      <Text fontSize="12px" color="gray">
                        {scheduleTime}
                      </Text>
                    </Flex>
                    <Flex alignItems="center" gap="4px" flexDir={['column', 'row']}>
                      <Icon as={MdTimer} color="gray" />
                      <Text fontSize="12px" color="gray">
                        {scheduleDuration}
                      </Text>
                    </Flex>
                  </HStack>
                  {isExpanded ? (
                    <></>
                  ) : (
                    <Flex gap="16px">
                      {isValidatedByTentor && (
                        <Button
                          variant="outline"
                          fontSize="xs"
                          fontWeight="medium"
                          borderColor="#D0D5DD"
                          w="98px"
                          h="32px"
                          mt="6px"
                          bg="brand.500"
                          color="white"
                        >
                          Validasi
                        </Button>
                      )}
                      {privateStatus == "complete" && (
                        <Button
                          variant="outline"
                          fontSize="xs"
                          fontWeight="medium"
                          borderColor="#D0D5DD"
                          w="94px"
                          h="32px"
                          mt="6px"
                        >
                          Pesan Lagi
                        </Button>
                      )}
                      {privateStatus == 'expired' && (
                          <Button
                            variant="outline"
                            fontSize="xs"
                            fontWeight="medium"
                            borderColor="#D0D5DD"
                            color="white"
                            bg="red"
                            w="94px"
                            h="32px"
                            mt="6px"
                          >
                            Kadaluwarsa
                          </Button>
                      )}
                      <Button
                        variant="outline"
                        fontSize="xs"
                        fontWeight="medium"
                        borderColor="#D0D5DD"
                        w="98px"
                        h="32px"
                        mt="6px"
                      >
                        Kirim Pesan
                      </Button>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Flex
                gap="4px"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="2px"
                right="-6px"
              >
                <Text fontSize="xs" fontWeight="medium" color="#475467">
                  Detail
                </Text>
                <AccordionIcon color="#475467" />
              </Flex>
            </Box>
          </AccordionButton>
          <AccordionPanel pb={4} p={["0px 10px","0px 80px"]} mb="12px">
            <Flex gap="10px" flexDirection="column" mt="6px">
              <Divider color="#D0D5DD" />
              <Flex flexDirection="column" gap="4px">
                <Text fontSize="xs" fontWeight="medium" color="#667085">
                  Mata pelajaran yang dipilih:
                </Text>
                <Heading fontSize="sm" fontWeight="medium">
                  {selectedCourse}
                </Heading>
              </Flex>
              <Flex flexDirection="column" gap="4px">
                <Text fontSize="xs" fontWeight="medium" color="#667085">
                  Alamat:
                </Text>
                <Heading fontSize="sm" fontWeight="medium">
                  {privateLocation}
                </Heading>
              </Flex>
              <Flex gap="16px">
                {isValidatedByTentor && (
                    <Button
                      variant="outline"
                      fontSize="xs"
                      fontWeight="medium"
                      borderColor="#D0D5DD"
                      w="98px"
                      h="32px"
                      mt="6px"
                      bg="brand.500"
                      color="white"
                      _hover={{
                        transform: "scale(1.1)"
                      }}
                      onClick={onOpen}
                    >
                      Validasi
                    </Button>
                )}
                {privateStatus == "complete" && (
                    <Button
                      variant="outline"
                      fontSize="xs"
                      fontWeight="medium"
                      borderColor="#D0D5DD"
                      w="94px"
                      h="32px"
                      mt="6px"
                      _hover={{
                        color: "white",
                        backgroundColor: "brand.500"
                      }}
                      onClick={() => navigate(`/explore/booking/${bookingId}`)}
                    >
                      Pesan Lagi
                    </Button>
                )}
                {privateStatus == 'expired' && (
                    <Button
                      variant="outline"
                      fontSize="xs"
                      fontWeight="medium"
                      borderColor="#D0D5DD"
                      color="white"
                      bg="red"
                      w="94px"
                      h="32px"
                      mt="6px"
                    >
                      Kadaluwarsa
                    </Button>
                )}
                <Button
                  variant="outline"
                  fontSize="xs"
                  fontWeight="medium"
                  borderColor="#D0D5DD"
                  w="98px"
                  h="32px"
                  mt="6px"
                  _hover={{
                    color: "white",
                    backgroundColor: "brand.500"
                  }}
                  onClick={sendMessage}
                >
                  Kirim Pesan
                </Button>
              </Flex>
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>

    <ValidationModal 
      isOpened={isOpen}
      onOpened={onOpen}
      onClosed={onClose}
      topicClass={topicClass}
      tentorId={tentorId}
      studentId={studentId}
      bookingId={bookingId}
      trigerUpdate={trigerUpdate}
      buttons={buttons}
    />

    </>
  );
};

export default StudentPrivateScheduleAccordion;
