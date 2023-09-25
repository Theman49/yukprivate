import React from "react";
import { Flex, GridItem, Text, Image } from "@chakra-ui/react";
import Matematika from "../../../assets/icons/course/Matematika.png";
import Kimia from "../../../assets/icons/course/Kimia.png";
import Biologi from "../../../assets/icons/course/Biologi.png";
import Inggris from "../../../assets/icons/course/Inggris.png";
import Fisika from "../../../assets/icons/course/Fisika.png";

const CourseSubject = ({ courseName }) => {
  return (
    <GridItem>
      <Flex alignItems="center" gap="8px">
        <Image
          w="32px"
          src={
            courseName === "Matematika"
              ? Matematika
              : courseName === "Kimia"
              ? Kimia
              : courseName === "Biologi"
              ? Biologi
              : courseName === "Bahasa Inggris"
              ? Inggris
              : courseName === "Fisika"
              ? Fisika
              : Matematika
          }
        />
        <Text fontSize="md" fontWeight="medium">
          {courseName}
        </Text>
      </Flex>
    </GridItem>
  );
};

export default CourseSubject;
