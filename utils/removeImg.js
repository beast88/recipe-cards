const fs = require('fs')
const util = require('util')

const unlinkFile = util.promisify(fs.unlink)

export { unlinkFile }