import React from "react";
import { Flex, Heading, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { MdOutlineOpenInNew, MdEdit, MdDelete } from "react-icons/md";

import EditExperiencesModal from "./EditExperienceModal";

const EditExperienceItem = ({
  experiencePosition,
  experiencePlace,
  experienceDate,
  experiences,
  index,
  handleChange
}) => {
  const {isOpen: isOpenExperiences, onOpen: onOpenExperiences, onClose: onCloseExperiences} = useDisclosure()

  const onDelete = () => {
    const isConfirm = confirm("Apakah anda yakin ingin menghapus pengalaman ini?")
    if(isConfirm){
      const getExperiences = [...experiences]
      delete getExperiences[index]
      const updatedExperiences = getExperiences.sort()
      updatedExperiences.pop()
      handleChange(updatedExperiences)
    }
  }

  return (
    <Flex justifyContent="space-between" key={index}>
      <Flex flexDirection="column" gap="4px">
        <Heading fontSize="lg" fontWeight="medium">
          {experiencePosition}
        </Heading>
        <Text fontSize="sm" color="gray">
          {experiencePlace}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <Text fontSize="sm" color="gray">
          {experienceDate}
        </Text>
      </Flex>
      <Flex gap="10px">
        <IconButton
          icon={<MdEdit />}
          bg="brand.500"
          color="white"
          fontSize="24px"
          borderRadius="8px"
          _hover={{ bg: "brand.400" }}
          _active={{ bg: "brand.700" }}
          onClick={onOpenExperiences}
        />
        <IconButton
          icon={<MdDelete />}
          bg="red"
          color="white"
          fontSize="24px"
          borderRadius="8px"
          onClick={onDelete}
        />
      </Flex>
      <EditExperiencesModal 
        experiences={experiences}
        index={index}
        experienceItem={experiences[index]}
        isOpened={isOpenExperiences}
        onOpened={onOpenExperiences}
        onClosed={onCloseExperiences}
        handleChange={handleChange}
      />
    </Flex>
  );
};

export default EditExperienceItem;
