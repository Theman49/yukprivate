import React from "react";
import { Box, Flex, Text, Container } from "@chakra-ui/react";
import NavbarAuth from "../components/navbar/NavbarAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import BgAuthFirst from "../assets/images/auth/BgAuthFirst.png";
import BgAuthSecond from "../assets/images/auth/BgAuthSecond.png";
import BgAuthThird from "../assets/images/auth/BgAuthThird.png";

const Content = ({ text, bgImage }) => {
  return (
    <Box bgImage={bgImage} bgSize="cover" h="100%" pt="80px" ps="50px">
      <Text fontSize="4xl" fontWeight="700" color="white">
        {text}
      </Text>
    </Box>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <Box w="full" minH="100vh">
      <Flex flexDir={['column', 'row']}>
        <Box w="full">
          <NavbarAuth />
          <Box w="full">
            <Container py="116px" maxW="80%">
              {children}
            </Container>
          </Box>
        </Box>

        <Box display={['none', 'block']} minH="100vh" w="full" overflowX="hidden">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 1500 }}
            style={{
              height: "100%",
            }}
          >
            <SwiperSlide>
              <Content
                text="Belajar bersama terbaik dari Yuk Private"
                bgImage={BgAuthFirst}
              ></Content>
            </SwiperSlide>
            <SwiperSlide>
              <Content
                text="Dapatkan Guru Les Privat Terbaik Dalam Hitungan Detik"
                bgImage={BgAuthSecond}
              ></Content>
            </SwiperSlide>
            <SwiperSlide>
              <Content
                text="Sesuaikan Kebutuhan Belajar Bersama Kami"
                bgImage={BgAuthThird}
              ></Content>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthLayout;
