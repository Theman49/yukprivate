const fees = [
    "40.000",
    "160.000",
    "320.000",
]

const schedules = [
    "Sabtu, 23 September 2022",
    "Senin, 5 September 2022",
    "Jumat, 17 Oktober 2022",
    "Kamis, 31 Oktober 2022",
]

const schedules2 = [
    "Sabtu, 23 September",
    "Senin, 5 September",
    "Jumat, 17 Oktober",
    "Kamis, 31 Oktober",
]

const statusTransaction = [
    'Pending',
    'Failed',
    'Success'
]


const preferences = [
    'Daring',
    "Tatap Muka"
]

const durations = [
    1,
    1.5,
    3
]

const times = [
    "08.00",
    "09.00",
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
    "16.00",
]

const statusBooking = [
    "accepted",
    "pending"
]

const data = {transactions: []}

for(let i=0; i<12; i++){
    const getPreference = preferences[Math.floor(Math.random() * 2)]
    const getFee = fees[Math.floor(Math.random() * 3)]
    const getSchedule = schedules[Math.floor(Math.random() * 3)]
    const getSchedule2 = schedules2[Math.floor(Math.random() * 3)]
    const getStatus = statusTransaction[Math.floor(Math.random() * 2)]
    const getDuration = durations[Math.floor(Math.random() * 2)]
    const getTime = times[Math.floor(Math.random() * 8)]
    const getBookingStatus = statusBooking[Math.floor(Math.random() * 1)]
    data.transactions.push({
        preference: getPreference,
        fee: getFee,
        schedule: getSchedule,
        schedule2: getSchedule2,
        statusTransaction: getStatus,
        duration: getDuration,
        time: getTime,
        statusBooking: getBookingStatus
    })
}



export const dataDummy = JSON.stringify(data)