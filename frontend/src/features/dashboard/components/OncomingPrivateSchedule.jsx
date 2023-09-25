import React, {useState, useEffect} from "react";
import { Box, Heading, Text, Flex, Link } from "@chakra-ui/react";
import PrivateScheduleItem from "./PrivateScheduleItem";
import axios from 'axios';
import { useSelector } from "react-redux";
import {Link as LinkRouter} from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// import { dataDummy } from "../../../data/generateDummy";
// import { dataDummy as dummy2 } from "../../../data/transactionDummy";

// const Data = JSON.parse(dataDummy)
// const Tentor = Data.tentor

// const Data2 = JSON.parse(dummy2)
// const Transactions = Data2.transactions


const OncomingPrivateSchedule = () => {
  let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

  if(!isAuth){
      isAuth = localStorage.getItem('isAuth')
      isRole = localStorage.getItem('role')
      user = JSON.parse(localStorage.getItem('user'))
      token = localStorage.getItem('token')
  }

  const [booking, setBooking] = useState()
  useEffect(() => {
    const getDataBooking = async() => {
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
        setBooking(response.booking_lists.filter(item => item.booking_status == 'pending'))
    }
    getDataBooking();
  }, [])
  return (
    <Box
      bg="white"
      borderRadius="8px"
      p="24px"
      w={["full","512px"]}
      h="498px"
      gap="24px"
      boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
      overflowY="auto"
    >
      <Flex justifyContent="space-between" mb="24px">
        <Heading fontSize="20px" fontWeight="medium">
          Private yang akan datang
        </Heading>
        <Link as={LinkRouter} to="/dashboard/schedule" _hover={{ textDecor: "none" }}>
          <Text
            color="brand.500"
            fontWeight="medium"
            _hover={{ color: "brand.400" }}
            _active={{ color: "brand.700" }}
          >
            Lihat Semua
          </Text>
        </Link>
      </Flex>
      <Flex flexDirection="column" gap="16px">
        {booking != null ? booking.map((item, index) => {
          return (
            <Box key={index}>
              <PrivateScheduleItem
                tentorImg={item.tentor_image}
                tentorName={item.tentor_name}
                privateMeet={item.study_preference}
                scheduleDate={item.study_schedule}
                scheduleTime={`${item.choose_time} WIB`}
                scheduleDuration={`${item.choose_duration} Jam`}
              />
            </Box>
          )
        }) : null}
      </Flex>
    </Box>
  );
};

export default OncomingPrivateSchedule;
