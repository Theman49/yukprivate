import React from 'react';
import { Flex, FormControl, FormLabel, Grid, GridItem, Text, RadioGroup, Radio, Box } from '@chakra-ui/react';
import RadioInput from './BookingRadioInput';

const IndependentPacket = ({date, setDate, studyTime, setStudyTime, time, setTime, duration, setDuration, durations, schedules}) => {
  return (
    <Flex flexDir="column" gap="24px">
        <FormControl>
          <FormLabel>Jadwal Belajar</FormLabel>
          <RadioGroup onChange={setDate} value={date}>
            <Grid templateColumns="repeat(5, 1fr)" gap="13px">
              {schedules.map((item, index) => {
                return index < 5 ? (
                  <GridItem
                    key={index}
                    border="1px solid #D0D5DD"
                    p="2px"
                    textAlign="center"
                    borderRadius="4px"
                    display="flex"
                    justifyContent="space-between"
                    flexDir="column"
                    gap="8px"
                    bg={date == item.value ? "brand.500" : item.slot == 0 ? "#D0D5DD" : ""}
                    // bg={item.slot == 0 ? "#D0D5DD" : ""}
                    color={date == item.value ? "white" : item.slot == 0 ? "#667085" : "black"}
                    _hover={item.slot != 0 ? {
                      cursor: "pointer"
                    }: ""}
                  >
                    <Radio isDisabled={item.slot == 0 ? true : false} display="none" id={item.value} value={item.value} colorScheme="whiteAlpha"></Radio>
                    <Box m="4px 2px">
                      <label htmlFor={item.value} style={{cursor: "pointer"}}>
                        <Text fontSize="12px">{item.day}</Text>
                        <Text fontSize="14px" fontWeight={600}>{`${item.date} ${item.month}`}</Text>
                        <Text fontSize="12px" color={item.slot == 0 ? "red" : date == item.value ? "white" : "green"}>{item.slot} Slot</Text>
                      </label>
                    </Box>
                  </GridItem>
                ) : null
              })}
            </Grid>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Waktu Belajar</FormLabel>
          <RadioGroup onChange={setTime} value={time} >
            <Grid templateColumns="repeat(4, 1fr)" gap="16px">
              {studyTime.map((item, index) => {
                return (
                  <GridItem
                    key={index}
                    _hover={{
                      cursor: "pointer"
                    }}
                  >
                    <RadioInput value={item.value} text={item.text} state={time} isHiddenRadio/>
                  </GridItem>
                )
              })}
            </Grid>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Durasi Belajar</FormLabel>
          <RadioGroup onChange={setDuration} value={duration}>
            <Flex gap="16px">
              {durations.map((item, index) => {
                return (
                  <Box key={index}>
                    <RadioInput value={item} text={`${item} Jam`} state={duration} isHiddenRadio/> 
                  </Box>
                )
              })}
              
            </Flex>
          </RadioGroup>
        </FormControl>
    </Flex>
  )
}

export default IndependentPacket;