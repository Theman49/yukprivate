const { duration } = require('moment');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);
moment.locale('id');

exports.generatedTentorSchedules = (getSchedules) => {
    const start = moment();
    const end = moment().add(3, 'week');
    const range = moment.range(start, end);

    const getDays = new Set(getSchedules.map(item => item.day))
    const days = new Array(...getDays)

    const Times = days.map(day => {
        const temp = {}
        temp.day = day.substr(0,3)
        temp.time = []
        const getTimesFilter = getSchedules.filter(item => item.day == day)
        const getTimesSet = new Set(getTimesFilter.map(item => item.time))
        const getTimes = new Array([...getTimesSet])
        getTimes[0].map(item => {
            const time = {}
            time.value = (item).substr(0,5)
            time.duration = []

            const getDurationsFilter = getSchedules.filter(item2 => item2.time == item && item2.day == day)
            const getDurationsSet = new Set(getDurationsFilter.map(item3 => item3.duration))
            const getDurations = new Array([...getDurationsSet])
            getDurations[0].map(item4 => {
                time.duration.push(item4)
            })
            temp.time.push(time)
        })
        return temp
    })
    
    let schedules = [];
    let i = 0;
    for(let day of range.by('day')){
        for(let item of getDays){
            if(day.format('dddd').toLowerCase() == item){
                // const schedule = day.format("dddd, DD MMMM YYYY"); 
                const schedule = {}
                schedule.value = day.format("YYYY-MM-DD"); 
                schedule.date = day.format('D')
                schedule.day = day.format("ddd"); 
                schedule.month = day.format('MMM')
                if(i == 4){
                    schedule.slot = 0
                }else{
                    schedule.slot = 4
                }
                schedules.push(schedule)
                i += 1
            }
        }
    }

    return {
        schedules: schedules, 
        times: Times
    };

}