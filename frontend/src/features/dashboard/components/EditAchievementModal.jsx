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
import InputFile from "../../auth/components/InputFile";

const EditAchievementModal = ({ achievementItem, achievements, index, isOpened, onOpened, onClosed, handleChange, isInsert=false }) => {
  const achievement_name = createRef();
  const organizer_name = createRef();
  const month = createRef();
  const year = createRef();
  const certificate = createRef();

  const onSubmit = () => {
    const payload = {
      achievement_name: achievement_name.current.value,
      organizer_name: organizer_name.current.value,
      date_of_activity: month.current.value + " " + year.current.value,
      url_certificate: certificate.current.files[0] ? certificate.current.files[0] : achievementItem.url_certificate
    }

    let updatedAchievements = [...achievements]

    if(isInsert == false){
      updatedAchievements[index] = payload
      handleChange(updatedAchievements)
      alert("Berhasil Disimpan")
    }else{
      updatedAchievements.push(payload)
      handleChange(updatedAchievements)
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
    <ModalContent>
      <ModalHeader>Mata Pelajaran</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex flexDir="column" gap="24px">
            <AuthFormControl 
              type="text" 
              label="Prestasi" 
              defaultValue={achievementItem ? achievementItem.achievement_name : null} 
              placeholder='Misal: Juara 1 OSN' 
              ref={achievement_name}
            />
            <AuthFormControl 
              type="text" 
              label="Penyelenggara" 
              defaultValue={achievementItem ? achievementItem.organizer_name : null} 
              placeholder='Isi dengan nama penyelenggara/institusi' 
              ref={organizer_name}
            />

            <Flex justifyContent="space-between" alignItems="flex-end" gap="10px">
                <Box w="full">
                    <SelectMonth 
                      label="Tanggal Kegiatan" 
                      placeholder="Bulan" 
                      defaultValue={achievementItem ? achievementItem.date_of_activity.split(" ")[0].substring(0,3) : null} 
                      ref={month}
                    />                
                </Box>
                <Box w="full">
                    <SelectYear 
                      placeholder="Tahun" 
                      defaultValue={achievementItem ? achievementItem.date_of_activity.split(" ")[1] : null} 
                      ref={year}
                    />
                </Box>
            </Flex>
            <InputFile 
              label="Unggah Sertifikat Disini"
              defaultValue={
                achievementItem ? 
                  typeof achievementItem.url_certificate == "string" ?
                    achievementItem.url_certificate
                    : 
                    achievementItem.url_certificate.name 
                    : ""
                  }
                  ref={certificate}
                />
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

export default EditAchievementModal;
