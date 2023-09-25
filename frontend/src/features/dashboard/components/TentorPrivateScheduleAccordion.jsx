import React, {createRef} from "react";
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
  Link,
  Icon,
  Divider,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
} from "@chakra-ui/react";
import { MdCalendarToday, MdAccessTime, MdTimer } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import StartClassModal from "./StartClassModal";
import EndClassModal from "./EndClassModal";
import axios from 'axios';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const TentorPrivateScheduleAccordion = ({
  privateStatus,
  studentImg,
  studentName,
  privateMeet,
  scheduleDate,
  scheduleTime,
  scheduleDuration,
  selectedCourse,
  privateLocation,
  studentPhone,
  isValidatedByTentor,
  bookingId,
  trigerUpdate,
  buttons,
}) => {
  const navigate = useNavigate();

  const topicClass = createRef();
  const urlPicture = createRef();

  let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

  if(!isAuth){
      isAuth = localStorage.getItem('isAuth')
      isRole = localStorage.getItem('role')
      user = JSON.parse(localStorage.getItem('user'))
      token = localStorage.getItem('token')
  }

  const momentSchedule = moment(`'${scheduleDate} ${scheduleTime}'`, "YYYY-MM-DD HH:mm")
  const endMomentSchedule = moment(`'${scheduleDate} ${scheduleTime}'`, "YYYY-MM-DD HH:mm").add(scheduleDuration, 'hours')


  const { isOpen: isOpenStartClassModal, onOpen: openStartClassModal, onClose: closeStartClassModal } = useDisclosure();
  const { isOpen: isOpenEndClassModal, onOpen: openEndClassModal, onClose: closeEndClassModal } = useDisclosure();

  const seeLocation = () => {
    window.open(`https://www.google.co.id/maps/place/${privateLocation}`, "_blank");
  }

  const sendMessage = () => {
    window.open(`https://wa.me/${studentPhone}`, "_blank");
  }

  const startClass = async() => {
    const req = await axios.put(
      `${BASE_URL}/booking/start/${bookingId}`,
      {},
      {
        headers: {
          Authorization : `Bearer ${token}`,
          'Access-Control-Allow-Origin': "*"
        }
      }
    )

    const res = req.data
    if(res.status){
      trigerUpdate('startClass');
      closeStartClassModal();
      buttons[1].click()
    }
  }

  const endClass = async() => {
    // const req = await axios.put(
    //   `${BASE_URL}/booking/end/${bookingId}`,
    //   {
    //     headers: {
    //       'Authorization' : `Bearer ${token}`,
    //       'Access-Control-Allow-Origin': "*"
    //     }
    //   }
    // )
    if(!topicClass.current.value){
      alert('Topik wajib diisi')
    }else if(!urlPicture.current.value){
      alert('Bukti Foto wajib diunggah')
    }else{
      const payload = new FormData()

      payload.append('topic_class', topicClass.current.value)
      payload.append('url_activity_picture', urlPicture.current.files[0])

      const req = await axios.put(
        `${BASE_URL}/booking/end/${bookingId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*"
          }
        }
      )

      const res = req.data
      if(res.status){
        trigerUpdate('endClass');
        closeEndClassModal();
      }else{
        alert(res.message)
      }
    }

    // const res = req.data
  }

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

  return (
    <>
      <AccordionItem
        maxW="590px"
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
              <Box flex="1" textAlign="left" position="relative" width="full">
                <Flex gap="16px">
                  <Avatar boxSize="48px" src={`${PUBLIC_URL}/${studentImg}`} name={studentName} display={['none', 'block']}/>
                  <Flex flexDirection="column" gap="8px">
                    <HStack>
                      <Heading fontSize="18px" fontWeight="medium">
                        {studentName}
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
                          {scheduleTime} - {endMomentSchedule.format('HH:mm')}
                        </Text>
                      </Flex>
                      <Flex alignItems="center" gap="4px" flexDir={['column', 'row']}>
                        <Icon as={MdTimer} color="gray" />
                        <Text fontSize="12px" color="gray">
                          {scheduleDuration} Jam
                        </Text>
                      </Flex>
                    </HStack>
                    {isExpanded ? (
                      <></>
                    ) : (
                      <Flex gap={["4px","16px"]}>
                        {privateStatus == "ongoing" ? (
                          isValidatedByTentor == false ?  (
                            <Link
                              textDecoration="none"
                              _hover={{
                                textDecoration: "none",
                              }}
                            >
                              <Button
                                fontSize="xs"
                                fontWeight="medium"
                                h="32px"
                                mt="6px"
                                variant="solid"
                                bgColor="#F04438"
                                color="white"
                                _active={{ bgColor: "brand.700" }}
                              >
                                Akhiri Kelas
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="outline"
                              fontSize="xs"
                              fontWeight="medium"
                              borderColor="#D0D5DD"
                              w="164px"
                              h="32px"
                              mt="6px"
                              color="#667085"
                            >
                              Menunggu Validasi Siswa
                            </Button>
                          )
                        ) : null}
                        {privateStatus == "accepted" && (
                          <>
                            {moment() >= momentSchedule && (
                              <Link
                                textDecoration="none"
                                _hover={{
                                  textDecoration: "none",
                                }}
                              >
                                <Button
                                  variant="outline"
                                  fontSize="xs"
                                  fontWeight="medium"
                                  borderColor="#D0D5DD"
                                  w="94px"
                                  h="32px"
                                  mt="6px"
                                  bg="brand.500"
                                  color="white"
                                >
                                  Mulai Kelas
                                </Button>
                              </Link>
                            )}
                            <Link
                              textDecoration="none"
                              _hover={{
                                textDecoration: "none",
                              }}
                            >
                              <Button
                                variant="outline"
                                fontSize="xs"
                                fontWeight="medium"
                                borderColor="#D0D5DD"
                                w="94px"
                                h="32px"
                                mt="6px"
                              >
                                Lihat Lokasi
                              </Button>
                            </Link>
                          </>
                        )}
                        <Link
                          textDecoration="none"
                          _hover={{
                            textDecoration: "none",
                          }}
                        >
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
                                mr="6px"
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
                        </Link>
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
                <Flex gap= {["4px","16px"]}>
                  {privateStatus == "ongoing" ? 
                    (isValidatedByTentor == false ? 
                      (
                        <Link
                          textDecoration="none"
                          _hover={{
                            textDecoration: "none",
                          }}
                        >
                          <Button
                            fontSize="xs"
                            fontWeight="medium"
                            h="32px"
                            mt="6px"
                            variant="solid"
                            bgColor="#F04438"
                            color="white"
                            _active={{ bgColor: "brand.700" }}
                            onClick={openEndClassModal}
                          >
                            Akhiri Kelas
                          </Button>
                        </Link>
                      ) 
                        : 
                      (
                        <Button
                          variant="outline"
                          fontSize="xs"
                          fontWeight="medium"
                          borderColor="#D0D5DD"
                          w="164px"
                          h="32px"
                          mt="6px"
                          color="#667085"
                        >
                          Menunggu Validasi Siswa
                        </Button>
                      )
                    ) : null
                  }
                  
                  {privateStatus == "accepted" && (
                    <>
                      {moment() >= momentSchedule && (
                        <Link
                          textDecoration="none"
                          _hover={{
                            textDecoration: "none",
                          }}
                        >
                          <Button
                            variant="outline"
                            fontSize="xs"
                            fontWeight="medium"
                            borderColor="#D0D5DD"
                            w="94px"
                            h="32px"
                            mt="6px"
                            bg="brand.500"
                            color="white"
                            onClick={openStartClassModal}
                          >
                            Mulai Kelas
                          </Button>
                        </Link>
                      )}
                      <Link
                        textDecoration="none"
                        _hover={{
                          textDecoration: "none",
                        }}
                      >
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
                          onClick={seeLocation}
                        >
                          Lihat Lokasi
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link
                    textDecoration="none"
                    _hover={{
                      textDecoration: "none",
                    }}
                  >
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
                          mr="6px"
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
                  </Link>
                </Flex>
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <StartClassModal 
        isOpened={isOpenStartClassModal}
        onOpened={openStartClassModal}
        onClosed={closeStartClassModal}
        startClass={startClass}
      />
      <EndClassModal 
        isOpened={isOpenEndClassModal}
        onOpened={openEndClassModal}
        onClosed={closeEndClassModal}
        endClass={endClass}
        topic_class={topicClass}
        url_picture={urlPicture}
      />
    </>
  );
};

export default TentorPrivateScheduleAccordion;
