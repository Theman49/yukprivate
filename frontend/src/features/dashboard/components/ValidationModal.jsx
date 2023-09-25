import React, { useState, useEffect, createRef } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Badge,
  Icon,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import InputFile from "../../auth/components/InputFile";
import FieldTextArea from "../../auth/components/FieldTextarea";
import { MdStarRate } from "react-icons/md";
import axios from 'axios';
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ValidationModal = ({ isOpened, onOpened, onClosed, topicClass, tentorId, studentId, bookingId, trigerUpdate, buttons }) => {
  let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

  if(!isAuth){
      isAuth = localStorage.getItem('isAuth')
      isRole = localStorage.getItem('role')
      user = JSON.parse(localStorage.getItem('user'))
      token = localStorage.getItem('token')
  }

  const [stars, setStars] = useState(0);
  const textReview = createRef();

  useEffect(() => {
    const setColorStars = () => {
      const getIcons = document.getElementsByClassName('rate-star')
      for(let i = 0; i < 5; i++){
        if(i < stars){
          getIcons[i].attributes[0].nodeValue = "#F79009"
          getIcons[i].attributes[1].nodeValue = "#F79009"
        }else{
          getIcons[i].attributes[0].nodeValue = "gray"
          getIcons[i].attributes[1].nodeValue = "gray"
        }
      }
    }
    if(stars > 0) setColorStars()
  }, [stars])

  const validation = async() => {
    const payload = {
      tentor_id: tentorId,
      user_id: studentId,
      rate: stars,
      text_review: textReview.current.value
    }
    const req = await axios.put(
      `${BASE_URL}/booking/validate/${bookingId}`,
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
      trigerUpdate('validate')
      onClosed()
      buttons[2].click();
    } 

  }


  return (
    <Modal
      isCentered
      onClose={onClosed}
      isOpen={isOpened}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent w="500px" h="272px" bg="white">
        <ModalBody bg="white" borderRadius="16px">
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap="10px">
            <Heading fontSize="xl" fontWeight="semibold">
              Validasi
            </Heading>
            <Text>Topik Kelas : {topicClass}</Text>
            <Heading fontSize="xl" fontWeight="semibold">
              Beri Ulasan Tentor
            </Heading>
            <Flex gap="10px">
              <Icon as={MdStarRate} className="rate-star" fontSize="20px" _hover={{cursor: 'pointer'}} color="gray" onClick={() => setStars(1)}/>
              <Icon as={MdStarRate} className="rate-star" fontSize="20px" _hover={{cursor: 'pointer'}} color="gray" onClick={() => setStars(2)}/>
              <Icon as={MdStarRate} className="rate-star" fontSize="20px" _hover={{cursor: 'pointer'}} color="gray" onClick={() => setStars(3)}/>
              <Icon as={MdStarRate} className="rate-star" fontSize="20px" _hover={{cursor: 'pointer'}} color="gray" onClick={() => setStars(4)}/>
              <Icon as={MdStarRate} className="rate-star" fontSize="20px" _hover={{cursor: 'pointer'}} color="gray" onClick={() => setStars(5)}/>
            </Flex>
            <FieldTextArea
              placeholder="Berikan penilaianmu kepada mentor :)"
              ref={textReview}
            />
          </Flex>
          <Flex justifyContent="space-between" w="100%" gap="6px" mt="20px">
            <Button
              w="50%"
              borderColor="brand.500"
              color="brand.500"
              _hover={{ color: "brand.400" }}
              _active={{ color: "brand.700" }}
              onClick={onClosed}
            >
              Kembali
            </Button>
            <Button
              w="50%"
              variant="solid"
              bgColor="brand.500"
              color="white"
              _hover={{ bgColor: "brand.400" }}
              _active={{ bgColor: "brand.700" }}
              onClick={validation}
            >
              Validasi
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ValidationModal;
