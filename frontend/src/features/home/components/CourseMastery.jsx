import React from "react";
import {
  Flex,
  Grid,
  Heading,
  GridItem
} from "@chakra-ui/react";
import CourseSubject from "./CourseSubject";

const CourseMastery = ({content}) => {
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
        Mata Pelajaran
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)">
        {content.map((item, index) => {
          return (
            <GridItem key={index}>
              <CourseSubject courseName={item} />
            </GridItem>
          )
        })}
      </Grid>
    </Flex>
  );
};

export default CourseMastery;
