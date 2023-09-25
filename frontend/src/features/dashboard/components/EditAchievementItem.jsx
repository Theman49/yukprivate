import React from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  Link,
  Image,
  Divider,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineOpenInNew, MdEdit, MdDelete } from "react-icons/md";
import IconTrophy from "../../../assets/icons/IconTrophy.png";

import EditAchievementModal from "./EditAchievementModal";

const EditAchievementItem = ({
  achievementRank,
  achievementPlace,
  achievementDate,
  certificateLink,
  achievements,
  index,
  handleChange
}) => {
  const {isOpen: isOpenAchievements, onOpen: onOpenAchievements, onClose: onCloseAchievements} = useDisclosure()

  const onDelete = () => {
    const isConfirm = confirm("Apakah anda yakin ingin menghapus prestasi ini?")
    if(isConfirm){
      const getAchievements = [...achievements]
      delete getAchievements[index]
      const updatedAchievements = getAchievements.sort()
      updatedAchievements.pop()
      handleChange(updatedAchievements)
    }
  }
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="16px">
          <Image src={IconTrophy} maxW="64px" />
          <Flex flexDirection="column" gap="4px">
            <Heading fontSize="md" fontWeight="medium">
              {achievementRank}
            </Heading>
            <Text fontSize="sm" fontWeight="medium">
              {achievementPlace}
            </Text>
            <Text fontSize="xs" color="gray">
              {achievementDate}
            </Text>
          </Flex>
        </Flex>
        <Flex gap="16px">
          <Link
            href={certificateLink}
            isExternal
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Button
              variant="solid"
              bg="#F2F4F7"
              _hover={{ bg: "#D7D7D7" }}
              _active={{ bg: "#BBBBBB" }}
              rightIcon={<MdOutlineOpenInNew fontSize="md" />}
              fontSize="sm"
              fontWeight="medium"
            >
              Lihat Sertifikat
            </Button>
          </Link>
          <Flex gap="10px">
            <IconButton
              icon={<MdEdit />}
              bg="brand.500"
              color="white"
              fontSize="24px"
              borderRadius="8px"
              _hover={{ bg: "brand.400" }}
              _active={{ bg: "brand.700" }}
              onClick={onOpenAchievements}
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
        </Flex>
      </Flex>
      <Divider color="#D0D5DD" mt="4px" />
      <EditAchievementModal 
        achievements={achievements}
        index={index}
        achievementItem={achievements[index]}
        isOpened={isOpenAchievements}
        onOpened={onOpenAchievements}
        onClosed={onCloseAchievements}
        handleChange={handleChange}
      />
    </>
  );
};

export default EditAchievementItem;
