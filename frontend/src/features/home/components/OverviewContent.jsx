import React from "react";
import { Flex, Heading, Text, Button, Link } from "@chakra-ui/react";
import AboutTentor from "./AboutTentor";
import CourseMastery from "./CourseMastery";
import ExperienceTentor from "./ExperienceTentor";
import AchievementTentor from "./AchievementTentor";

const OverviewContent = ({aboutMe, courses, experiences, achievements}) => {
  return (
    <Flex flexDirection="column" gap="24px">
      <AboutTentor
        tentorDescription={aboutMe}/>
      <CourseMastery content={courses}/>
      <ExperienceTentor content={experiences}/>
      <AchievementTentor content={achievements}/>
    </Flex>
  );
};

export default OverviewContent;
