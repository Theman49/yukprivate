import React from "react";
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
import { MdWarningAmber } from "react-icons/md";
import ConfirmationRejectModal from "./ConfirmationRejectModal";
import GirlWithLaptop from '../../../assets/images/GirlWithLaptop.png';

const StartClassModal = ({ isOpened, onOpened, onClosed, startClass }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Flex
            mt="24px"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap="8px"
          >
            <Image 
              w="150px"
              h="150px"
              src={GirlWithLaptop}
              alt="Girl With Laptop"
            />
            <Heading fontSize="xl" fontWeight="semibold">
              Mulai Kelas
            </Heading>
            <Text fontSize="sm" w="245px" textAlign="center">
              Apakah Kamu sudah tiba di lokasi siswa dan ingin memulai kelas?
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w="100%" gap="6px" my="20px">
            <Button
              w="50%"
              variant="outline"
              borderColor="brand.500"
              color="brand.500"
              _hover={{ borderColor: "brand.400", color: "brand.400" }}
              _active={{ borderColor: "brand.700", color: "brand.700" }}
              onClick={onClosed}
            >
              Batalkan
            </Button>
            <Button
              w="50%"
              variant="solid"
              bgColor="brand.500"
              color="white"
              _hover={{ bgColor: "brand.400" }}
              _active={{ bgColor: "brand.700" }}
              onClick={startClass}
            >
              Mulai Kelas
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StartClassModal;
