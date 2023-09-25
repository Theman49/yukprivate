const fs = require('fs-extra');

const removeFile = async(pathFile) => {
    try {
        await fs.remove(pathFile)
        console.log(`${pathFile} take down!`)
      } catch (err) {
        console.error(err)
      }

}

module.exports = removeFile