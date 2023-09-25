import React, {useState, useEffect} from 'react';
import { Flex, FormControl, FormLabel, RadioGroup, Radio, Box, Text, Grid, GridItem } from '@chakra-ui/react';
import RadioInput from './BookingRadioInput';

const BookingChooseSchedule = ({schedules, times, study_time, desc, setScheduleSubscribe, setTempSchedule, tempSchedule, indexParam, amount }) => {
  let getTempSchedule = [...tempSchedule];
  const daysSet = new Set(schedules.map(item => item.day))
  const daysArr = new Array([...daysSet])[0]
  const days = daysArr.map(item => item.toLowerCase())
  // const [day, setDay] = useState(days[indexParam])
  const [day, setDay] = useState(times[indexParam].day)
  const [time, setTime] = useState(times[indexParam].time[0].value)
  const [duration, setDuration] = useState(times[indexParam].time[0].duration[0])

  useEffect(() => {
    setDay(times[indexParam].day)
    setTime(times[indexParam].time[0].value)
    setDuration(times[indexParam].time[0].duration[0])
  }, [amount])


  const updateSchedule = () => {
    getTempSchedule[indexParam] = {
      day: day,
      time: time,
      duration: duration
    }
    setTempSchedule(getTempSchedule)
  }



  const [tempSchedule2, setTempSchedule2] = useState()

  // useEffect(() => {
  //   updateSchedule()
  // }, [tempSchedule])

  const [studyTime, setStudyTime] = useState(study_time)

  useEffect(() => {
    const getItem = schedules.filter((item) => (item.day).toLowerCase() == day)[0]
    setDay((getItem.day).toLowerCase())
    const getItemFromTimes = times.filter(item => (item.day).toLowerCase() == day)[0]
    const maped = (getItemFromTimes.time).map(item => {
      return {
        text: (item.value).replace(":", '.'),
        value: item.value
      }
    })
    setStudyTime(maped)
    setTime(maped[0].value)
    updateSchedule()
  }, [day])

  const [durations, setDurations] = useState(times[0].time[0].duration)

  useEffect(() => {
    const getItem = times.filter(item => item.day == day)[0]
    const getByTime = (getItem.time).filter(item => item.value == time)
    const getDuration = getByTime.map(item => item.duration)[0]
    setDurations(getDuration.sort())
    setDuration(getDuration[0])
    updateSchedule()
  }, [time])

  useEffect(() => {
    updateSchedule()
  }, [duration])




  return(
    <>
        <FormControl>
          <FormLabel>Jadwal Belajar</FormLabel>
          <RadioGroup onChange={setDay} value={day}>
            <Grid templateColumns="repeat(5, 1fr)" gap="13px">
              {days.map((item, index) => {
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
                    bg={day == item ? "brand.500" :  ""}
                    // bg={item.slot == 0 ? "#D0D5DD" : ""}
                    color={day == item ? "white" :  "black"}
                    _hover={ {
                      cursor: "pointer"
                    }}
                  >
                    <Radio display="none" id={`${item}${desc}`} value={item} colorScheme="whiteAlpha"></Radio>
                    <Box m="4px 2px">
                      <label htmlFor={`${item}${desc}`} style={{cursor: "pointer"}}>
                        <Text fontSize="12px">{item}</Text>
                        {/* <Text fontSize="14px" fontWeight={600}>{`${item.date} ${item.month}`}</Text>
                        <Text fontSize="12px" color={item.slot == 0 ? "red" : date == item.value ? "white" : "green"}>{item.slot} Slot</Text> */}
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
                    <RadioInput value={item.value} id={`${desc}time`} text={item.text} state={time} isHiddenRadio/>
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
                    <RadioInput value={item} text={`${item} Jam`} id={`${desc}duration`} state={duration} isHiddenRadio/> 
                  </Box>
                )
              })}
              
            </Flex>
          </RadioGroup>
        </FormControl>
    </>
  )
}

export default BookingChooseSchedule