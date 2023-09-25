import React, {useState} from "react";
import { Flex, Heading, Button, Collapse, Box } from "@chakra-ui/react";
import {MdKeyboardArrowUp, MdKeyboardArrowDown, MdKeyboard} from 'react-icons/md';
import ExperienceItem from "./ExperienceItem";
const ExperienceTentor = ({content}) => {
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
      <Heading fontSize="xl" fontWeight="semibold">
        Pengalaman
      </Heading>
      <Collapse startingHeight={50} in={show}>
        <Flex flexDirection="column" gap="16px">
          {content.map((item, index) => {
            return (
              <Box key={index}>
                <ExperienceItem
                  experiencePosition={item.teaching_role}
                  experiencePlace={item.teaching_place}
                  experienceDate={`${item.teaching_start_date} - ${item.isTeaching == false ? item.teaching_end_date : "Sekarang" }`}
                />
              </Box>
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
    </Flex>
  );
};

export default ExperienceTentor;
