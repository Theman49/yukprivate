const generatedUniqueCode = () => (parseInt(Date.now().toString().substr(Date.now().toString().length-4,3)))

module.exports = {
    generatedUniqueCode,
};