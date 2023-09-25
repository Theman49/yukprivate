import React from "react";
import { Flex, Heading, Box } from "@chakra-ui/react";
import AchievementItem from "./AchievementItem";

const AchievementTentor = ({content}) => {
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
        Prestasi
      </Heading>
      <Flex flexDirection="column" gap="8px">
        {content.map((item, index) => {
          return (
            <Box key={index}>
              <AchievementItem
                achievementRank={item.achievement_name}
                achievementPlace={item.organizer_name}
                achievementDate={item.date_of_activity}
                certificateLink="#"
              />
            </Box>
          )
        })}
      </Flex>
    </Flex>
  );
};

export default AchievementTentor;
