import React, {useState, useEffect} from "react";
import {
  Flex,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  Box
} from "@chakra-ui/react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StudentPrivateScheduleAccordion from "../../features/dashboard/components/StudentPrivateScheduleAccordion";
import TentorPrivateScheduleAccordion from "../../features/dashboard/components/TentorPrivateScheduleAccordion";
import { useSelector } from "react-redux";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// import { dataDummy } from "../../data/generateDummy";
// import { dataDummy as dummy2 } from "../../data/transactionDummy";

// const Data = JSON.parse(dataDummy)
// const Tentor = Data.tentor

// const Data2 = JSON.parse(dummy2)
// const Transactions = Data2.transactions

const Schedule = () => {
  let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

  if(!isAuth){
      isAuth = localStorage.getItem('isAuth')
      isRole = localStorage.getItem('role')
      user = JSON.parse(localStorage.getItem('user'))
      token = localStorage.getItem('token')
  }

  const [bookingByStudent, setBookingByStudent] = useState()
  const [bookingByTentor, setBookingByTentor] = useState()

  const [onComing, setOnComing] = useState(null)
  const [onGoing, setOnGoing] = useState(null)
  const [history, setHistory] = useState(null)

  const [update, setUpdate] = useState()

  const buttons = document.querySelectorAll('button[role="tab"]')

  useEffect(() => {
    const getDataBookingByStudent = async() => {
        const Data = await axios.get(
          `${BASE_URL}/booking/students`,
          {
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Access-Control-Allow-Origin': "*"
            }
          }
        )

        const response = Data.data.data
        setOnComing(response.booking_lists.filter(item => item.booking_status == 'pending'))
        setOnGoing(response.booking_lists.filter(item => item.booking_status == 'ongoing'))
        setHistory(response.booking_lists.filter(item => item.booking_status == 'complete' || item.booking_status == 'expired'))
        setBookingByStudent(response.booking_lists)
    }

    const getDataBookingByTentor = async() => {
        const Data = await axios.get(
          `${BASE_URL}/booking/tentors`,
          {
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Access-Control-Allow-Origin': "*"
            }
          }
        )

        const response = Data.data.data
        setOnComing(response.booking_lists.filter(item => item.booking_status == 'pending'))
        setOnGoing(response.booking_lists.filter(item => item.booking_status == 'ongoing'))
        setHistory(response.booking_lists.filter(item => item.booking_status == 'complete' || item.booking_status == 'expired'))
        setBookingByTentor(response.booking_lists)
    }
    if(isRole == 'student'){
      getDataBookingByStudent();
    }else if(isRole == 'tentor'){
      getDataBookingByTentor();
    }
  }, [update])


  return (
    <DashboardLayout>
      <Flex
        flexDirection="column"
        p="24px"
        bg="white"
        w={["100%","868px"]}
        minH="80vh"
        borderRadius="8px"
        boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
        gap="20px"
        overflow={["auto", "unset"]}
      >
        <Heading fontSize="xl" fontWeight="medium">
          Jadwal
        </Heading>
        {isRole == "student" && (
          <Tabs
            defaultIndex={0}
            isLazy
            w="full"
            maxW="759px"
            borderColor="#D9D9D9"
          >
            <TabList gap="32px">
              <Tab
                p="8px 0px"
                fontSize={["sm","lg"]}
                fontWeight="medium"
                color="#667085"
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Akan Datang
              </Tab>
              <Tab
                p="8px 0px"
                fontSize={["sm","lg"]}
                color="#667085"
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Sedang Berlangsung
              </Tab>
              <Tab
                p="8px 0px"
                fontSize={["sm","lg"]}
                color="#667085"
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Riwayat
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="24px 0px 24px 0px">
                <Accordion allowToggle>
                  {onComing != null ? onComing.map((item, index) => {
                    return (
                      <Box key={index}>
                        <StudentPrivateScheduleAccordion
                          tentorImg={item.tentor_image}
                          tentorName={item.tentor_name}
                          privateMeet={item.study_preference}
                          scheduleDate={item.study_schedule}
                          scheduleTime={`${item.choose_time} WIB`}
                          scheduleDuration={`${item.choose_duration} Jam`}
                          privateStatus="accepted"
                          selectedCourse={item.choose_course}
                          privateLocation={item.student_address}
                          tentorPhone={item.tentor_phone}
                          bookingId={item.id}
                        />
                      </Box>
                    )
                  }) : null}
                </Accordion>
              </TabPanel>
              <TabPanel p="24px 0px 24px 0px">
                <Accordion allowToggle>
                  {onGoing != null ? onGoing.map((item, index) => {
                    return (
                      <Box key={index}>
                        <StudentPrivateScheduleAccordion
                          tentorImg={item.tentor_image}
                          tentorName={item.tentor_name}
                          privateMeet={item.study_preference}
                          scheduleDate={item.study_schedule}
                          scheduleTime={`${item.choose_time} WIB`}
                          scheduleDuration={`${item.choose_duration} Jam`}
                          privateStatus="ongoing"
                          selectedCourse={item.choose_course}
                          privateLocation={item.student_address}
                          tentorPhone={item.tentor_phone}
                          isValidatedByTentor={item.isValidatedByTentor == 1 ? true : false}
                          topicClass={item.topic_class}
                          bookingId={item.id}
                          tentorId={item.tentor_id}
                          studentId={item.user_id}
                          trigerUpdate={setUpdate}
                          buttons={buttons}
                        />
                      </Box>
                    )
                  }) : null}
                </Accordion>
              </TabPanel>
              <TabPanel p="24px 0px">
                <Accordion allowToggle>
                  {history != null ? history.map((item, index) => {
                    return (
                      <Box key={index}>
                        <StudentPrivateScheduleAccordion
                          tentorImg={item.tentor_image}
                          tentorName={item.tentor_name}
                          privateMeet={item.study_preference}
                          scheduleDate={item.study_schedule}
                          scheduleTime={`${item.choose_time} WIB`}
                          scheduleDuration={`${item.choose_duration} Jam`}
                          privateStatus={item.booking_status}
                          selectedCourse={item.choose_course}
                          privateLocation={item.student_address}
                          tentorPhone={item.tentor_phone}
                          topicClass={item.topic_class}
                          bookingId={item.id}
                        />
                      </Box>
                    )
                  }) : null}
                </Accordion>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        {isRole == "tentor" && (
          <Tabs
            defaultIndex={0}
            isLazy
            w="full"
            maxW="759px"
            borderColor="#D9D9D9"
          >
            <TabList gap="32px">
              <Tab
                p="8px 0px"
                fontSize={["sm","lg"]}
                fontWeight="medium"
                color="#667085"
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Akan Datang
              </Tab>
              <Tab
                p="8px 0px"
                fontSize={["sm","lg"]}
                color="#667085"
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Sedang Berlangsung
              </Tab>
              <Tab
                p="8px 0px"
                fontSize={["sm","lg"]}
                color="#667085"
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Riwayat
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="24px 0px 24px 0px">
                <Accordion allowToggle>
                  {onComing != null ? onComing.map((item, index) => {
                    return (
                      <Box key={index}>
                        <TentorPrivateScheduleAccordion
                          studentImg={item.student_image}
                          studentName={item.student_name}
                          privateMeet={item.study_preference}
                          scheduleDate={item.study_schedule}
                          scheduleTime={item.choose_time}
                          scheduleDuration={item.choose_duration}
                          privateStatus="accepted"
                          selectedCourse={item.choose_course}
                          privateLocation={item.student_address}
                          studentPhone={item.student_phone}
                          bookingId={item.id}
                          trigerUpdate={setUpdate}
                          buttons={buttons}
                        />
                      </Box>
                    )
                  }) : null}
                </Accordion>
              </TabPanel>
              <TabPanel p="24px 0px 24px 0px">
                <Accordion allowToggle>
                  {onGoing != null ? onGoing.map((item, index) => {
                    return (
                      <Box key={index}>
                        <TentorPrivateScheduleAccordion
                          studentImg={item.student_image}
                          studentName={item.student_name}
                          privateMeet={item.study_preference}
                          scheduleDate={item.study_schedule}
                          scheduleTime={item.choose_time}
                          scheduleDuration={item.choose_duration}
                          privateStatus="ongoing"
                          selectedCourse={item.choose_course}
                          privateLocation={item.student_address}
                          studentPhone={item.student_phone}
                          isValidatedByTentor={item.isValidatedByTentor == 1 ? true : false}
                          bookingId={item.id}
                          trigerUpdate={setUpdate}
                        />
                      </Box>
                    )
                  }): null}
                </Accordion>
              </TabPanel>
              <TabPanel p="24px 0px 24px 0px">
                <Accordion allowToggle>
                  {history != null ? history.map((item, index) => {
                    return ( 
                      <Box key={index}>
                        <TentorPrivateScheduleAccordion
                          studentImg={item.student_image}
                          studentName={item.student_name}
                          privateMeet={item.study_preference}
                          scheduleDate={item.study_schedule}
                          scheduleTime={item.choose_time}
                          scheduleDuration={item.choose_duration}
                          selectedCourse={item.choose_course}
                          privateStatus={item.booking_status}
                          privateLocation={item.student_address}
                          studentPhone={item.student_phone}
                          bookingId={item.id}
                        />
                      </Box>
                    )
                  }): null}
                </Accordion>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </DashboardLayout>
  );
};

export default Schedule;
