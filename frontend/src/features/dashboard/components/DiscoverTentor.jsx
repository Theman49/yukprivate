import React, {useEffect, useState} from "react";
import { Box, Heading, Text, Flex, Link } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import TentorSimpleInfoCard from "./TentorSimpleInfoCard";
import "swiper/css";
import { dataDummy } from "../../../data/generateDummy";
import { dataDummy as dummy2 } from "../../../data/transactionDummy";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const Data = JSON.parse(dataDummy)
// const Tentor = Data.tentor

const Data2 = JSON.parse(dummy2)
const Transactions = Data2.transactions

const DiscoverTentor = () => {
  const [dataTentor, setDataTentor] = useState()

  useEffect(() => {
    const updateDataTentor = async() => {
      // setDataTentor(Data.tentor)
      const getTentorRequest = await axios.get(
        `${BASE_URL}/tentors/search`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      const getTentorResult = getTentorRequest.data
      setDataTentor(getTentorResult.data.get_all_tentors)
    }
    updateDataTentor()
  }, [])
  return (
    <Box
      bg="white"
      borderRadius="8px"
      p="24px"
      w={["full","868px"]}
      h="313px"
      boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
    >
      <Flex justifyContent="space-between">
        <Heading fontSize="20px" fontWeight="medium" mb="24px">
          Discover Tentor
        </Heading>
        <Link
          as={LinkRouter}
          to="#"
          textDecor="none"
          _hover={{ textDecor: "none" }}
        >
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
      <Flex>
        <Swiper spaceBetween={14} slidesPerView={2}>
          {dataTentor != null ? dataTentor.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <TentorSimpleInfoCard
                  tentorImg={item.url_picture}
                  tentorName={item.name}
                  tentorJob="Mahasiswa"
                  tentorCourseMastery={item.course_interest}
                  tentorPlace={item.address}
                  tentorId={item.id}
                  scheduleDate={Transactions[index].schedule}
                  scheduleTime={Transactions[index].time}
                />
              </SwiperSlide>
            )
          }) : null}
        </Swiper>
      </Flex>
    </Box>
  );
};

export default DiscoverTentor;
