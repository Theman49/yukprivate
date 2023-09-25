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
  Checkbox,
  CheckboxGroup,
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
// import CustomCheckbox from "../../../components/CustomCheckbox";
import AuthFormControl from "../../auth/components/AuthFormControl";
import AuthButton from "../../auth/components/AuthButton";
import SelectYear from "../../auth/components/SelectYear";
import SelectMonth from "../../auth/components/SelectMonth";

const EditExperiencesModal = ({ experienceItem, experiences, index, isOpened, onOpened, onClosed, handleChange, isInsert=false }) => {
  const teaching_place = createRef();
  const teaching_role = createRef();
  const start_month = createRef();
  const start_year = createRef();
  const isTeaching = createRef();
  const end_month = createRef();
  const end_year = createRef();

  const onSubmit = () => {
    const payload = {
      teaching_place: teaching_place.current.value,
      teaching_role: teaching_role.current.value,
      teaching_start_date: start_month.current.value + " " + start_year.current.value,
      teaching_end_date: end_month.current.value + " " + end_year.current.value,
      isTeaching: isTeaching.current.checked
    }

    let updatedExperiences = [...experiences]

    if(isInsert == false){
      updatedExperiences[index] = payload
      handleChange(updatedExperiences)
      alert("Berhasil Disimpan")
    }else{
      updatedExperiences.push(payload)
      handleChange(updatedExperiences)
      alert("Berhasil Ditambahkan")
    }
    onClosed();
  }

  return (
    <Modal 
      isCentered
      isOpen={isOpened} 
      onClose={onClosed}
      motionPreset="slideInBottom"
    >
    <ModalOverlay />
    <ModalContent minW="600px">
      <ModalHeader>Mata Pelajaran</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex flexDir="column" gap="24px">
            <AuthFormControl 
              type="text" 
              label="Pernah mengajar dimana?" 
              defaultValue={experienceItem ? experienceItem.teaching_place : null} 
              placeholder='Misal: SMP N 2 Semarang' 
              ref={teaching_place}
            />
            <AuthFormControl 
              type="text" 
              label="Sebagai apa?" 
              defaultValue={experienceItem ? experienceItem.teaching_role : null} 
              placeholder='Misal: Guru Bahasa Inggris' 
              ref={teaching_role}
            />
            <Flex justifyContent="space-between" gap="10px">
                <Box w="full">
                    <SelectMonth 
                      label="Tanggal mulai mengajar" 
                      placeholder="Bulan" 
                      defaultValue={experienceItem ? experienceItem.teaching_start_date.split(' ')[0] : null} 
                      ref={start_month}
                    />                
                </Box>
                <Box display="flex" flexDir="column" alignItems="flex-end" w="full">
                    <Checkbox 
                      defaultChecked={experienceItem ? experienceItem.isTeaching : true} 
                      fontSize="8px"
                      ref={isTeaching}
                    >Saya masih mengajar disini</Checkbox>
                    <SelectYear 
                      placeholder="Tahun"
                      defaultValue={experienceItem ? experienceItem.teaching_start_date.split(' ')[1] : null} 
                      ref={start_year}
                    />
                </Box>
            </Flex>
            <Flex justifyContent="space-between" alignItems="flex-end" gap="10px">
                <Box w="full">
                    <SelectMonth 
                      label="Tanggal akhir mengajar" 
                      placeholder="Bulan" 
                      defaultValue={experienceItem ? experienceItem.teaching_end_date.split(' ')[0] : null} 
                      ref={end_month}
                    />                
                </Box>
                <Box w="full">
                    <SelectYear 
                      placeholder="Tahun" 
                      defaultValue={experienceItem ? experienceItem.teaching_end_date.split(' ')[1] : null} 
                      ref={end_year}
                    />
                </Box>
            </Flex>
            <Flex justifyContent="flex-end">
                <Box w="20%">
                    <AuthButton value="Simpan" size="sm" 
                      handleClick={onSubmit}
                    />
                </Box>
            </Flex>
        </Flex>
      </ModalBody>

      <ModalFooter>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
};

export default EditExperiencesModal;
