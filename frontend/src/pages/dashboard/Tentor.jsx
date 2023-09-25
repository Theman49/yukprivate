import React, {useState, useEffect} from "react";
import { Flex, Heading, SimpleGrid, Box } from "@chakra-ui/react";
import DashboardLayout from "../../layouts/DashboardLayout";
import TentorFavoriteItem from "../../features/dashboard/components/TentorFavoriteItem";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// import { dataDummy } from "../../data/generateDummy";

// const Data = JSON.parse(dataDummy)
// const TentorData = Data.tentor

const Tentor = () => {
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
    <DashboardLayout>
      <Flex
        flexDirection="column"
        p="24px"
        bg="white"
        w={["full","868px"]}
        minH="80vh"
        borderRadius="8px"
        boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
        gap="20px"
      >
        <Heading fontSize="xl" fontWeight="medium">
          Tentor
        </Heading>
        <SimpleGrid minChildWidth="390px" spacing="24px">
          {dataTentor != null ? dataTentor.map((item, index) => {
            return index < 5 ?
            (
              <Box key={index}>
                <TentorFavoriteItem
                  tentorImg={item.url_picture}
                  tentorRating={`4.${Math.round((Math.random() * 8) + 1)}`}
                  tentorName={item.name}
                  tentorPlace={item.institution_name}
                  tentorJob="Mahasiswa"
                  tentorCourse={item.course_interest}
                  tentorLocation={item.address}
                />
              </Box>
            ) : null
          }) : null}
        </SimpleGrid>
      </Flex>
    </DashboardLayout>
  );
};

export default Tentor;
