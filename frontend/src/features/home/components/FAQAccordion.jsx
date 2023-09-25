import React from "react";
import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Text,
} from "@chakra-ui/react";

const FAQAccordion = ({ title, content }) => {
  return (
    <AccordionItem
      border="none"
      boxShadow="0px 4px 32px rgba(0, 0, 0, 0.1)"
      borderRadius="16px"
      p="4px"
      mb="20px"
    >
      <AccordionButton bg="white" borderRadius="16px">
        <Box flex="1" textAlign="left">
          <Heading color="brand.500" fontSize="xl" fontWeight="semibold">
            {title}
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Text>{content}</Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default FAQAccordion;
