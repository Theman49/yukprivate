import React, {useState, useEffect} from "react";
import { Flex, Button } from "@chakra-ui/react";
import EditAboutTentor from "./EditAboutTentor";
import EditCourseMastery from "./EditCourseMastery";
import EditExperienceTentor from "./EditExperienceTentor";
import EditAchievementTentor from "./EditAchievementTentor";

const EditOverviewContent = ({tentorData}) => {
  const [editedAboutMe, setEditedAboutMe] = useState(tentorData.tentor_proposals[0].tentor_introduction)
  const [editedCourse, setEditedCourse] = useState(tentorData.tentor_proposals[0].course_interest.split(','))
  const [editedExperience, setEditedExperience] = useState(tentorData.tentor_experiences)
  const [editedAchievement, setEditedAchievement] = useState(tentorData.tentor_achievements)

  const onSubmit = () => {
    console.log({
      editedCourse: editedCourse,
      editedExperience: editedExperience,
      editedAchievement: editedAchievement
    })
  }


  return (
    <Flex flexDirection="column" gap="24px">
      <EditAboutTentor 
        aboutMe={editedAboutMe}
        setEditedAboutMe={setEditedAboutMe}
      />
      <EditCourseMastery 
        courses={editedCourse}
        setEditedCourse={setEditedCourse}
      />
      <EditExperienceTentor 
        experiences={editedExperience}
        handleChange={setEditedExperience}
      />
      <EditAchievementTentor 
        achievements={editedAchievement}
        handleChange={setEditedAchievement}
      />
      <Button
        bg="brand.500"
        size="lg"
        color="white"
        onClick={onSubmit}
      >
        Simpan
      </Button>
    </Flex>
  );
};

export default EditOverviewContent;
