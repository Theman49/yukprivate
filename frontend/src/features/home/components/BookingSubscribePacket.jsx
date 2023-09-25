import React, { useEffect, useState } from 'react';
import { Flex, FormControl, FormLabel, RadioGroup, Box, Text, Radio, Input, Grid, GridItem, 
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import CustomCheckbox from '../../../components/CustomCheckbox';
import ChooseSchedule from './BookingChooseSchedule';
import moment from 'moment';

const meetAmount = [
  4,8,12,16
]

// const today = moment().format("YYYY-MM-DD")

const SubscribePacket = ({state, handleState, schedules, times, study_time}) => {
  const daysSet = new Set(schedules.map(item => item.day))
  const daysArr = new Array([...daysSet])[0]
  const days = daysArr.map(item => item.toLowerCase())

  const [setAmount, setStartDate, setScheduleSubscribe ] = handleState
  const [amount, startDate, scheduleSubscribe ] = state
  const [meet, setMeet] = useState([])



  const [tempSchedule, setTempSchedule] = useState()

  useEffect(() => {
    const x = amount / 4
    let temp = []
    let temp2 = []
    for(let i=0; i<x; i++){
      const index = i + 1
      temp.push(`Sesi ${index}`)
      const obj = {
        day: times[i].day,
        time: times[i].time[0].value,
        duration: times[i].time[0].duration[0]
      }
      temp2.push(obj)
    }
    setMeet(temp)
    setTempSchedule(temp2)
  }, [amount])

  useEffect(() => {
    setScheduleSubscribe(tempSchedule)
  }, [tempSchedule])



  return (
    <Flex flexDir="column" gap="24px">
      <FormControl>
        <FormLabel>Jumlah Pertemuan dalam Sebulan</FormLabel>
        <RadioGroup onChange={setAmount} value={amount}>
          <Flex
            gap="4px"
          >
            {meetAmount.map((item, index) => {
              return index < days.length ? (
              <Box 
                key={index}
                bg={amount == item ? "brand.500" : ""} 
                color={amount == item ? "white" : ""} 
                border={amount != item ? "1px solid #D0D5DD" : ""}
                display="flex" 
                p="2px"
                alignItems="center"
                borderRadius="4px"
                justifyContent="center"
                w="full"
                >
                  <Text>
                    <label htmlFor={item}>{item}x/bulan</label>
                  </Text>
                  <Radio display="none" value={item} id={item} colorScheme="whiteAlpha"></Radio>
              </Box>
              ) : null
            })}
          </Flex>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Pilih Tanggal Mulai Belajar</FormLabel>
        <Input 
            type="date"
            borderColor="#D0D5DD"
            color="#667085"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
        />
      </FormControl>

      <Accordion maxW="full">
      {meet.map((item, index) => {
        return (
        <AccordionItem border="none" key={index}>
          <h2>
            <AccordionButton borderBottom="1px solid gray">
              <Box flex='1' textAlign='left'>
                {`${item} / Minggu`}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChooseSchedule 
              schedules={schedules} 
              times={times} 
              study_time={study_time} 
              desc={`${item}-meet`} 
              setScheduleSubscribe={setScheduleSubscribe} 
              setTempSchedule={setTempSchedule} 
              tempSchedule={tempSchedule} 
              indexParam={index}
              amount={amount}
            />
          </AccordionPanel>
        </AccordionItem>

        )
      })}
      </Accordion>
    </Flex>
  )
}

export default SubscribePacket;