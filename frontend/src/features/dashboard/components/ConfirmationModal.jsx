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
} from "@chakra-ui/react";
import { MdWarningAmber } from "react-icons/md";
import ConfirmationRejectModal from "./ConfirmationRejectModal";

const ConfirmationModal = ({ isOpened, onOpened, onClosed, studentName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal
      isCentered
      onClose={onClosed}
      isOpen={isOpened}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent w="309px" h="272px">
        <ModalBody>
          <Flex
            mt="24px"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap="8px"
          >
            <Icon as={MdWarningAmber} fontSize="64px" color="#F79009" />
            <Heading fontSize="xl" fontWeight="semibold">
              Konfirmasi Siswa
            </Heading>
            <Text fontSize="sm" w="245px" textAlign="center">
              Apakah Kamu setuju untuk menerima {studentName} sebagai siswa
              Kamu?
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="space-between" w="100%" gap="6px">
            <Button
              w="50%"
              variant="outline"
              borderColor="brand.500"
              color="brand.500"
              _hover={{ borderColor: "brand.400", color: "brand.400" }}
              _active={{ borderColor: "brand.700", color: "brand.700" }}
              onClick={onClose}
            >
              Tolak
            </Button>
            <ConfirmationRejectModal
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
            <Button
              w="50%"
              variant="solid"
              bgColor="brand.500"
              color="white"
              _hover={{ bgColor: "brand.400" }}
              _active={{ bgColor: "brand.700" }}
              onClick={onClosed}
            >
              Setuju
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
