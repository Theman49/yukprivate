const { 
    registers, 
    tentors, 
    tentor_achievements, 
    tentor_experiences, 
    tentor_proposals, 
    tentor_schedules,
    students
} = require('../models')

const bcrypt = require('bcrypt');

const { dataDummy } = require('./generateDummyTentor')

const Tentors = (JSON.parse(dataDummy())).tentor

const dataPreferences = [
    "online",
    "offline"
]

const booleanIsTeaching = [
    false,
    true
]

const days = [
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu"
]

const times = [
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

const durations = [
    1,
    1.5,
    2
]

const getPreference = () => {
    let count = Math.round(Math.floor(Math.random() * 1) + 1)
    let result = []
    if(count == 1){
        result.push(dataPreferences[Math.round(Math.random() * 1)])
    }else{
        for(let i = 0; i<count; i++){
            result.push(dataPreferences[i])
        }
    }
    return result.join(',')
}

const SALT_ROUND = 10

const SeedUsers = async() => {
    const name = "student"
    const role = "student"
    const email = "student@gmail.com"
    const password = await bcrypt.hash('password', SALT_ROUND);
    const isVerifiedEmail = true

    const createRegister = await registers.create({
        id: 15,name,email,role,password,isVerifiedEmail
    })

    const createStudent = await students.create({
        id: 15,
        user_id: 15,
        username: "student",
        address: Tentors[3].card.address,
    })

    for(let i = 0; i<Tentors.length; i++){
        // registers
        const name = Tentors[i].card.name
        const email = `${Tentors[i].card.name.split(" ")[0].toLowerCase()}@gmail.com`
        const role = "tentor"
        const password = await bcrypt.hash('password', SALT_ROUND);
        const isVerifiedEmail = true
        //tentors
        const address = Tentors[i].card.address
        const institution_name = Tentors[i].card.institution
        const tentor_major = Tentors[i].card.courses[0]
        const url_picture = Tentors[i].card.image
        //proposals
        const course_interest = (Tentors[i].card.courses).join(',')
        const preferences = (i % 2 == 0 ? `${dataPreferences[0]},${dataPreferences[1]}` : dataPreferences[Math.round(Math.random() * 1)])

        const createRegister = await registers.create({
            id: i+1,name,email,role,password,isVerifiedEmail
        })

        const createTentors = await tentors.create({
            tentor_id: i+1,
            experience_id: i+1,
            achievement_id: i+1,
            proposal_id: i+1,
            schedule_id: i+1,
            address,
            institution_name,
            tentor_major,
            url_picture
        })

        const createProposal = await tentor_proposals.create({
            tentor_id: i+1,
            proposal_id: i+1,
            course_interest,
            preferences
        })

        // schedules
        const randomCount = Math.round(Math.floor(Math.random() * 3) + 1)

        for(let j=0; j<randomCount; j++){
            const day = days[Math.round(Math.random() * 5)]
            const time = times[Math.round(Math.random() * 8)]
            const duration = durations[Math.round(Math.random() * 2)]

            const createSchedules = await tentor_schedules.create({
                tentor_id: i+1,
                schedule_id: i+1,
                day,
                time,
                duration
            })
        }

        // achievements
        const achievements = Tentors[i].booking.achievements
        achievements.map(item => {
            const achievement_name = item.name
            const organizer_name = item.place
            const date_of_activity = item.time

            const funcAchievement = async() => {
                const createAchievement = await tentor_achievements.create({
                    tentor_id: i+1,
                    achievement_id: i+1,
                    achievement_name,
                    organizer_name,
                    date_of_activity
                })
            }

            funcAchievement()
        })

        //experiences
        const experiences = Tentors[i].booking.experiences
        experiences.map(item => {
            const teaching_place = item.place
            const teaching_role = item.role
            const teaching_start_date = ((item.time).split(" - "))[0]
            const teaching_end_date = ((item.time).split(" - "))[1]
            const isTeaching = booleanIsTeaching[Math.round(Math.random() * 1)]

            const funcExperience = async() => {
                const createExperience = await tentor_experiences.create({
                    tentor_id: i+1,
                    experience_id: i+1,
                    teaching_place,
                    teaching_role,
                    teaching_start_date,
                    teaching_end_date,
                    isTeaching
                })
            }

            funcExperience()
        })
    }
}

SeedUsers().then(x => console.log(x))