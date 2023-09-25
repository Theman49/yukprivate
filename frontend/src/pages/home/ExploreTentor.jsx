import React, {useRef, useEffect, useState} from "react";
import {
  Flex,
  Box,
  Grid,
  Heading,
  Input,
  Text,
  Divider,
  Button,
  GridItem,
} from "@chakra-ui/react";
import { MdClear, MdSearch } from "react-icons/md";
import HomeLayout from "../../layouts/HomeLayout";
import TentorInfoCard from "../../features/home/components/TentorInfoCard";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;


// import {dataDummy} from '../../data/generateDummy'

// const Data = JSON.parse(dataDummy)
// const FirstDataTentor = Data.tentor

const ExploreTentor = () => {
  const courseField = useRef()
  const locationField = useRef()
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



  const onSearch = async() => {
    const getCourseField = (courseField.current.value).toLowerCase()
    const getLocationField = (locationField.current.value).toLowerCase()

    const getTentorsBySearchRequest = await axios.get(
      `${BASE_URL}/tentors/search?address=${getLocationField}&course_interest=${getCourseField}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
    const getTentorsBySearchResult = getTentorsBySearchRequest.data
    setDataTentor(getTentorsBySearchResult.data.get_all_tentors)
  }

  const onReset = () => {
    courseField.current.value = ""
    locationField.current.value = ""

    onSearch()
  }

  return (
    <HomeLayout>
      <Flex
        mt="40px"
        gap="40px"
        flexDirection="column"
        justifyContent="start"
        w="full"
        mb="100px"
      >
        <Heading>Temukan Tentor Kamu</Heading>

        <Flex
          borderRadius="12px"
          p="12px"
          justifyContent="space-between"
          alignItems="center"
          boxShadow="0px 6px 40px rgba(0, 0, 0, 0.1)"
          w={["100%", "700px"]}
          h="64px"
          border="1px solid #D0D5DD"
        >
          <Input
            placeholder="Mata Pelajaran"
            color="gray"
            variant="unstyled"
            w="200px"
            ref={courseField}
          />
          <Box h="29px">
            <Divider mr={[2, 0]} orientation="vertical" color="#98A2B3" />
          </Box>
          <Input
            placeholder="Lokasi"
            color="gray"
            variant="unstyled"
            w="128px"
            ref={locationField}
          />
          <Button
            leftIcon={<MdSearch fontSize="24px" />}
            iconSpacing={[0, 1]}
            color="white"
            bg="brand.500"
            _hover={{ bg: "brand.400" }}
            _active={{ bg: "brand.700" }}
            p="8px"
            mr={1}
            fontWeight="medium"
            onClick={onSearch}
          >
            <Text display={['none', 'block']}>Temukan Tentor</Text>
          </Button>
          <Button
            leftIcon={<MdClear fontSize="24px" />}
            iconSpacing={[0, 1]}
            color="white"
            bg="brand.500"
            _hover={{ bg: "brand.400" }}
            _active={{ bg: "brand.700" }}
            p="8px"
            fontWeight="medium"
            onClick={() => onReset()}
          >
            <Text display={['none', 'block']}>Reset</Text>
          </Button>
        </Flex>

        <Grid w="100%" templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]} gap={4}>
          {dataTentor != null ? 
            dataTentor.map((item, index) => {
              return (
                <GridItem key={index}>
                  <TentorInfoCard
                    tentorImg={item.url_picture}
                    tentorRating={`4.${Math.round((Math.random() * 8) + 1)}`}
                    tentorName={item.name}
                    tentorPlace={item.institution_name}
                    tentorJob="Mahasiswa"
                    tentorCourse={item.course_interest}
                    tentorLocation={item.address}
                    tentorId={item.id}
                  />
                </GridItem>
              )
            }) : null
          }
          {/* <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          />
          <TentorInfoCard
            tentorImg="https://bit.ly/dan-abramov"
            tentorRating="4.7"
            tentorName="Abdul Prasetyo"
            tentorPlace="Universitas Negeri Semarang"
            tentorJob="Mahasiswa"
            tentorCourse="Matematika, Biologi, Kimia"
            tentorLocation="Gunungpati, Semarang"
          /> */}
        </Grid>
      </Flex>
    </HomeLayout>
  );
};

export default ExploreTentor;
