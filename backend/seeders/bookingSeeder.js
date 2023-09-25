const bookingService = require('../services/bookingsService');
const {generatedUniqueCode} = require('../helper/uniqueCodeGenerator');

const courses = [
    "Matematika",
    "Bahasa Inggris",
    "Kimia",
    "Fisika"
]

const preferences = [
    'online',
    'offline'
]

const packages = [
    'independent',
    'subscribe'
]

const durations = [
    1,
    1.5,
    2
]

const study_starts = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
]

const study_schedules = [
    "2022-11-08",
    "2022-11-09",
    "2022-11-10",
    "2022-11-11",
    "2022-11-12",
    "2022-11-13",
    "2022-11-14",
    "2022-11-15",
    "2022-11-16",
]

const amounts = [
    4,
    8,
    12,
    16
]

const choose_days = [
    "sen",
    "sel",
    "rab",
    "kam",
    "jum",
    "sab"
]

const generateList = (amount, lists) => {
	let result = []
	let x = [];
	for(let i=0; i<amount; i++){
		let y = Math.round(Math.random() * (lists.length - 1))
		let check = x.find(item => item == y)
        while(check){
            y = Math.round(Math.random() * (lists.length - 1))
            check = x.find(item=> item == y)        
        }
		if(!check){
			x.push(y)
            result.push(lists[y])
		}
	}
	return result.join(',')
}

const BookingSeeder = async() => {
    for(let i=0; i<6; i++){
        const user_id = 15;
        const tentor_id = Math.round(Math.floor(Math.random() * 5) + 1)
        const choose_course = courses[Math.round(Math.random() * 3)]
        const study_preference = preferences[Math.round(Math.random() * 1)]
        const choose_package = packages[Math.round(Math.random() * 1)]
        const study_duration = durations[Math.round(Math.random() * 2)]
        const study_start_time = study_starts[Math.round(Math.random() * 8)]

        const study_schedule = study_schedules[Math.round(Math.random() * 8)]

        const amount_meeting = amounts[Math.round(Math.random() * 3)]
        const study_start_date = study_schedules[Math.round(Math.random() * 8)]
        const amount = amount_meeting / 4
        const choose_day = generateList(amount, choose_days)
        const choose_time = generateList(amount, study_starts)
        const choose_duration = generateList(amount, durations)

        const redirect_url = "url"
        const unique_code = generatedUniqueCode()
        const private_fee = (choose_package == 'subscribe' ? 40e3 * amount_meeting : 40e3)

        // console.log({
        //     user_id: user_id,
        //     tentor_id: tentor_id,
        //     choose_course: choose_course,
        //     study_preference: study_preference,
        //     choose_package: choose_package,
        //     study_duration: study_duration,
        //     study_start_time: study_start_time,
        //     // independent
        //     study_schedule: study_schedule,
        //     // subscribe
        //     amount_meeting: amount_meeting,
        //     study_start_date: study_start_date,
        //     choose_day: choose_day,
        //     choose_time: choose_time,
        //     choose_duration: choose_duration,
        //     // snap redirect url
        //     redirect_url: redirect_url,
        //     unique_code: unique_code,
        //     private_fee: private_fee
        // })

        const bookingInsert = await bookingService.handleBooking({
            user_id,
            tentor_id,
            choose_course,
            study_preference,
            choose_package,
            study_duration,
            study_start_time,
            // independent
            study_schedule,
            // subscribe
            amount_meeting,
            study_start_date,
            choose_day,
            choose_time,
            choose_duration,
            // snap redirect url
            redirect_url,
            unique_code,
            private_fee
        })

        console.log(bookingInsert.data)
    }
}

BookingSeeder().then(x => console.log(x))