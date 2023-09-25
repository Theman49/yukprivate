import React from "react";
import { Flex, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import EditAchievementItem from "./EditAchievementItem";
import { MdAdd } from "react-icons/md";
import EditAchievementModal from "./EditAchievementModal";

const EditAchievementTentor = ({achievements, handleChange}) => {
  const {isOpen: isOpenAchievements, onOpen: onOpenAchievements, onClose: onCloseAchievements} = useDisclosure()
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
          Prestasi
        </Heading>
        <IconButton
          icon={<MdAdd />}
          bg="brand.500"
          color="white"
          fontSize="24px"
          borderRadius="8px"
          _hover={{ bg: "brand.400" }}
          _active={{ bg: "brand.700" }}
          onClick={onOpenAchievements}
        />
      </Flex>
      <Flex flexDirection="column" gap="8px">
        {achievements.map((item, index) => {
          return (
            <EditAchievementItem
              achievementRank={item.achievement_name}
              achievementPlace={item.organizer_name}
              achievementDate={item.date_of_activity}
              certificateLink={item.url_certificate}
              index={index}
              achievements={achievements}
              handleChange={handleChange}
            />
          )
        })}
      </Flex>
      <EditAchievementModal 
        achievements={achievements}
        isOpened={isOpenAchievements}
        onOpened={onOpenAchievements}
        onClosed={onCloseAchievements}
        handleChange={handleChange}
        isInsert={true}
      />
    </Flex>
  );
};

export default EditAchievementTentor;
