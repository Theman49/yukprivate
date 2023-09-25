import React, {useState, useEffect} from "react";
import {
  Box,
  Flex,
  Container,
  HStack,
  Heading,
  Text,
  Image,
  IconButton,
  Input,
  Divider,
  Select,
  Button,
  Link,
  Accordion,
} from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { MdSearch } from "react-icons/md";
import HowToCard from "../../features/home/components/HowToCard";
import ProgramCard from "../../features/home/components/ProgramCard";
import TentorInfoCard from "../../features/home/components/TentorInfoCard";
import FAQAccordion from "../../features/home/components/FAQAccordion";
import ReviewBox from "../../features/home/components/ReviewBox";
import { ReactComponent as VectorLine } from "../../assets/illustrations/VectorLine.svg";
import { ReactComponent as VectorArrow } from "../../assets/illustrations/VectorArrow.svg";
import { ReactComponent as VectorDot } from "../../assets/illustrations/VectorDot.svg";
import { ReactComponent as VectorQuote } from "../../assets/illustrations/VectorQuote.svg";
import IconCampus from "../../assets/icons/IconCampus.png";
import IconMentoring from "../../assets/icons/IconMentoring.png";
import IconBook from "../../assets/icons/IconBook.png";
import IconCashRegister from "../../assets/icons/IconCashRegister.png";
import IconMan from "../../assets/icons/IconMan.png";
import IconGroupMeeting from "../../assets/icons/IconGroupMeeting.png";
import IconTentor from "../../assets/icons/IconTentor.png";
import IconOffline from "../../assets/icons/IconOffline.png";
import IconWebinar from "../../assets/icons/IconWebinar.png";
import IconOk from "../../assets/icons/IconOk.png";
import Cover from "../../assets/images/Cover.png";
import Map from "../../assets/images/Map.png";
import Wave from "../../assets/images/Wave.png";
import BgRegisterNow from "../../assets/images/BgRegisterNow.png";
import MemberAndTentor from "../../assets/images/MemberAndTentor.png";
import Benefit from "../../assets/images/Benefit.png";
import Emoticon from "../../assets/images/Emoticon.png";
import HomeLayout from "../../layouts/HomeLayout";
import { useSelector } from "react-redux";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Home = () => {
  let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

  if(!isAuth){
      isAuth = localStorage.getItem('isAuth')
      isRole = localStorage.getItem('role')
      user = JSON.parse(localStorage.getItem('user'))
      token = localStorage.getItem('token')
  }

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
    <HomeLayout>
      <Flex
        gap="40px"
        mt="40px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDirection="column" w={["100%", "60%"]} gap="20px">
          <Flex w="full" flexDirection="column">
            <Box>
              <Heading fontSize="50px" fontWeight="bold">
                Temukan Pendamping Belajarmu Yang Terbaik
              </Heading>
              <Heading as="span" pos="relative" fontSize="50px" fontWeight="bold">
                Yuk Private.
                <Flex pos="absolute" maxW="280.5px">
                  <VectorLine />
                </Flex>
              </Heading>
            </Box>
            {/* <Heading display={['block', 'none']} fontSize="36px" fontWeight="bold">
              Raih PTN Impianmu Bersama Tentor Terbaik
            </Heading> */}
          </Flex>
          <Text
            fontSize="18px"
            fontWeight="medium"
            color="gray"
            mb="12px"
            mt="10px"
          >
            Bersama Yuk Private kamu bisa belajar dimana saja dan kapan saja
            dengan tentor terbaik di bidangnya.
          </Text>
          
        </Flex>
        <Image display={['none', 'block']} w="40%" src={Cover} alt="yukprivate-cover" />
      </Flex>
      <Flex
        gap={["20px", "38px"]}
        justifyContent="space-between"
        alignItems={["baseline", "center"]}
        pos="relative"
        flexDir={['column', 'row']}
        mt={["30px", "0"]}
      >
        <Flex display={['none', 'block']} ml="-75px" pos="absolute" top="10px">
          <VectorArrow />
        </Flex>
        <Flex
          flexDirection="column"
          align-items="flex-start"
          w={["100%", "50%"]}
          gap="20px"
        >
          <Flex flexDirection="column" align-items="flex-start" gap="8px">
            <Text color="brand.500" fontSize="18px" fontWeight="medium">
              Tentor dan Siswa
            </Text>
            <Heading fontSize="36px" fontWeight="semibold">
              Bergabung Bersama Tentor Dan Siswa Yuk Private
            </Heading>
          </Flex>
          <Text fontWeight="medium" color="#475467">
            Temukan lebih dari 50+ Tentor dan 500+ Siswa yang bergabung dengan
            Yuk Private
          </Text>
          <Image maxW="210px" src={MemberAndTentor} alt="joined-people" />
        </Flex>
        <Image w={["100%", "50%"]} src={Map} alt="yukprivate-map" />
      </Flex>
      <Flex flexDirection="column" gap="60px" mb="150px" w="100%">
        <Flex flexDirection="column" textAlign="center" gap="20px">
          <Flex textAlign="center" flexDirection="column" gap="8px">
            <Text fontSize="lg" color="brand.500" fontWeight="medium">
              Join dengan Yuk Private
            </Text>
            <Heading w={["80%", "100%"]} margin="0 auto" fontSize={["2xl", "4xl"]} fontWeight="semibold">
              Cara Bergabung dengan Yuk Private
            </Heading>
          </Flex>
          <Text fontSize="lg" color="#475467" fontWeight="medium">
            Langkah-langkah untuk kamu bergabung ke Yuk Private
          </Text>
        </Flex>
        <Flex gap="40px" overflowX={["auto", "unset"]}>
          <HowToCard
            number="1"
            title="Daftar Akun"
            paragraph="Lakukan pendaftaran akun dan lengkapi data diri"
            bgColor="#FECDCA"
            icon={IconCashRegister}
          />
          <HowToCard
            number="2"
            title="Pilih Tentor"
            paragraph="Pilih tentor yang sesuai dengan yang pelajaran yang ingin dipelajari"
            bgColor="#A6F4C5"
            icon={IconMan}
          />
          <HowToCard
            number="3"
            title="Pilih Jadwal"
            paragraph="Tentukan jadwal belajar bersama tentor mu"
            bgColor="#BED2FF"
            icon={IconGroupMeeting}
          />
          <HowToCard
            number="4"
            title="Checkout"
            paragraph="Lakukan checkout, setelah itu kamu bisa belajar bersama tentor mu"
            bgColor="#FEDF89"
            icon={IconOk}
          />
        </Flex>
        <Flex
          pos="absolute"
          top={["1700px", "1500px"]}
          left="0"
          zIndex="-1"
          w="100vw"
          minH="300px"
          bgImage={Wave}
        />
      </Flex>
      <Flex mb="100px" gap="40px" flexDir={['column', 'row']}>
        <Flex flexDirection="column" textAlign="start" gap="20px" minW="270px">
          <Flex textAlign="start" flexDirection="column" gap="8px">
            <Text fontSize="lg" color="brand.500" fontWeight="medium">
              Program
            </Text>
            <Heading fontSize="4xl" fontWeight="semibold">
              Program Di Yuk Private
            </Heading>
          </Flex>
          <Text fontSize="lg" color="#475467" fontWeight="medium">
            Ikuti program - program menarik yang ada di Yuk Private
          </Text>
          <Button
            p="16px 32px"
            color="white"
            bg="brand.500"
            _hover={{ bg: "brand.400" }}
            _active={{ bg: "brand.700" }}
            maxW="185px"
          >
            Lihat Program
          </Button>
        </Flex>
        <ProgramCard
          icon={IconCampus}
          title="Les Private Dengan Tentor"
          paragraph="Belajar bersama tentor terbaik dengan metode belajar yang asyik dan interaktif"
        />
        <ProgramCard
          icon={IconMentoring}
          title="Konsultasi Seputar Perguruan Tinggi"
          paragraph="Lebih terarah dengan konsultasi kepada tenor yang berpengalaman di bidangnya"
        />
        <ProgramCard
          icon={IconBook}
          title="Latihan Soal Try Out Online & Webinar"
          paragraph="Latihan soal Try Out lengkap dengan pembahasan yang mudah dipahami"
        />
      </Flex>
      <Flex w="100%" overflowX={["auto", "unset"]} flexDirection="column" gap="60px" pos="relative" mb="100px">
        <Flex flexDirection="column" textAlign="center" gap="20px">
          <Flex textAlign="center" flexDirection="column" gap="8px">
            <Text fontSize="lg" color="brand.500" fontWeight="medium">
              Tentor Yuk Private
            </Text>
            <Heading w={["80%", "100%"]} margin="0 auto" fontSize={["2xl", "4xl"]} fontWeight="semibold">
              Belajar Bersama Tentor Terbaik
            </Heading>
          </Flex>
          <Text fontSize="lg" color="#475467" fontWeight="medium">
            Tentor terbaik yang siap membantumu untuk belajar
          </Text>
        </Flex>
        <Flex flexDirection="column" gap="32px">
          <Flex display={['none', 'flex']} w="full" justifyContent="flex-end">
            <Link
              as={LinkRouter}
              to="/explore"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Button
                variant="outline"
                color="brand.500"
                _hover={{ color: "brand.400" }}
                _active={{ color: "brand.700" }}
              >
                Lihat Semua Tentor
              </Button>
            </Link>
          </Flex>

          <Flex maxW="1200px">
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 8
                },
                450: {
                  slidesPerView: 4,
                  spaceBetween: 20
                },

              }}  
              style={{ padding: "24px 16px", borderRadius: "16px" }}
            >
              {dataTentor != null ? dataTentor.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <TentorInfoCard
                      tentorImg={item.url_picture}
                      tentorRating={`4.${Math.round((Math.random() * 8) + 1)}`}
                      tentorName={item.name}
                      tentorPlace={item.institution_name}
                      tentorJob="Mahasiswa"
                      tentorCourse={item.course_interests}
                      tentorLocation={item.address}
                      tentorId={item.id}
                    />
                  </SwiperSlide>
                )
              }) : null}
            </Swiper>
            <Flex pos="absolute" left="-120px" top="120px" zIndex="-1">
              <VectorDot />
            </Flex>
            <Flex pos="absolute" right="-120px" bottom="-90px" zIndex="-1">
              <VectorDot />
            </Flex>
          </Flex>

          <Flex display={['flex', 'none']} w="full" justifyContent="center">
            <Link
              as={LinkRouter}
              to="/explore"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Button
                variant="outline"
                color="brand.500"
                _hover={{ color: "brand.400" }}
                _active={{ color: "brand.700" }}
              >
                Lihat Semua Tentor
              </Button>
            </Link>
          </Flex>

        </Flex>
      </Flex>
      <Flex gap="40px" pos="relative" mb="100px" display={['none', 'flex']}>
        <Flex flexDirection="column" gap="40px">
          <ProgramCard
            icon={IconBook}
            title="Latihan Soal Try Out"
            paragraph="Latihan soal Try Out lengkap dengan pembahasan yang mudah dipahami"
          />
          <ProgramCard
            icon={IconTentor}
            title="Tentor Berpengalaman"
            paragraph="Tentor berpengalaman yang sudah ahli di bidangnya"
          />
          <ProgramCard
            icon={IconCampus}
            title="Informasi Mengenai PTN"
            paragraph="Pemberian informasi akurat seputar PTN di Indonesia"
          />
        </Flex>
        <Flex flexDirection="column" gap="40px" mt="120px" pb="60px">
          <ProgramCard
            icon={IconMentoring}
            title="Konsultasi Dengan Tentor"
            paragraph="Pemberian motivasi kepada seluruh siswa seputar PTN"
          />
          <ProgramCard
            icon={IconOffline}
            title="Les Private Offline"
            paragraph="Tutoring kepada siswa yang membutuhkan tambahan belajar"
          />
          <ProgramCard
            icon={IconWebinar}
            title="Webinar"
            paragraph="Webinar Yuk Private siap menemani perjuanganmu menuju Kampus Impian"
          />
        </Flex>
        <Flex flexDirection="column" textAlign="start" gap="20px" minW="370px">
          <Flex textAlign="start" flexDirection="column" gap="8px">
            <Text fontSize="lg" color="brand.500" fontWeight="medium">
              Benefit
            </Text>
            <Heading fontSize="4xl" fontWeight="semibold">
              Mengapa Memilih Yuk Private
            </Heading>
          </Flex>
          <Text fontSize="lg" color="#475467" fontWeight="medium">
            Ikuti program - program menarik yang ada di Yuk Private
          </Text>
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <Button
              p="16px 32px"
              color="white"
              bg="brand.500"
              _hover={{ bg: "brand.400" }}
              _active={{ bg: "brand.700" }}
              maxW="210px"
            >
              Lihat Program
            </Button>
          </Link>
        </Flex>
        <Image
          src={Benefit}
          alt="benefit-yukprivate"
          pos="absolute"
          right="-100px"
          bottom="0px"
          maxW="630px"
        />
      </Flex>
      <Flex gap="20px" flexDir={['column', 'row']}>
        <Flex flexDirection="column" textAlign="start" gap="20px" w={["full","50%"]}>
          <Flex textAlign={["center","start"]} flexDirection="column" gap="8px">
            <Text fontSize="lg" color="brand.500" fontWeight="medium">
              Testimoni Siswa
            </Text>
            <Heading fontSize={["2xl","4xl"]} w={["60%", "full"]} m={["0 auto", "0"]} fontWeight="semibold">
              Lihat apa yang dikatakan siswa kami
            </Heading>
          </Flex>
          <Text textAlign={["center", "start"]} fontSize={["sm","lg"]} w={["60%", "full"]} m={["0 auto", "0"]} color="#475467" fontWeight="medium">
            Temukan lebih dari 50+ Tentor dan 500+ Siswa yang bergabung dengan
            Yuk Private
          </Text>
          <Image src={Emoticon} alt="emoticon" maxW="196px"  m={["0 auto", "0"]}/>
        </Flex>
        <Flex
          bg="#4CB0B5"
          borderRadius="20px"
          flexDirection="column"
          p="40px"
          gap="20px"
          w={["full","50%"]}
          pos="relative"
        >
          <Flex w={["300px","500px"]}>
            <Swiper
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <ReviewBox />
              </SwiperSlide>
              <SwiperSlide>
                <ReviewBox />
              </SwiperSlide>
              <SwiperSlide>
                <ReviewBox />
              </SwiperSlide>
            </Swiper>
          </Flex>
          <Flex pos="absolute" right="4%" top="-9%">
            <VectorQuote />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bgImage={BgRegisterNow}
        backgroundSize="cover"
        borderRadius="20px"
        flexDirection="column"
        w="100%"
        maxH="400px"
        alignItems="center"
        textAlign="center"
        gap="60px"
        p={["20px 35px","96px 207px"]}
        mb="100px"
        mt="100px"
      >
        <Heading fontWeight="bold" fontSize={["2xl","4xl"]} color="white">
          Temukan Tentormu Dan Raih PTN Impianmu di Yuk Private
        </Heading>
        <Link
          as={LinkRouter}
          to="/register"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            color="brand.500"
            fontWeight="semibold"
            bg="white"
            _hover={{ bg: "whiteAlpha.700" }}
            _active={{ bg: "whiteAlpha.900" }}
            h="60px"
            p="16px 32px"
          >
            Daftar Sekarang
          </Button>
        </Link>
      </Flex>
      <Flex flexDirection="column" w="100%" gap="60px" mb="100px">
        <Flex flexDirection="column" textAlign="center" gap="8px">
          <Text fontWeight="medium" fontSize="lg" color="brand.500">
            FAQ
          </Text>
          <Heading fontWeight="semibold" fontSize="4xl">
            Paling Sering Ditanyakan
          </Heading>
        </Flex>
        <Accordion allowToggle>
          <FAQAccordion
            title="Dimana Les Private di lakukan apabila secara Offline?"
            content="Les Private akan dilakukan di rumah Kamu. Nanti Tentor akan datang ke rumah Kamu sesuai jadwal yang Kamu pilih."
          />
          <FAQAccordion
            title="Yuk Private Terxsedia Didaerah mana saja?"
            content="Untuk saat ini Yuk Private hanya tersedia di Kota Semarang saja."
          />
          <FAQAccordion
            title="Apakah Saya Bisa Menentukan Jadwal Lesnya?"
            content="Tentu saja bisa, Kamu bisa menyesuaikan jadwal les sesuai dengan yang Kamu inginkan."
          />
          <FAQAccordion
            title="Berapa Lama Durasi Dalam 1x Kali Pertemuan?"
            content="Yuk Private memberika 3 pilihan untuk durasi pertemuan, yaitu 1 jam, 2 jam, dan 3 jam."
          />
          <FAQAccordion
            title="Apakah Tentor Di Yuk Private Berkualitas?"
            content="Ya, Kami selalu menyeleksi setiap Tentor yang ingin mendaftar. Jadi Tentor
            di Yuk Private adalah Tentor yang berkualitas dan tentunya memiliki banyak pengalaman dalam mengajar."
          />
          <FAQAccordion
            title="Apakah Bisa Memesan Lebih Dari 1 Mata Pelajaran?"
            content="Kamu bisa memesan lebih dari 1 mata pelajaran walaupun hanya 1x pertemuan saja."
          />
        </Accordion>
      </Flex>
    </HomeLayout>
  );
};

export default Home;
