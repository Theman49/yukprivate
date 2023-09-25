import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  Radio,
  Stack,
  useCheckboxGroup,
  Checkbox,
  Grid,
  GridItem,
  Icon,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { MdInfo } from 'react-icons/md';
import React, {useState, useEffect} from "react";
import RadioInput from './BookingRadioInput';
import IndependentPacket from "./BookingIndependentPacket";
import SubscribePacket from "./BookingSubscribePacket";
import {NumericFormat} from 'react-number-format';
import BookingModal from './BookingModal';
import CustomCheckbox from "../../../components/CustomCheckbox";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
moment.locale('id')

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const init_study_time = [
  {
    text: "13.00",
    value: "13:00"
  }
]

const BookingTentor = ({dataTentor}) => {
  const [date, setDate] = useState(dataTentor.generated_tentor_schedules.schedules[0].value)
  const courses = dataTentor.tentors_by_id.tentor_proposals[0].course_interest.split(',')
  const [schedules, setSchedules] = useState(dataTentor.generated_tentor_schedules.schedules)
  const [tentorId, setTentorId] = useState(dataTentor.tentors_by_id.tentor_id);
  const [studentAddress, setStudentAddress] = useState("")

  // useEffect(() => {
  //   const getSchedulesTentor = async() => {
  //     const request = await axios.get(
  //       `${BASE_URL}/tentors/${tentorId}`,
  //       {
  //         headers: {
  //           'Access-Control-Allow-Origin': '*'
  //         }
  //       }
  //     )
  //     const response = request.data.data
  //     setSchedules(response.generated_tentor_schedules)
  //     setDate(response.generated_tentor_schedules[0].value)
  //   }
  //   getSchedulesTentor()
  // }, [])

  
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
/* A hook from redux. It is used to get the state from redux store. */
  let { token } = useSelector(state => state.auth)
  if(!token){
    token = localStorage.getItem('token')
  }

/* A hook from chakra-ui. It is used to open and close modal. */
  const {isOpen, onOpen, onClose} = useDisclosure()

  const [preference, setPreference] = useState('offline')
  const [packet, setPacket] = useState('independent')
  const [amount, setAmount] = useState(4)
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"))
  const [duration, setDuration] = useState(1)
  const [time, setTime] = useState(dataTentor.generated_tentor_schedules.times[0].time[0].value)

  const [day, setDay] = useState(dataTentor.generated_tentor_schedules.times[0].day)
  const [studyTime, setStudyTime] = useState(init_study_time)
  const [durations, setDurations] = useState(dataTentor.generated_tentor_schedules.times[0].time[0].duration)

  const [uniqueCode, setUniqueCode] = useState()
  const [totalTransfer, setTotalTransfer] = useState()

  useEffect(() => {
    if(schedules != null){
      const getItem = schedules.filter((item) => item.value == date)[0]
      setDay((getItem.day).toLowerCase())
    }
  }, [date])

  useEffect(() => {
    const getItem = dataTentor.generated_tentor_schedules.times.filter(item => item.day == day)[0]
    const maped = (getItem.time).map(item => {
      return {
        text: (item.value).replace(":", '.'),
        value: item.value
      }
    })
    setStudyTime(maped)
    setTime(maped[0].value)

    const getByTime = (getItem.time).filter(item => item.value == maped[0].value)
    const getDuration = getByTime.map(item => item.duration)[0]
    setDurations(getDuration.sort())
    setDuration(getDuration[0])
  }, [day])

  useEffect(() => {
    const getItem = dataTentor.generated_tentor_schedules.times.filter(item => item.day == day)[0]
    const getByTime = (getItem.time).filter(item => item.value == time)
    const getDuration = getByTime.map(item => item.duration)[0]
    setDurations(getDuration.sort())
    setDuration(getDuration[0])
  }, [time])

  const firstTempSchedule = [
    {
      day: dataTentor.generated_tentor_schedules.times[0].day,
      time: dataTentor.generated_tentor_schedules.times[0].time[0].value,
      duration: dataTentor.generated_tentor_schedules.times[0].time[0].duration[0]
    }
  ]

  const [scheduleSubscribe, setScheduleSubscribe] = useState(firstTempSchedule)
  const [snapRedirect, setSnapRedirect] = useState()
  const [choosedCourse, setChoosedCourse] = useState(dataTentor.tentors_by_id.tentor_proposals[0].course_interest.split(',')[0].toLowerCase())
  // const { value: choosedCourse, getCheckboxProps: getCheckboxProps1} = useCheckboxGroup({
  //   defaultValue: [courses[0].toLowerCase()]
  // })

/**
 * It returns a grid with two columns, and each column contains a checkbox
 * @returns A grid with two columns and a list of checkboxes.
 */
  const ChooseCourse = () => {
    return (
      <RadioGroup onChange={setChoosedCourse} value={choosedCourse}>
        <Grid templateColumns="repeat(2, 1fr)" gap="16px">
            {courses.map((item, index) => {
                return (
                  // <CustomCheckbox {...getCheckboxProps1({ value: item.value, text: item.text, key: index})} />
                  // <CustomCheckbox {...getCheckboxProps1({ value: item.toLowerCase(), text: item, key: index})} />
                  <GridItem key={index}>
                    <RadioInput value={item.toLowerCase()} text={item} state={choosedCourse} isHiddenRadio/>
                  </GridItem>
                )
            })}
        </Grid> 
      </RadioGroup>
    )
  }

  const onReservation = async() => {
    if(!token){
      alert('Anda harus login dahulu!!!');
      return
    }

    let currentUserResponse;

    try{
      const currentUserRequest = await axios.get(
        `${BASE_URL}/auth/me`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*'
          }
        }
      )

      currentUserResponse = currentUserRequest.data;

    }catch(err){
      console.log(err)
      alert(err.response.data.message)
    }

    if(!currentUserResponse.status){
      alert('Anda harus login dahulu!!!');
      return
    }

    if(currentUserResponse.data.current_user.role != 'student'){
      alert('Anda harus login dengan akun siswa');
      return
    }

    setUserId(currentUserResponse.data.current_user.id)

    const user_id = currentUserResponse.data.current_user.id

    const reqGetStudent = await axios.get(
      `${BASE_URL}/users/students/${user_id}`, 
      {
          headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*'
          }
    })

    const student = reqGetStudent.data.data.students_by_id

    const reqGetTentor = await axios.get(
      `${BASE_URL}/users/tentors/${tentorId}`, 
      {
          headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*'
          }
      }
    )

    const tentor = reqGetTentor.data.data.tentors_by_id

    setStudentAddress(student.address)

    const rawStudent = {
        id: student.id,
        name: student.register.name,
        email: student.register.email,
        phone: student.no_handphone,
        address: student.address
    }

    const rawTentor = {
        id: tentor.tentor_id,
        name: tentor.register.name,
        email: tentor.register.email,
        phone: tentor.no_handphone,
        address: tentor.address
    }

    const getGeneratedUniqueCode = await axios.get(
      `${BASE_URL}/generate-unique-code`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )

    const unique_code = getGeneratedUniqueCode.data.data
    const private_fee = (packet == 'subscribe' ? 40e3 * amount : 40e3)
    const total_transfer = private_fee - unique_code + 4e3
    setUniqueCode(unique_code)
    setTotalTransfer(total_transfer)

    const payload = {
        student: rawStudent,
        tentor: rawTentor,
        choose_package: packet,
        total_transfer: total_transfer
    }

    

    try{
    const generateTokenSnap = await axios.post(
      `${BASE_URL}/booking/generate-token-snap`,
      payload,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    setSnapRedirect(generateTokenSnap.data.data.generated_token_snap.redirect_url)
    onOpen()
    }catch(e){
      console.log(e)
      alert(e.message)
    }


  }

  const addBookingPayment = async() => {
    const choose_day = (scheduleSubscribe.map(item => item.day)).join(',')
    const choose_time = (scheduleSubscribe.map(item => item.time)).join(',')
    const choose_duration = (scheduleSubscribe.map(item => item.duration)).join(',')


    try {
      const payload = {
        "user_id": userId,
        "tentor_id": tentorId,
        "choose_course": choosedCourse,
        "study_preference": preference,
        "choose_package": packet,
        "study_duration": duration,
        "study_start_time": time,
    
        "study_schedule": date,
    
        "amount_meeting": amount,
        "study_start_date": startDate,
        "choose_day": choose_day,
        "choose_time": choose_time,
        "choose_duration": choose_duration,

        "redirect_url": snapRedirect,
        "unique_code": uniqueCode,
        "private_fee": totalTransfer
      }

      const request = await axios.post(
        `${BASE_URL}/booking`,
        payload
      )

      const response = request.data
      alert(response.message)
    }catch(e) {
      alert(e.response.data.message)
    }

  }

  const onSubmit = async() => {
    await addBookingPayment();
    window.open(snapRedirect, "_blank")
    onClose()
    navigate('/dashboard/transaction')
    // snap.pay(snapToken, {
    //   onSuccess: async function(result){
    //     console.log('success');
    //     console.log(result);
    //     await addBookingPayment();
    //   },
    //   onPending: async function(result){
    //     console.log('pending');
    //     console.log(result);
    //     await addBookingPayment();
    //   },
    //   onError: function(result){console.log('error');console.log(result);},
    //   onClose: function(){console.log('customer closed the popup without finishing the payment');}
    // })
  }

  return (
    <Flex
      flexDirection="column"
      bg="white"
      border=" 1px solid #D0D5DD"
      borderRadius="12px"
      p="24px"
      gap="16px"
      w="full"
    >
      <Heading fontSize="xl" fontWeight="semibold">
        Pesan Tentor
      </Heading>
      <Flex flexDirection="column" gap="24px">
        <FormControl>
          <FormLabel display="inline-block" pos="relative">Pilih Mata Pelajaran <Icon as={MdInfo} color="#F79009" pos="absolute" top="0" right="-10%"/></FormLabel>
              <ChooseCourse />
        </FormControl>
        <FormControl>
          <FormLabel>Preferensi Belajar</FormLabel>
          <RadioGroup onChange={setPreference} value={preference}>
            <Flex justifyContent="space-between" gap="24px">
                <RadioInput value="offline" text="Tatap Muka" state={preference}/>
                <RadioInput value="online" text="Daring" state={preference}/>
            </Flex>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel display="inline-block" pos="relative">Pilih Paket <Icon as={MdInfo} color="#F79009" pos="absolute" top="0" right="-20%"/></FormLabel>
          <RadioGroup onChange={setPacket} value={packet}>
            <Flex justifyContent="space-between" gap="24px">
                <RadioInput value="independent" text="Mandiri" state={packet}/>
                <RadioInput value="subscribe" text="Langganan" state={packet}/>
            </Flex>
          </RadioGroup>
        </FormControl>


        {packet == 'independent' ? 
        schedules != null ?
        <IndependentPacket 
          date={date} 
          setDate={setDate} 
          studyTime={studyTime}
          setStudyTime={setStudyTime}
          time={time}
          setTime={setTime}
          duration={duration}
          setDuration={setDuration}
          durations={durations}
          schedules={schedules}
        /> : null 
        : 
        <SubscribePacket 
          state={[amount, startDate, scheduleSubscribe ]} 
          handleState={[setAmount, setStartDate, setScheduleSubscribe]} 
          schedules={schedules}
          times={dataTentor.generated_tentor_schedules.times}
          study_time={studyTime}
        />
        }



        <Flex gap="16px" justifyContent="space-between">
          <Box>
            <Text fontSize="12px" fontWeight={500}>Biaya</Text>
            <Text fontSize="16px" fontWeight={600}>Rp. <NumericFormat displayType="text" value={packet == 'subscribe' ? 40e3 * amount : 40e3} thousandsGroupStyle="thousand" thousandSeparator="," />,-</Text>
          </Box>
          <Box>
            <Button
              bg="brand.500"
              borderRadius="8px"
              color="white"
              size="lg"
              fontSize="18px"
              fontWeight={600}
              onClick={onReservation}
            >Reservasi Sekarang</Button>

          </Box>
        </Flex>
            <BookingModal 
              isOpen={isOpen} 
              onClose={onClose} 
              choosedCourse={choosedCourse} 
              preference={preference} 
              date={date} 
              time={time} 
              duration={duration} 
              packet={packet} 
              amount={amount} 
              startDate={startDate} 
              schedules={scheduleSubscribe}
              totalTransfer={totalTransfer}
              uniqueCode={uniqueCode}
              studentAddress={studentAddress}
              onSubmit={onSubmit}   
            />
      </Flex>
    </Flex>
  );
};

export default BookingTentor;
