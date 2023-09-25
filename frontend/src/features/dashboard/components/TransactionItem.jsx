import React from "react";
import moment from 'moment';
import 'moment/locale/id'
import {
  Avatar,
  Badge,
  Flex,
  Heading,
  Text,
  HStack,
  Icon,
  Button,
  Link,
} from "@chakra-ui/react";
import { MdCalendarToday, MdMonetizationOn, MdMenuBook, MdOutlineSubscriptions } from "react-icons/md";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const TransactionItem = ({
  tentorImg,
  tentorName,
  privateMeet,
  orderDate,
  totalPayment,
  tentorCourse,
  statusTransaction,
  choosePackage,
  redirectUrl
}) => {
  const action = () => {
    window.open(redirectUrl, "_blank")
  }

  return (
    <Flex
      border="1px solid #D0D5DD"
      bg="white"
      w="770x"
      p="16px"
      borderRadius="8px"
      gap="16px"
      alignItems="center"
      _hover={{ transform: "scale(1.01)", transition: "0.2s" }}
    >
      <Avatar boxSize="64px" src={`${PUBLIC_URL}/${tentorImg}`} name={tentorName} />
      <Flex flexDirection="column" gap="16px">
        <HStack>
          <Heading fontSize="18px" fontWeight="medium">
            {tentorName}
          </Heading>
          <Badge
            colorScheme={privateMeet == "online" ? "blue" : "green"}
            fontSize="12px"
          >
            {privateMeet}
          </Badge>
        </HStack>
        <Flex gap="20px" flexDir={['column', 'row']}>
          <Flex flexDirection="column" alignItems="flex-start" gap="8px">
            <Text fontSize={['md',"xs"]} fontWeight="medium">
              Tanggal Pemesanan
            </Text>
            <Flex alignItems="center" gap="4px">
              <Icon as={MdCalendarToday} color="gray" />
              <Text fontSize={['md',"xs"]} color="gray">
                {moment(orderDate).format('dddd, DD-MM-YYYY')}
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" alignItems="flex-start" gap="8px">
            <Text fontSize={['md',"xs"]} fontWeight="medium">
              Total Biaya
            </Text>
            <Flex alignItems="center" gap="4px">
              <Icon as={MdMonetizationOn} color="gray" />
              <Text fontSize={['md',"xs"]} color="gray">
                {totalPayment}
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" alignItems="flex-start" gap="8px">
            <Text fontSize={['md',"xs"]} fontWeight="medium">
              Mata Pelajaran
            </Text>
            <Flex alignItems="center" gap="4px">
              <Icon as={MdMenuBook} color="gray" />
              <Text fontSize={['md',"xs"]} color="gray">
                {tentorCourse}
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" alignItems="flex-start" gap="8px">
            <Text fontSize={['md',"xs"]} fontWeight="medium">
              Paket
            </Text>
            <Flex alignItems="center" gap="4px">
              <Icon as={MdOutlineSubscriptions} color="gray" />
              <Text fontSize={['md',"xs"]} color="gray">
                {choosePackage == 'independent' ? "Mandiri" : "Langganan"}
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" alignItems="flex-start" gap="8px">
            <Text fontSize={['md',"xs"]} fontWeight="medium">
              Status
            </Text>
            {statusTransaction == "settlement" ? (
              <Text fontSize={['md',"xs"]} color="#12B76A">
                Success
              </Text>
            ) : statusTransaction == "pending" ? (
              <Text fontSize={['md',"xs"]} color="#F79009">
                Pending
              </Text>
            ) : (
              <Text fontSize={['md',"xs"]} color="#F04438">
                Failed
              </Text>
            )}
          </Flex>
          <Flex flexDirection="column" alignItems="flex-start" gap="8px">
            <Text fontSize={['md',"xs"]} fontWeight="medium">
              Aksi
            </Text>
            {statusTransaction == "settlement" ? (
                <Button
                  onClick={action}
                  fontSize={['md',"xs"]}
                  variant="solid"
                  bg="#EAECF0"
                  h="20px"
                  w="72px"
                  _hover={{ bg: "#CACACA" }}
                  _active={{ bg: "#7B7B7B" }}
                >
                  Invoice
                </Button>
            ) : statusTransaction == "pending" ? (
                <Button
                  onClick={action}
                  fontSize={['md',"xs"]}
                  variant="solid"
                  bg="#EAECF0"
                  h="20px"
                  w="72px"
                  _hover={{ bg: "#CACACA" }}
                  _active={{ bg: "#7B7B7B" }}
                >
                  Follow Up
                </Button>
            ) : (
                <Button
                  onClick={action}
                  fontSize={['md',"xs"]}
                  variant="solid"
                  bg="#EAECF0"
                  h="20px"
                  w="72px"
                  _hover={{ bg: "#CACACA" }}
                  _active={{ bg: "#7B7B7B" }}
                >
                  Follow Up
                </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TransactionItem;
