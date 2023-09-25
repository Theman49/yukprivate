import React, { useState } from "react";
import { Flex, Heading, Button, Collapse, IconButton, useDisclosure } from "@chakra-ui/react";
import EditExperienceItem from "./EditExperienceItem";
import { MdAdd } from "react-icons/md";
import EditExperiencesModal from "./EditExperienceModal";

const EditExperienceTentor = ({experiences, handleChange}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      flexDirection="column"
      maxW="759px"
      bg="white"
      border=" 1px solid #D0D5DD"
      borderRadius="12px"
      p="24px"
      gap="16px"
    >
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize="xl" fontWeight="semibold">
          Pengalaman
        </Heading>
        <IconButton
          icon={<MdAdd />}
          bg="brand.500"
          color="white"
          fontSize="24px"
          borderRadius="8px"
          _hover={{ bg: "brand.400" }}
          _active={{ bg: "brand.700" }}
          onClick={onOpen}
        />
      </Flex>
      <Heading fontSize="xl" fontWeight="semibold">
        Pengalaman
      </Heading>
      <Collapse startingHeight={120} in={show}>
        <Flex flexDirection="column" gap="16px">
          {experiences.map((item, index) => {
            return (
              <EditExperienceItem
                experiencePosition={item.teaching_role}
                experiencePlace={item.teaching_place}
                experienceDate={`${item.teaching_start_date}-${item.isTeaching == false ? item.teaching_end_date : "Sekarang"}`}
                experiences={experiences}
                index={index}
                handleChange={handleChange}
              />
            )
          })}
        </Flex>
      </Collapse>
      <Button
        size="sm"
        color="brand.500"
        onClick={handleToggle}
        variant="unstyled"
      >
        Lihat Lebih {show ? "Sedikit" : "Banyak"}
      </Button>
      <EditExperiencesModal 
        isOpened={isOpen}
        onOpened={onOpen}
        onClosed={onClose}
        experiences={experiences}
        isInsert={true}
        handleChange={handleChange}
      />
    </Flex>
  );
};

export default EditExperienceTentor;
