import React, {useEffect, useState} from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import HomeLayout from "../../layouts/HomeLayout";
import TentorHeader from "../../features/home/components/TentorHeader";
import BgSample from "../../assets/images/BgSample.png";
import OverviewContent from "../../features/home/components/OverviewContent";
import GalleryContent from "../../features/home/components/GalleryContent";
import ReviewContent from "../../features/home/components/ReviewContent";
import LocationTentor from "../../features/home/components/LocationTentor";
import BookingTentor from "../../features/home/components/BookingTentor";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { dataDummy } from "../../data/generateDummy";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Booking = () => {
  const params = useLocation();
  const idTentor = (params.pathname).split('/')[3];
  const [dataTentor, setDataTentor] = useState()
  const [dataReview, setDataReview] = useState()
  const [dataGalery, setDataGalery] = useState()

  useEffect(() => {
    const updateDataTentor = async() => {
      // setDataTentor(Data.tentor)
      const getTentorRequest = await axios.get(
        `${BASE_URL}/tentors/${idTentor}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      const getTentorResult = getTentorRequest.data
      setDataTentor(getTentorResult.data)
    }
    const getDataReviews = async() => {
      const getReview = await axios.get(
        `${BASE_URL}/tentors/reviews/${idTentor}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      const getReviewResult = getReview.data.data.tentor_reviews
      setDataReview(getReviewResult)
    }
    const getDataGalery = async() => {
      const getGalery = await axios.get(
        `${BASE_URL}/tentors/galery/${idTentor}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      const getGaleryResult = getGalery.data.data.tentor_galeries
      setDataGalery(getGaleryResult)
    }
    updateDataTentor()
    getDataReviews()
    getDataGalery()
  }, [])

  // const Data = JSON.parse(dataDummy);
  // const Tentor = Data.tentor[idTentor]

  const aboutMe = (getInstitution, getCourses) => `Saya mahasiswa di ${getInstitution} yang memiliki pengalaman mengajar privat SD SMP & SMA selama 4 tahun serta mengajar di sekolah 1 tahun. Saya berpengalaman dalam mengajar mata pelajaran ${getCourses}. Saya memiliki keahlian di bidang karya ilmiah. Saya selalu berusaha membuat kelas belajar yang menyenangkan dan nyaman agar siswa dapat menerima ilmu yang disampaikan dengan baik.`


  return dataTentor != null && dataReview != null && dataGalery != null ? (
    <HomeLayout>
      <Flex flexDir={['column', 'row']} mt="40px" w="full" mb="100px" gap="24px">
        <Flex flexDirection="column" gap="24px">
          <TentorHeader
            name={dataTentor.tentors_by_id.register.name}
            location={dataTentor.tentors_by_id.address}
            jobPosition="Mahasiswa"
            jobPlace={dataTentor.tentors_by_id.institution_name}
            avatarImg={dataTentor.tentors_by_id.url_picture}
            headerImg={BgSample}
          />
          <Tabs variant="unstyled" defaultIndex={0} isLazy>
            <TabList>
              <Tab
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Overview
              </Tab>
              <Tab
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Galeri
              </Tab>
              <Tab
                _selected={{
                  color: "brand.500",
                  borderBottom: "3px solid #69D3CF",
                }}
              >
                Ulasan
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="24px 0px 24px 0px">
                <OverviewContent 
                  // aboutMe={aboutMe(dataTentor.tentors_by_id.institution_name, dataTentor.tentors_by_id.tentor_proposals[0].course_interest)}
                  aboutMe={dataTentor.tentors_by_id.tentor_proposals[0].tentor_introduction}
                  courses={dataTentor.tentors_by_id.tentor_proposals[0].course_interest.split(",")}
                  experiences={dataTentor.tentors_by_id.tentor_experiences}
                  achievements={dataTentor.tentors_by_id.tentor_achievements}
                />
              </TabPanel>
              <TabPanel p="24px 0px 24px 0px">
                <GalleryContent dataGalery={dataGalery}/>
              </TabPanel>
              <TabPanel p="24px 0px 24px 0px">
                <ReviewContent dataReview={dataReview} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>

        <Flex flexDirection="column" gap="24px">
          <LocationTentor />
          <BookingTentor dataTentor={dataTentor}/>
        </Flex>
      </Flex>
    </HomeLayout>
  ): null;
};

export default Booking;
