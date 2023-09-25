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

const EditScheduleModal = ({ schedule, isOpened, onOpened, onClosed, handleChange }) => {
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditScheduleModal;
