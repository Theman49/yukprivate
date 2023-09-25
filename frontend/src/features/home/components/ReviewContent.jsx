import { 
  Flex,
  Heading,
  Avatar,
  Text,
  Box,
  Divider,
  Icon
} from "@chakra-ui/react";
import { MdStarRate } from "react-icons/md";
import React from "react";
import moment from 'moment';
moment.locale('id')

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;


const ReviewContent = ({dataReview}) => {
  let stars = [];
  const componentStars = () => {
    dataReview.map(item => {
      let temp = []
      for(let i=0; i<item.rate; i++){
        temp.push('star')
      }
      stars.push(temp)
    })
  }

  componentStars()

  return (
    <Flex flexDirection="column" gap="24px">
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        maxW="759px"
        bg="white"
        border=" 1px solid #D0D5DD"
        borderRadius="12px"
        p="24px"
        gap="16px"
      >
        <Heading fontSize="xl" fontWeight="semibold">
          Ulasan
        </Heading>
        {dataReview.map((item,index) => {
        return item.text_review ? (
          <Flex flexDir="column" w="full" gap="20px">
            <Flex justifyContent="space-between" w="full">
              <Flex gap="10px">
                <Avatar boxSize="48px" src={`${PUBLIC_URL}/${item.student_image}`} name={item.student_name} display={['none', 'block']}/>
                <Flex flexDir="column">
                  <Text>{item.student_name}</Text>
                  <Text color="brand.500">{item.student_school}</Text>
                </Flex>
              </Flex>
              <Flex flexDir="column">
                <Text color="gray">{moment(item.createdAt).format("D MMMM YYYY")}</Text>
                <Flex gap="10px">
                  {stars[index] ? stars[index].map(item => {
                    return (
                      <Icon as={MdStarRate} className="rate-star" fontSize="20px" color="#F79009"/>
                    ) 
                  }) : null}
                </Flex>
              </Flex>
            </Flex>

            <Box>
              <Text>{item.text_review}</Text>
            </Box>

            <Divider color="#D0D5DD"></Divider>
          </Flex>
        ) : null
        })} 
      </Flex>
    </Flex>
  )
};

export default ReviewContent;
