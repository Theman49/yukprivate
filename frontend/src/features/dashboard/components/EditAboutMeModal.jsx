import React, {useState, useEffect, createRef} from "react";
import {
  chakra,
  Flex,
  Box,
  Heading,
  Text,
  Grid,
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
  useCheckbox,
  useCheckboxGroup,
  Image,
} from "@chakra-ui/react";
import FormControlTextarea from "../../auth/components/FieldTextarea";
import AuthButton from "../../auth/components/AuthButton";

const EditAboutMeModal = ({ aboutMe, isOpened, onOpened, onClosed, handleChange }) => {
  const tentor_introduction = createRef()
  const onSubmit = () => {
    handleChange(tentor_introduction.current.value)
    onClosed()
  }
  return (
    <Modal 
      isCentered
      isOpen={isOpened} 
      onClose={onClosed}
      motionPreset="slideInBottom"
    >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Tentang</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControlTextarea 
          label="Ceritakan dirimu disini!" 
          placeholder="Beritahu Kami tentang dirimu, tujuanmu dan sesuatu yang kamu sukai" 
          defaultValue={aboutMe}
          ref={tentor_introduction}
        />            
      </ModalBody>

      <ModalFooter>
        <Flex justifyContent="flex-end">
              <AuthButton value="Simpan" size="sm" 
                handleClick={onSubmit}
              />
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
};

export default EditAboutMeModal;
