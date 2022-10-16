const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    console.log(`Інформація про платіж: ${JSON.stringify(req.body)}`)
    console.log(`Інформація про платіж: ${JSON.stringify(res.body)}`)
    res.end()
}


module.exports = checkSub