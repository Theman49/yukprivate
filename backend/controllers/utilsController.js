const { LastEducation } = require('../helper/lastEducation');
const { generatedUniqueCode } = require('../helper/uniqueCodeGenerator');

const getLastEducations = async(req, res) => {
    try{
        res.status(200).send({
            status: true,
            message: "Berhasil Mendapatkan List Tingkat Pendidikan",
            data: LastEducation,
        })

    }catch(err){
        res.status(400).send({
            status: false,
            message: err.message,
            data: null,
        })
    }
}

const generateUniqueCode = async(req, res) => {
    try{
        res.status(200).send({
            status: true,
            message: "Berhasil Mendapatkan Unique Code",
            data: generatedUniqueCode(),
        })

    }catch(err){
        res.status(400).send({
            status: false,
            message: err.message,
            data: null,
        })
    }
}

module.exports = {
    getLastEducations,
    generateUniqueCode
}