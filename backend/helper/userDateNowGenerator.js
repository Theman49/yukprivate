function addLeadingZeros(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
};

const userDateNow = () => {
    const currentDatetime = new Date()
    const formattedDate = currentDatetime.getFullYear() + "-" + addLeadingZeros(currentDatetime.getMonth() + 1) + "-" + addLeadingZeros(currentDatetime.getDate()) + " " + addLeadingZeros(currentDatetime.getHours()) + ":" + addLeadingZeros(currentDatetime.getMinutes()) + ":" + addLeadingZeros(currentDatetime.getSeconds());
    
    return formattedDate;
};

module.exports = {userDateNow};

