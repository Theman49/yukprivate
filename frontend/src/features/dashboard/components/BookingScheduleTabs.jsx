import { React, useEffect, useState, useRef, createRef } from "react";
import { useSelector } from "react-redux";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  Box,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import AuthButton from "../../auth/components/AuthButton";
import SelectDay from "../../auth/components/SelectDay";
import SelectDuration from "../../auth/components/SelectDuration";
import { MdAdd, MdDeleteForever } from "react-icons/md";

let no = 10


const BookingScheduleTabs = ({tentorSchedules}) => {
  let { isAuth, role: isRole, user, token } = useSelector((state) => state.auth);

  if (!isAuth) {
    isAuth = localStorage.getItem("isAuth");
    isRole = localStorage.getItem("role");
    token = localStorage.getItem("token");
    user = JSON.parse(localStorage.getItem("user"));
  } 
  const [newLists, setNewLists] = useState(tentorSchedules);
  const [newListSchedules, setNewListSchedules] = useState([])

  // useEffect(() => {
  //   setNewListSchedules(newLists)
  // }, [newLists])





  const [preference, setPreference] = useState([true, true]);
  const dayField = createRef();
  const timeField = useRef();
  const durationField = createRef();


  const ScheduleItem = ({day, time, duration, key, index}) => {
    return (
      <Flex justifyContent="space-between" gap="32px" w="100%" key={key} id={`schedule-${key}`}>
        <SelectDay defaultValue={day} className="select-day"/>
        <Input type="time" borderColor="#D0D5DD" defaultValue={time} className="input-time"/>
        <SelectDuration defaultValue={duration} className="select-duration"/>

        <Flex flexDir="column">
          <HStack>
            <IconButton
              icon={<MdDeleteForever />}
              bg="#F04438"
              color="white"
              fontSize="24px"
              borderRadius="8px"
              _hover={{ bg: "#FB5246" }}
              _active={{ bg: "#DC4B40" }}
              onClick={() => {
                let tempList = [...newLists]
                delete tempList[index]
                let tempListSort = tempList.sort()
                tempListSort.pop()
                setNewLists(tempListSort)
              }}
            />
          </HStack>
        </Flex>
      </Flex>
    )
  }

  const onSubmit = () => {
    const selectDay = document.getElementsByClassName('select-day')
    const inputTime = document.getElementsByClassName('input-time')
    const selectDuration = document.getElementsByClassName('select-duration')

    let updatedSchedules = []

    for(let i=0; i<selectDay.length; i++){
      const schedule = {}
      schedule.day = selectDay[i].value
      schedule.time = inputTime[i].value
      schedule.duration = selectDuration[i].value
      updatedSchedules.push(schedule)
    }

     console.log('preference', preference)
     console.log('schedules', updatedSchedules)

  }

  return (
    <Flex maxW="600px" flexDirection="column" gap="24px">
      <Text fontSize="xl" fontWeight="600">
        Sesuaikan Jadwal Mengajar Kamu
      </Text>

      <Flex justifyContent="space-between" gap="32px" w="100%">
        <FormControl>
          <FormLabel>Hari</FormLabel>
        </FormControl>

        <FormControl>
          <FormLabel>Waktu</FormLabel>
        </FormControl>

        <FormControl>
          <FormLabel>Durasi</FormLabel>
        </FormControl>

        <Flex flexDir="column">
          <Text fontWeight="500" mb="7px">
            Aksi
          </Text>
        </Flex>
      </Flex>

      {newLists != null ? newLists.map((item, index) => {
        return (
            <ScheduleItem day={item.day} time={item.time} duration={item.duration} key={index} index={index}/>
        )
      }) : null}


      {/* {newListSchedules.length != 0 ? newListSchedules.map((item, index) => {
        return <ScheduleItem no={item.no} day={item.day} time={item.time} duration={item.duration} key={index}/>
      }) : null} */}


      <Flex
        justifyContent="center"
        p="16px"
        border="1px dashed #98A2B3"
        borderRadius="4px"
        color="#323232"
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          let tempList = [...newLists]
          tempList.push({
            day: 'senin',
            time: '10:00',
            duration: 1
          })
          setNewLists(tempList)
        }}
      >
        <MdAdd size={24}></MdAdd>
      </Flex>
      <FormControl>
        <FormLabel fontWeight={600}>Preferensi Mengajar</FormLabel>

        <CheckboxGroup>
          <Flex justifyContent="space-between" w="40%">
            <Box>
              <Checkbox
                defaultChecked
                isChecked={preference[0]}
                onChange={(e) =>
                  setPreference([e.target.checked, preference[1]])
                }
              >
                Tatap Muka
              </Checkbox>
            </Box>
            <Box>
              <Checkbox
                defaultChecked
                isChecked={preference[1]}
                onChange={(e) =>
                  setPreference([preference[0], e.target.checked])
                }
              >
                Daring
              </Checkbox>
            </Box>
          </Flex>
        </CheckboxGroup>
      </FormControl>
      <AuthButton value="Simpan" handleClick={onSubmit} />
    </Flex>
  );
};

export default BookingScheduleTabs;
