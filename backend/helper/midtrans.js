const axios = require('axios');

const AUTHORIZATION = "Basic U0ItTWlkLXNlcnZlci1tU1J2MGl5VDBnN1EzZzEtY0wwNnFiWDc6"

const splitOrderId = (data, order_id) => {
    const arr = order_id.split("_");
    data.booking_id = arr[1];
    data.student_id = arr[2];
    data.tentor_id = arr[3];
    return data;
};

const getTransactionByOrderId = async({ order_id }) => {
    const getTransaction = await axios({
        url: `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
        headers: {
            "Authorization": AUTHORIZATION,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    var data = await getTransaction.data;
    if(data.status_code == '404'){
        return {
            status_code: 404
        };
    }

    return splitOrderId(data, order_id);
}

const generatedTokenSnap = async({
    student,
    tentor,
    booking_id,
    choose_package,
    total_transfer
}) => {
    const raw = {
          "transaction_details": {
              "order_id": Date.now().toString() + "_" + booking_id + "_" + student.id + "_" + tentor.id,
              "gross_amount": total_transfer
            },
            "item_details": [{
              "id": "Booking" + choose_package,
              "price": total_transfer,
              "quantity": 1,
              "name": "Booking " + choose_package,
              // "name": "Booking " + choose_package + `tentor: ${tentor.name} email: ${tentor.email}`,
              "brand": "Midtrans",
              "category": choose_package,
            }],
            "customer_details": {
              "first_name": student.name,
              "last_name": "",
              "email": student.email,
              "phone": student.phone,
              "billing_address": {
                "first_name": student.name,
                "last_name": "",
                "email": student.email,
                "phone": student.phone,
                "address": student.address,
              },
              "shipping_address": {
                "first_name": student.name,
                "last_name": "",
                "email": student.email,
                "phone": student.phone,
                "address": student.address,
              }
            }
      };

      const myHeaders = {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": AUTHORIZATION
      }
      try{
        const result = await axios.post(
          "https://app.sandbox.midtrans.com/snap/v1/transactions", 
          raw, 
          {
            headers: myHeaders,
          }
        )

        const data = await result.data
        return data
      }catch(e){
        console.log(e)
      }
}
module.exports = {
    splitOrderId,
    getTransactionByOrderId,
    generatedTokenSnap
};