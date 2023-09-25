import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

const ExperienceItem = ({
  experiencePosition,
  experiencePlace,
  experienceDate,
}) => {
  return (
    <Flex justifyContent="space-between">
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
    </Flex>
  );
};

export default ExperienceItem;
