import { React, useState } from "react";
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
  ModalFooter,
  ModalBody,
  Textarea,
} from "@chakra-ui/react";
import FieldTextArea from "../../auth/components/FieldTextarea";

const ConfirmationModal = ({ isOpen, onOpen, onClose, studentName }) => {
  let [value, setValue] = useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent w="360px" h="272px">
        <ModalBody>
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Heading fontSize="xl" fontWeight="semibold">
              Alasan Menolak
            </Heading>
            <FieldTextArea
              h="137"
              onChange={handleInputChange}
              placeholder="Beri alasan kenapa Kamu menolak tawaran tersebut"
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="space-between" w="100%" gap="6px">
            <Button
              w="50%"
              borderColor="brand.500"
              color="brand.500"
              _hover={{ color: "brand.400" }}
              _active={{ color: "brand.700" }}
              onClick={onClose}
            >
              Batal Tolak
            </Button>
            <Button
              w="50%"
              variant="solid"
              bgColor="brand.500"
              color="white"
              _hover={{ bgColor: "brand.400" }}
              _active={{ bgColor: "brand.700" }}
              onClick={onClose}
            >
              Tolak
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
