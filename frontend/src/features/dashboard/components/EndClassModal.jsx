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
import InputFile from "../../auth/components/InputFile";
import FieldTextArea from "../../auth/components/FieldTextarea";

const EndClassModal = ({ isOpened, onOpened, onClosed, endClass, topic_class, url_picture }) => {
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
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap="10px">
            <Heading fontSize="xl" fontWeight="semibold">
              Topik Hari Ini
            </Heading>
            <FieldTextArea
              placeholder="Apa yang kamu ajarkan hari ini?"
              ref={topic_class}
            />
          </Flex>
          <Box mt="10px">
            <InputFile label="Unggah Foto Bukti Mengajar" type="image" ref={url_picture}/>
          </Box>
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
              onClick={endClass}
            >
              Akhiri Kelas
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EndClassModal;
