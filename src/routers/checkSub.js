const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    console.log(`Інформація про платіж: ${req}`)
    console.log(`Інформація про платіж: ${res}`)
    res.end()
}


module.exports = checkSub