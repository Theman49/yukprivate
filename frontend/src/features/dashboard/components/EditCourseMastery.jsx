import React from "react";
import { Flex, Grid, GridItem, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import CourseSubject from "../../home/components/CourseSubject";
import { MdAdd, MdEdit } from "react-icons/md";

import EditCoursesModal from "./EditCoursesModal";

const EditCourseMastery = ({courses, setEditedCourse}) => {
  const {isOpen: isOpenCourses, onOpen: onOpenCourses, onClose: onCloseCourses} = useDisclosure()
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
          Mata Pelajaran
        </Heading>
        <Flex gap="20px">
          {/* <IconButton
            icon={<MdAdd />}
            bg="brand.500"
            color="white"
            fontSize="24px"
            borderRadius="8px"
            _hover={{ bg: "brand.400" }}
            _active={{ bg: "brand.700" }}
          /> */}
          <IconButton
            icon={<MdEdit />}
            bg="brand.500"
            color="white"
            fontSize="24px"
            borderRadius="8px"
            _hover={{ bg: "brand.400" }}
            _active={{ bg: "brand.700" }}
            onClick={onOpenCourses}
          />
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap="20px">
        {courses.map((item, index) => {
          return (
            <GridItem key={index}>
              <CourseSubject courseName={item} />
            </GridItem>
          )
        })}
      </Grid>

      <EditCoursesModal 
        courses={courses}
        isOpened={isOpenCourses}
        onOpened={onOpenCourses}
        onClosed={onCloseCourses}
        handleChange={setEditedCourse}
      />
    </Flex>
  );
};

export default EditCourseMastery;
