import React, {useState, useEffect} from "react";
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
// import CustomCheckbox from "../../../components/CustomCheckbox";
import Matematika from "../../../assets/icons/course/Matematika.png";
import Kimia from "../../../assets/icons/course/Kimia.png";
import Biologi from "../../../assets/icons/course/Biologi.png";
import Inggris from "../../../assets/icons/course/Inggris.png";
import Fisika from "../../../assets/icons/course/Fisika.png";

function CustomCheckbox(props) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props)

  return (
    <chakra.label
      display='flex'
      flexDirection='row'
      alignItems='center'
      gridColumnGap={2}
      w="200px"
      cursor='pointer'
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems='center'
        justifyContent='center'
        border='2px solid'
        borderColor='black'
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && <Box w={2} h={2} bg='brand.500' />}
      </Flex>
        <Image
          w="32px"
          src={
            props.value === "Matematika"
              ? Matematika
              : props.value === "Kimia"
              ? Kimia
              : props.value === "Biologi"
              ? Biologi
              : props.value === "Bahasa Inggris"
              ? Inggris
              : props.value === "Fisika"
              ? Fisika
              : Matematika
          }
        />
      <Text {...getLabelProps()}>{props.value}</Text>
    </chakra.label>
  )
}

const listCourses = [
    {
        text: "Matematika",
        value: 'Matematika'
    },
    {
        text: "Fisika",
        value: 'Fisika'
    },
    {
        text: "Kimia",
        value: 'Kimia'
    },
    {
        text: "Bahasa Inggris",
        value: 'Bahasa Inggris'
    }
]

const EditCoursesModal = ({ courses, isOpened, onOpened, onClosed, handleChange, onSubmit }) => {
  const { value, getCheckboxProps } = useCheckboxGroup({
      defaultValue: courses
  })

  useEffect(() => {
    handleChange(value)
  }, [value])

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
        <Text mb={2}>Pilih Mata Pelajaran Yang Akan Kamu Ajar</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap="16px">
            {listCourses.map((item, index) => {
                return (
                    // <CustomCheckbox {...getCheckboxProps({ value: item.value, text: item.text, key: index })} />
                    <CustomCheckbox {...getCheckboxProps({ value: item.value })} />
                )
            })}
        </Grid>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClosed}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  );
};

export default EditCoursesModal;
