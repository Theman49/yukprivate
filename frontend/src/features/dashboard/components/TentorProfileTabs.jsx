import React from "react";
import {
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import EditOverviewContent from "./EditOverviewContent";
import EditGalleryContent from "./EditGalleryContent";

const TentorProfileTabs = ({tentorData}) => {
  return (
    <Flex flexDir="column" gap="24">
      <Tabs variant="unstyled" defaultIndex={0} isLazy>
        <TabList gap="32px">
          <Tab
            p="8px 0px"
            fontWeight="bold"
            _selected={{
              color: "brand.500",
              borderBottom: "3px solid #69D3CF",
            }}
          >
            Overview
          </Tab>
          {/* <Tab
            p="8px 0px"
            fontWeight="bold"
            _selected={{
              color: "brand.500",
              borderBottom: "3px solid #69D3CF",
            }}
          >
            Galeri
          </Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel p="24px 0px 24px 0px">
            <EditOverviewContent tentorData={tentorData}/>
          </TabPanel>
          {/* <TabPanel p="24px 0px 24px 0px">
            <EditGalleryContent />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default TentorProfileTabs;
