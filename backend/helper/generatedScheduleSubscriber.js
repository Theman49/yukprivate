const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);
moment.locale('id');

exports.generatedScheduleSubscriber = (study_start_date, choose_day) => {
    const start = moment(study_start_date);
    const end = moment(study_start_date).add(4, 'week');
    const range = moment.range(start, end);

    let schedules = [];
    for(let day of range.by('day')){
        for(let item of choose_day){
            if(day.format('ddd').toLowerCase() == item){
                // const schedule = day.format("dddd, DD MMMM YYYY"); 
                const schedule = day.format("YYYY-MM-DD"); 
                schedules.push(schedule)
            }
        }
    }

    return schedules;

}