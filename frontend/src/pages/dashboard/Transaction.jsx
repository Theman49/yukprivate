import React, {useState, useEffect} from "react";
import { Flex, Heading, Box } from "@chakra-ui/react";
import DashboardLayout from "../../layouts/DashboardLayout";
import TransactionItem from "../../features/dashboard/components/TransactionItem";
import { useSelector } from "react-redux";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
// import { dataDummy } from "../../data/generateDummy";
// import { dataDummy as dummy2 } from "../../data/transactionDummy";

// const Data = JSON.parse(dataDummy)
// const Tentor = Data.tentor

// const Data2 = JSON.parse(dummy2)
// const Transactions = Data2.transactions

const Transaction = () => {
  let {isAuth, role: isRole, user, token} = useSelector((state) => state.auth);

  if(!isAuth){
      isAuth = localStorage.getItem('isAuth')
      isRole = localStorage.getItem('role')
      user = JSON.parse(localStorage.getItem('user'))
      token = localStorage.getItem('token')
  }
  const [transaction, setTransaction] = useState()
  useEffect(() => {
    const getDataBooking = async() => {
        const Data = await axios.get(
          `${BASE_URL}/transaction/students`,
          {
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Access-Control-Allow-Origin': "*"
            }
          }
        )

        const response = Data.data.data
        setTransaction(response.transaction_lists)
    }
    getDataBooking();
  }, [])
  
  return (
    <DashboardLayout>
      <Flex
        flexDirection="column"
        p="24px"
        bg="white"
        w={["full","868px"]}
        minH="80vh"
        borderRadius="8px"
        boxShadow="0px 1px 25px rgba(167, 166, 174, 0.1)"
        gap="20px"
      >
        <Heading fontSize="xl" fontWeight="medium">
          Transaksi
        </Heading>
        <Flex flexDirection="column" gap="20px">
          {transaction != null ? transaction.map((item, index) => {
            return (
              <Box key={index}>
                <TransactionItem
                  tentorImg={item.tentor_image}
                  tentorName={item.tentor_name}
                  privateMeet={item.study_preference}
                  orderDate={item.createdAt}
                  totalPayment={`Rp ${item.total_transfer}.-`}
                  tentorCourse={item.choose_course}
                  statusTransaction={item.transaction_status}
                  choosePackage={item.choose_package}
                  redirectUrl={item.redirect_url}
                />
              </Box>
            ) 
          }) : null}
        </Flex>
      </Flex>
    </DashboardLayout>
  );
};

export default Transaction;
