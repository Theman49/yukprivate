import React, {useState, useEffect} from "react";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import TentorScheduleItem from "./TentorScheduleItem";
import { NavLink as LinkRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// import { dataDummy } from "../../../data/generateDummy";
// import { dataDummy as dummy2 } from "../../../data/transactionDummy";

// const Data = JSON.parse(dataDummy)
// const Tentor = Data.tentor

// const Data2 = JSON.parse(dummy2)
// const Transactions = Data2.transactions

const TentorSchedule = () => {
  let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

  if(!isAuth){
      isAuth = localStorage.getItem('isAuth')
      isRole = localStorage.getItem('role')
      user = JSON.parse(localStorage.getItem('user'))
      token = localStorage.getItem('token')
  }

  const [bookingToday, setBookingToday] = useState()
  useEffect(() => {
    const getDataBookingToday = async() => {
        const Data = await axios.get(
          `${BASE_URL}/booking/tentors/today`,
          {
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Access-Control-Allow-Origin': "*"
            }
          }
        )

        const response = Data.data.data
        setBookingToday(response.booking_lists.filter(item => item.booking_status == 'pending'))
    }
    getDataBookingToday();
  }, [])


  return (
    <Flex
      flexDirection="column"
      bg="white"
      borderRadius="8px"
      p="24px"
      w={["full", "422px"]}
      h="388px"
      gap="24px"
      boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
    >
      <Flex justifyContent="space-between" w="100%">
        <Heading fontSize="20px" fontWeight="medium">
          Jadwal Hari Ini
        </Heading>
        <Link
          as={LinkRouter}
          to="/dashboard/schedule"
          _hover={{ textDecor: "none" }}
        >
          <Text
            color="brand.500"
            fontWeight="medium"
            _hover={{ color: "brand.400" }}
            _active={{ color: "brand.700" }}
          >
            Lihat Jadwal
          </Text>
        </Link>
      </Flex>
      <Flex flexDirection="column" gap="16px">
        {bookingToday != null ? bookingToday.map((item, index) => {
          return (
            <Box key={index}>
              <TentorScheduleItem
                studentImg={item.student_image}
                studentName={item.student_name}
                privateMeet={item.study_preference}
                scheduleDate={item.study_schedule}
                scheduleTime={item.choose_time}
                scheduleDuration={`${item.choose_duration} Jam`}
              />
            </Box>
          )
        }) : null}
      </Flex>
    </Flex>
  );
};

export default TentorSchedule;
