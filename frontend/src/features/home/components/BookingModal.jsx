import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Box,
    Text,
    Heading,
    Divider,
    Icon
  } from '@chakra-ui/react'

import { MdCalendarToday, MdAccessTime, MdTimer } from "react-icons/md";
import {NumericFormat} from 'react-number-format';

const courseList = [
  {
    value: 'matematika',
    text: 'Matematika'
  },
  {
    value: 'fisika',
    text: 'Fisika'
  },
  {
    value: 'kimia',
    text: 'Kimia'
  },
  {
    value: 'inggris',
    text: 'Bahasa Inggris'
  },
]

const BookingModal = ({
  isOpen, 
  onClose, 
  packet, 
  amount, 
  duration, 
  preference, 
  choosedCourse, 
  time, 
  schedules, 
  date, 
  startDate, 
  totalTransfer,
  uniqueCode,
  studentAddress,
  onSubmit
}) => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const price = (packet == 'subscribe' ? 40e3 * amount : 40e3)
    const totalPrice = price + 4e3 - 120;
  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="16px">
          <ModalHeader>Konfirmasi Pesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Text>courses {courses.join(',')}</Text>
            <Text>Preference {preference}</Text>
            <Text>Packet {packet}</Text> */}
            {packet == 'subscribe' ? 
              <>
                {/* <Text>Amount {amount}x/bulan</Text>
                <Text>Start Date {startDate}</Text> */}

                {/* {schedules != null ? schedules.map((item, index) => {
                  return (
                    <Text key={index}>Sesi {++index} :  hari {item.day} jam {item.time} durasi {item.duration} jam</Text>
                  )
                }) : null} */}
              </>
              :
              <>
              {/* <Text>Date {date}</Text>
              <Text>time {time}</Text>
              <Text>Duration {duration} jam</Text> */}
              </>
            }
            <Heading fontSize="lg" fontWeight="semibold">Detail Pesanan</Heading>
            <Divider color="#D0D5DD" my="8px" />
            <Flex flexDir="column" gap="16px">
                <Box>
                    <Heading fontSize="lg" fontWeight="semibold" mb={2}>Alamat Siswa</Heading>
                    <Text color="#667085" fontWeight={400} fontSize="sm">{studentAddress}</Text>
                </Box>
                <Box>
                    <Heading fontSize="lg" fontWeight="semibold" mb={2}>Jenis Paket</Heading>
                    <Text color="#667085" fontWeight={400} fontSize="sm">
                      {packet == 'independent' ? "Mandiri" : "Langganan"}
                    </Text>
                </Box>
                <Box>
                    <Heading fontSize="lg" fontWeight="semibold" mb={2}>
                      Preferensi Belajar
                    </Heading>
                    <Text color="#667085" fontWeight={400} fontSize="sm">
                      {preference == "offline" ? "Tatap Muka" : "Daring"}
                    </Text>
                </Box>
                  {packet == 'subscribe' ? 
                    <Box>
                      <Heading fontSize="lg" fontWeight="semibold" mb={2}>Jumlah Pertemuan</Heading>
                      <Text mb={1} color="#667085" fontWeight={400} fontSize="sm" display="flex" alignItems="center">
                          {amount}x/bulan
                      </Text>
                    </Box>
                    : null
                  }
                <Box>
                    <Heading fontSize="lg" fontWeight="semibold" mb={2}>Jadwal Belajar</Heading>
                    {packet == 'subscribe' ? 
                      <Box>
                        <Text mb={1} color="#667085" fontWeight={400} fontSize="sm" display="flex" alignItems="center">
                            Tanggal Mulai {startDate}
                        </Text>
                        {schedules != null ? schedules.map((item, index) => {
                          return (
                            <Text mb={1} display="flex" gap="5px" color="#667085" fontWeight={400} fontSize="sm" key={index}>
                              <Text fontWeight="bolder" w="50px">Sesi {++index}</Text>  
                              <Text display="flex" w="60%" justifyContent="space-between" alignItems="center">
                                <Text w="30%">
                                  <Icon as={MdCalendarToday} fontSize="lg" mr={1}/>{item.day} 
                                </Text>
                                <Text w="33%">
                                  <Icon as={MdAccessTime} ms={3} mr={1} fontSize="lg"/>{item.time} 
                                </Text>
                                <Text w="33%">
                                  <Icon as={MdTimer} ms={3} mr={1} fontSize="lg"/>{item.duration} jam
                                </Text>
                              </Text>
                            </Text>
                          )
                        }) : null}
                      </Box>
                      :
                      <Box>
                        <Text display="flex" alignItems="center" color="#667085" fontWeight={400} fontSize="sm" >
                          <Icon as={MdCalendarToday} fontSize="lg" mr={1}/>{date} 
                          <Icon as={MdAccessTime} ms={3} mr={1} fontSize="lg"/>{time} 
                          <Icon as={MdTimer} ms={3} mr={1} fontSize="lg"/>{duration} jam
                        </Text>

                      </Box>
                    }
                </Box>
                <Box>
                    <Heading fontSize="lg" fontWeight="semibold" mb={2}>Mata Pelajaran</Heading>
                    <Text color="#667085" fontWeight={400} fontSize="sm">
                      {/* {courses.map((course, index) => {
                        return index < courses.length - 1 ? `${course.text}` : course.text
                      })} */}
                      {choosedCourse}
                    </Text>
                </Box>
            </Flex>
            <Heading fontSize="lg" fontWeight="semibold" mt="24px">Detail Pembayaran</Heading>
            <Divider color="#D0D5DD" my="8px" />
            <Flex flexDir="column" gap="12px">
                <Flex justifyContent="space-between">
                    <Text>Biaya Private</Text>
                    <Text><NumericFormat displayType="text" value={packet == 'subscribe' ? 40e3 * amount : 40e3} thousandsGroupStyle="thousand" thousandSeparator="," prefix={'Rp. '}/></Text>
                </Flex>
                <Flex justifyContent="space-between">
                    <Text>Kode Unik</Text>
                    <Text>-<NumericFormat displayType="text" value={uniqueCode} thousandsGroupStyle="thousand" thousandSeparator="," prefix={'Rp. '} /></Text>
                </Flex>
                <Flex justifyContent="space-between">
                    <Text>Midtrans Fee</Text>
                    <Text color="green">+ Rp. 4.000</Text>
                </Flex>
                <Flex justifyContent="space-between">
                    <Text>Total Transfer</Text>
                    <Text><NumericFormat displayType="text" value={totalTransfer} thousandsGroupStyle="thousand" thousandSeparator="," prefix={'Rp. '} /></Text>
                </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button bg="brand.500" size="lg" w="full" color="white" onClick={onSubmit}>
                Pesan Sekarang
            </Button>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default BookingModal;