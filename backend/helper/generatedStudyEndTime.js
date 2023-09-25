const moment = require('moment');

exports.generatedStudyEndTime = (study_time, duration) => {
    const time = study_time.split(":");
    const hour = parseInt(time[0]);
    const minute = parseInt(time[1]);

    const start_time = moment().set({
        'hour': hour,
        'minute': minute
    })

    console.log(start_time)
    const end_time = moment(start_time).add(duration, 'hour');

    return end_time.format("HH:mm");
}
